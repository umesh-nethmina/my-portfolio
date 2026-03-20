'use client'

import { useState, useRef, useCallback } from 'react'
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void
  currentImageUrl?: string
  bucket?: string
  folder?: string
  label?: string
}

export default function ImageUploader({
  onUploadComplete,
  currentImageUrl,
  bucket = 'portfolio-images',
  folder = 'uploads',
  label = 'Upload Image',
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(async (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (PNG, JPG, GIF, WebP)')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5MB')
      return
    }

    setError(null)
    setIsUploading(true)

    // Show local preview immediately
    const localPreview = URL.createObjectURL(file)
    setPreviewUrl(localPreview)

    try {
      const supabase = createClient()

      // Create unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName)

      setPreviewUrl(publicUrl)
      onUploadComplete(publicUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.')
      setPreviewUrl(null)
    } finally {
      setIsUploading(false)
      URL.revokeObjectURL(localPreview)
    }
  }, [bucket, folder, onUploadComplete])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }, [handleFile])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }, [handleFile])

  const removeImage = useCallback(() => {
    setPreviewUrl(null)
    setError(null)
    onUploadComplete('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [onUploadComplete])

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground/70">
        {label}
      </label>

      {previewUrl && !isUploading ? (
        /* Image Preview */
        <div className="relative group rounded-xl overflow-hidden border border-foreground/10 bg-foreground/5">
          <div className="relative h-48 w-full">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
          >
            <X size={14} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <p className="text-white text-xs truncate">Image uploaded successfully</p>
          </div>
        </div>
      ) : (
        /* Drop Zone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative flex flex-col items-center justify-center gap-3 
            h-48 rounded-xl border-2 border-dashed cursor-pointer
            transition-all duration-200 ease-in-out
            ${isDragging
              ? 'border-blue-500 bg-blue-500/10 scale-[1.02]'
              : 'border-foreground/20 bg-foreground/[0.02] hover:border-foreground/40 hover:bg-foreground/5'
            }
            ${isUploading ? 'pointer-events-none' : ''}
          `}
        >
          {isUploading ? (
            <>
              <Loader2 size={32} className="text-blue-500 animate-spin" />
              <p className="text-sm text-foreground/50">Uploading...</p>
            </>
          ) : (
            <>
              <div className={`
                p-3 rounded-full transition-colors
                ${isDragging ? 'bg-blue-500/20' : 'bg-foreground/5'}
              `}>
                {isDragging ? (
                  <Upload size={24} className="text-blue-500" />
                ) : (
                  <ImageIcon size={24} className="text-foreground/40" />
                )}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground/70">
                  {isDragging ? 'Drop your image here' : 'Drag & drop an image here'}
                </p>
                <p className="text-xs text-foreground/40 mt-1">
                  or <span className="text-blue-500 font-medium">click to browse</span>
                </p>
                <p className="text-xs text-foreground/30 mt-2">
                  PNG, JPG, GIF, WebP • Max 5MB
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 px-3 py-2 rounded-lg">
          <X size={14} />
          {error}
        </div>
      )}
    </div>
  )
}
