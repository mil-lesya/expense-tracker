import React, { useRef, useState, useEffect } from 'react';
import styles from './ImageUploader.module.scss';
import { useTranslation } from 'react-i18next';
import { SvgIcon } from '../SvgIcon';

interface ImageUploaderProps {
  image: File | null
  onImageUpload: (file: File) => void
  initialImageUrl?: string // URL предварительно загруженного изображения
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ image, onImageUpload, initialImageUrl }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>(initialImageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (initialImageUrl) {
      setImagePreviewUrl(initialImageUrl);
    } else {
      setImagePreviewUrl(undefined);
    }
  }, [initialImageUrl]);

  useEffect(() => {
    if (!image) {
      setImagePreviewUrl(undefined);
    }
  }, [image]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    processFile(e.dataTransfer.files[0]);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result as string);
      onImageUpload(file);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={styles.container}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      {imagePreviewUrl
        ? (
        <img src={imagePreviewUrl} alt="Preview" className={styles.imagePreview} />
          )
        : (
        <div className={styles.textWrapper}>
            <SvgIcon name='image-upload' className={styles.icon} />
          <p className={styles.text}>{t('imageUpload')}</p>
        </div>
          )}
    </div>
  );
};

export default ImageUploader;
