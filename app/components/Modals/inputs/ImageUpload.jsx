"use client"
import React, { useCallback } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { TbPhotoPlus } from 'react-icons/tb'

export default function ImageUpload({
  onChange,
  value
}) {

  const handleUpload = useCallback((result) => {
    onChange(result.info.secure_url);
  }, [onChange])

  return (
    <CldUploadWidget 
    onUpload={handleUpload} 
    uploadPreset="vo92osae"
    options={{
      maxFiles: 1
    }}
  >
    {({ open }) => {
      return (
        <button
          onClick={() => open && open?.()}
          className="image-uploadbox relative">
          <TbPhotoPlus
            size={50}
          />
          <div className="font-semibold text-lg">
            Click to upload
          </div>
          {value && (
            <div className="
            absolute inset-0 w-full h-full">
              <Image
                fill 
                style={{ objectFit: 'cover' }} 
                src={value} 
                alt="House" 
              />
            </div>
          )}
        </button>
      ) 
  }}
  </CldUploadWidget>
);
}