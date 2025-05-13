import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ImageExpandModalProps {
  url: string;
  onClose: () => void;
}

function ImageExpandModal({ url, onClose }: ImageExpandModalProps) {
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      const maxW = window.innerWidth * 0.9;
      const maxH = window.innerHeight * 0.9;
      let { naturalWidth: w, naturalHeight: h } = img;
      const scale = Math.min(maxW / w, maxH / h, 1); // 1보다 크면 축소 안 함
      setSize({ width: w * scale, height: h * scale });
    };
  }, [url]);

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: size.width,
          height: size.height,
        }}
        className='overflow-hidden rounded bg-white p-2'
      >
        <img src={url} alt='original image' className='h-full w-full object-contain' />
      </div>
    </div>,
    document.body,
  );
}

export default ImageExpandModal;
