import { Cache, TextureLoader, Object3D, Material, Texture } from 'three';
import { DRACOLoader, GLTFLoader } from 'three-stdlib';

// Enable caching for all loaders
Cache.enabled = true;

const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * GLTF model loader configured with draco decoder
 */
export const modelLoader = gltfLoader;
export const textureLoader = new TextureLoader();

/**
 * Clean up a scene's materials and geometry
 */
export const cleanScene = (scene: Object3D) => {
  scene?.traverse((object: any) => {
    if (!object.isMesh) return;

    object.geometry.dispose();

    if (object.material.isMaterial) {
      cleanMaterial(object.material);
    } else {
      for (const material of object.material) {
        cleanMaterial(material);
      }
    }
  });
};

/**
 * Clean up and dispose of a material
 */
export const cleanMaterial = (material: any) => {
  material.dispose();

  for (const key of Object.keys(material)) {
    const value = material[key];
    if (value && typeof value === 'object' && 'minFilter' in value) {
      value.dispose();

      // Close GLTF bitmap textures
      value.source?.data?.close?.();
    }
  }
};

/**
 * Clean up and dispose of a renderer
 */
export const cleanRenderer = (renderer: any) => {
  renderer.dispose();
  renderer = null;
};

/**
 * Clean up lights by removing them from their parent
 */
export const removeLights = (lights: Object3D[]) => {
  for (const light of lights) {
    light.parent?.remove(light);
  }
};
