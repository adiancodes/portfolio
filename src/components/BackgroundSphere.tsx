"use client"

import { useTheme } from 'next-themes';
import { useReducedMotion, useSpring } from 'framer-motion';
import { useInViewport, useWindowSize } from '@/hooks';
import { startTransition, useEffect, useRef } from 'react';
import {
  AmbientLight,
  DirectionalLight,
  LinearSRGBColorSpace,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  UniformsUtils,
  Vector2,
  WebGLRenderer,
} from 'three';
import { media } from '@/utils/style';
import { throttle } from '@/utils/throttle';
import { cleanRenderer, cleanScene, removeLights } from '@/utils/three';
import { fragmentShader, vertexShader } from './displacement-sphere-shaders';

const springConfig = {
  stiffness: 30,
  damping: 20,
  mass: 2,
};

export default function BackgroundSphere(props: any) {
  const { theme } = useTheme();
  const start = useRef(Date.now());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef<Vector2 | null>(null);
  const renderer = useRef<WebGLRenderer | null>(null);
  const camera = useRef<PerspectiveCamera | null>(null);
  const scene = useRef<Scene | null>(null);
  const lights = useRef<any[]>([]);
  const uniforms = useRef<any>(null);
  const material = useRef<MeshPhongMaterial | null>(null);
  const geometry = useRef<SphereGeometry | null>(null);
  const sphere = useRef<any>(null);
  const reduceMotion = useReducedMotion();
  const isInViewport = useInViewport(canvasRef);
  const windowSize = useWindowSize();
  const rotationX = useSpring(0, springConfig);
  const rotationY = useSpring(0, springConfig);

  useEffect(() => {
    if (!canvasRef.current) return;
    const { innerWidth, innerHeight } = window;
    mouse.current = new Vector2(0.8, 0.5);
    renderer.current = new WebGLRenderer({
      canvas: canvasRef.current,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: true,
    });
    renderer.current.setSize(innerWidth, innerHeight);
    renderer.current.setPixelRatio(1);
    renderer.current.outputColorSpace = LinearSRGBColorSpace;

    camera.current = new PerspectiveCamera(54, innerWidth / innerHeight, 0.1, 100);
    camera.current.position.z = 52;

    scene.current = new Scene();

    material.current = new MeshPhongMaterial();
    material.current.onBeforeCompile = shader => {
      uniforms.current = UniformsUtils.merge([
        shader.uniforms,
        { time: { value: 0 } },
      ]);

      shader.uniforms = uniforms.current;
      shader.vertexShader = vertexShader;
      shader.fragmentShader = fragmentShader;
    };

    startTransition(() => {
      geometry.current = new SphereGeometry(32, 128, 128);
      sphere.current = new Mesh(geometry.current!, material.current!);
      sphere.current.position.z = 0;
      sphere.current.modifier = Math.random();
      if (scene.current) scene.current.add(sphere.current);
    });

    return () => {
      if (scene.current) cleanScene(scene.current);
      if (renderer.current) cleanRenderer(renderer.current);
    };
  }, []);

  useEffect(() => {
    if (!scene.current) return;
    const isLight = theme === 'light';

    // Light mode: lower ambient so GLSL shader colors dominate (not washed out)
    // Strong directional gives the sphere definition and keeps teal visible on cream
    const dirLight = new DirectionalLight(0xffffff, isLight ? 1.2 : 2.0);
    const ambientLight = new AmbientLight(0xffffff, isLight ? 0.8 : 0.4);

    dirLight.position.z = 200;
    dirLight.position.x = 100;
    dirLight.position.y = 100;

    lights.current = [dirLight, ambientLight];
    lights.current.forEach(light => scene.current?.add(light));

    return () => {
      removeLights(lights.current);
    };
  }, [theme]);

  useEffect(() => {
    if (!renderer.current || !camera.current || !sphere.current || !scene.current) return;
    const { width, height } = windowSize;

    const adjustedHeight = height + height * 0.3;
    renderer.current.setSize(width, adjustedHeight);
    camera.current.aspect = width / adjustedHeight;
    camera.current.updateProjectionMatrix();

    if (reduceMotion) {
      renderer.current.render(scene.current, camera.current);
    }

    if (width <= media.mobile) {
      sphere.current.position.x = 14;
      sphere.current.position.y = 10;
    } else if (width <= media.tablet) {
      sphere.current.position.x = 18;
      sphere.current.position.y = 14;
    } else {
      sphere.current.position.x = 22;
      sphere.current.position.y = 16;
    }
  }, [reduceMotion, windowSize]);

  useEffect(() => {
    const onMouseMove = throttle((event: MouseEvent) => {
      const position = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      };

      rotationX.set(position.y / 2);
      rotationY.set(position.x / 2);
    }, 100);

    if (!reduceMotion && isInViewport) {
      window.addEventListener('mousemove', onMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove as any);
    };
  }, [isInViewport, reduceMotion, rotationX, rotationY]);

  useEffect(() => {
    if (!renderer.current || !camera.current || !sphere.current || !scene.current) return;
    let animation: number;

    const animate = () => {
      animation = requestAnimationFrame(animate);

      if (uniforms.current !== undefined) {
        // Slightly faster time evolution = more dynamic, alive-looking bloom
        uniforms.current.time.value = 0.000065 * (Date.now() - start.current);
      }

      sphere.current.rotation.z += 0.001;
      sphere.current.rotation.x = rotationX.get();
      sphere.current.rotation.y = rotationY.get();

      if (renderer.current && scene.current && camera.current) {
        renderer.current.render(scene.current, camera.current);
      }
    };

    if (!reduceMotion && isInViewport) {
      animate();
    } else {
      renderer.current.render(scene.current, camera.current);
    }

    return () => {
      if (animation) cancelAnimationFrame(animation);
    };
  }, [isInViewport, reduceMotion, rotationX, rotationY]);

  return (
    <canvas
      aria-hidden
      // Dark mode: mix-blend-screen — bright teal glows through dark bg
      // Light mode: mix-blend-multiply — teal sphere multiplies against cream, staying vivid
      className={`absolute inset-0 w-full h-full pointer-events-none ${theme === 'light'
        ? 'opacity-35 mix-blend-multiply'
        : 'opacity-100 mix-blend-screen'
        }`}
      ref={canvasRef}
      {...props}
    />
  );
};
