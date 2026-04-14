import React from 'react';

interface ImageProps {
  src: string | { src: string; height: number; width: number };
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  loading?: 'lazy' | 'eager';
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
  unoptimized?: boolean;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      fill,
      sizes,
      quality,
      priority,
      placeholder,
      blurDataURL,
      loading,
      unoptimized,
      ...props
    },
    ref
  ) => {
    const imgSrc = typeof src === 'string' ? src : src.src;
    const imgWidth = width ?? (typeof src !== 'string' ? src.width : undefined);
    const imgHeight = height ?? (typeof src !== 'string' ? src.height : undefined);

    const style: React.CSSProperties = fill
      ? {
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          ...props.style,
        }
      : props.style;

    return (
      <img
        ref={ref}
        src={imgSrc}
        alt={alt}
        width={imgWidth}
        height={imgHeight}
        loading={priority ? 'eager' : loading ?? 'lazy'}
        {...props}
        style={style}
      />
    );
  }
);

Image.displayName = 'Image';

export default Image;
