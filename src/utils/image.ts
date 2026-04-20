export async function loadImageFromSrcSet({ src, srcSet, sizes }: any): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      if (!src && !srcSet) {
        throw new Error('No image src or srcSet provided');
      }

      let tempImage: any = new Image();

      if (src) {
        tempImage.src = src;
      }

      if (srcSet) {
        tempImage.srcset = srcSet;
      }

      if (sizes) {
        tempImage.sizes = sizes;
      }

      const onLoad = () => {
        tempImage.removeEventListener('load', onLoad);
        const source = tempImage.currentSrc;
        tempImage = null;
        resolve(source);
      };

      tempImage.addEventListener('load', onLoad);
    } catch (error) {
      reject(`Error loading ${srcSet}: ${error}`);
    }
  });
}

export async function generateImage(width = 1, height = 1): Promise<string> {
  return new Promise(resolve => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    if(ctx) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.fillRect(0, 0, width, height);
    }

    canvas.toBlob(async blob => {
      if (!blob) throw new Error('Video thumbnail failed to load');
      const image = URL.createObjectURL(blob);
      canvas.remove();
      resolve(image);
    });
  });
}

export async function resolveSrcFromSrcSet({ srcSet, sizes }: any): Promise<string> {
  const sources = await Promise.all(
    srcSet.split(', ').map(async (srcString: string) => {
      const [src, widthStr] = srcString.split(' ');
      const size = Number(widthStr.replace('w', ''));
      const image = await generateImage(size);
      return { src, image, widthStr };
    })
  );

  const fakeSrcSet = sources.map(({ image, widthStr }) => `${image} ${widthStr}`).join(', ');
  const fakeSrc = await loadImageFromSrcSet({ srcSet: fakeSrcSet, sizes });

  const output = sources.find(src => src.image === fakeSrc);
  return output?.src || '';
}
