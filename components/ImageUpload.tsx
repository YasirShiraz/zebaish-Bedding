"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

interface ImageUploadProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export default function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'zebaish_unsigne'); // Updated to match user config

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'djoc6w54l'}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const data = await response.json();

            if (data.secure_url) {
                onChange(data.secure_url);
            } else {
                console.error('Upload failed:', data);
                alert('Image upload failed. Please check Cloudinary configuration.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image');
        } finally {
            setLoading(false);
        }
    }, [onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        maxFiles: 1,
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg', '.webp']
        },
        disabled: disabled || loading
    });

    return (
        <div className="space-y-4 w-full">
            <div
                {...getRootProps()}
                className={`
          relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'}
          ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
            >
                <input {...getInputProps()} />

                {value && (value.startsWith('http') || value.startsWith('/')) ? (
                    <div className="relative w-full h-48">
                        <Image
                            fill
                            style={{ objectFit: 'contain' }}
                            alt="Upload"
                            src={value}
                            className="rounded-md"
                        />
                        {/* Overlay to indicate change */}
                        {!loading && !disabled && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-md">
                                <p className="text-white font-medium">Click or Drag to Replace</p>
                            </div>
                        )}
                    </div>
                ) : value ? (
                    <div className="relative w-full h-48 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                        <div className="text-center p-4">
                            <p className="text-sm text-gray-500 break-all mb-2">Current Image Path (Invalid for Web):</p>
                            <code className="text-xs bg-gray-200 dark:bg-gray-700 p-1 rounded block mb-4">{value}</code>
                            <p className="text-blue-500 font-medium text-sm">Upload a new image to fix</p>
                        </div>
                    </div>
                ) : (
                    <div className="text-center space-y-2">
                        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full inline-block">
                            {loading ? (
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 dark:border-white"></div>
                            ) : (
                                <svg className="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            )}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            {loading ? (
                                <p>Uploading to Cloudinary...</p>
                            ) : isDragActive ? (
                                <p>Drop the image here ...</p>
                            ) : (
                                <p>Drag & drop or <span className="text-blue-500 hover:text-blue-600 font-medium">browse</span></p>
                            )}
                        </div>
                        <p className="text-xs text-gray-400">Supports JPG, PNG, WEBP</p>
                    </div>
                )}
            </div>
        </div>
    );
}
