import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button, ProgressBar } from '@print-room-studio/ui';
import { Upload, Check, Trash2 } from 'lucide-react';

/* ── Inlined types ── */

export type ArtworkFileCategory = 'vector' | 'raster' | 'unknown';

/* ── Inlined constants & validation ── */

const SUPPORTED_EXTENSIONS = [
  'svg', 'ai', 'eps', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'tiff', 'tif',
];
const SUPPORTED_FORMATS_DISPLAY = '.jpg, .jpeg, .png, .svg, .ai, .eps, .pdf';
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const MAX_FILE_SIZE_DISPLAY = '10MB';
const INPUT_ACCEPT = '.jpg,.jpeg,.png,.svg,.ai,.eps,.pdf,image/*';

function validateArtworkFile(file: File): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (file.size > MAX_FILE_SIZE_BYTES) {
    errors.push(
      `File size (${(file.size / 1024 / 1024).toFixed(1)}MB) exceeds maximum of ${MAX_FILE_SIZE_DISPLAY}`,
    );
  }
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  if (!SUPPORTED_EXTENSIONS.includes(ext)) {
    errors.push(`File type (.${ext}) is not supported. Please use: ${SUPPORTED_FORMATS_DISPLAY}`);
  }
  return { valid: errors.length === 0, errors };
}

/* ── Inlined animation transition ── */

const transitions = {
  enter: { duration: 0.3, ease: 'easeOut' as const },
};

/* ── Component props ── */

export type ArtworkUploadProps = {
  logoId: string;
  currentFile?: File | null;
  currentFilename?: string | null;
  fileCategory?: ArtworkFileCategory;
  fileWarnings?: string[];
  isUploading: boolean;
  uploadProgress?: number;
  onFileSelect: (file: File) => Promise<void> | void;
  onRemove?: () => void;
  disabled?: boolean;
};

/* ── Component ── */

export function ArtworkUpload({
  logoId,
  currentFile,
  currentFilename,
  fileCategory: _fileCategory,
  fileWarnings: _fileWarnings,
  isUploading,
  uploadProgress = 0,
  onFileSelect,
  onRemove,
  disabled = false,
}: ArtworkUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dragDepthRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const hasArtwork = Boolean(
    (currentFile && currentFile.name !== 'placeholder.png') ||
      (currentFilename && currentFilename !== 'placeholder.png'),
  );

  const displayFilename =
    (currentFile && currentFile.name !== 'placeholder.png' ? currentFile.name : undefined) ??
    (currentFilename && currentFilename !== 'placeholder.png' ? currentFilename : undefined);

  const openPicker = () => {
    if (disabled || isUploading) return;
    inputRef.current?.click();
  };

  const handleCandidateFile = async (file?: File | null) => {
    if (!file || disabled || isUploading) return;

    const validation = validateArtworkFile(file);
    if (!validation.valid) {
      setValidationError(validation.errors.join(' '));
      return;
    }

    setValidationError(null);
    await onFileSelect(file);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || isUploading) return;
    dragDepthRef.current += 1;
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
    if (dragDepthRef.current === 0) setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragDepthRef.current = 0;
    setIsDragging(false);
    await handleCandidateFile(e.dataTransfer.files?.[0]);
  };

  // Uploading state: filename + progress bar
  if (isUploading && displayFilename) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitions.enter}
        className="group flex items-center justify-between gap-2 rounded-xl border border-neutral-300 px-6 py-5"
      >
        <div className="grid size-10 flex-none place-items-center overflow-hidden rounded-lg border border-neutral-300 bg-neutral-100">
          <Upload className="size-4 text-neutral-400" />
        </div>
        <div className="-mt-2 flex-1 overflow-hidden p-2">
          <p className="truncate text-sm font-semibold text-neutral-900">{displayFilename}</p>
          <ProgressBar
            className="mt-2"
            value={uploadProgress}
            variant="percentage"
            size="sm"
            showLabels={false}
          />
          <p className="mt-1 text-xs text-neutral-500">Converting your artwork...</p>
        </div>
      </motion.div>
    );
  }

  // Success state: file uploaded
  if (hasArtwork && displayFilename) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitions.enter}
        className="group flex items-center justify-between gap-2 rounded-xl border border-neutral-300 px-6 py-5"
      >
        <div className="grid size-10 flex-none place-items-center overflow-hidden rounded-lg border border-neutral-300 bg-neutral-100">
          <Check className="size-4 text-green-600" />
        </div>
        <div className="-mt-2 flex-1 overflow-hidden p-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-2 overflow-hidden">
              <p
                className="flex-1 truncate text-sm font-semibold text-neutral-900"
                title={displayFilename}
              >
                {displayFilename}
              </p>
              <Check className="size-4 shrink-0 text-green-600" />
            </div>
            {onRemove && (
              <div className="-mr-1 flex h-4 items-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={onRemove}
                  aria-label="Remove artwork"
                  className="size-6 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            )}
          </div>
          <ProgressBar
            className="mt-2"
            value={100}
            variant="percentage"
            size="sm"
            showLabels={false}
            color="#16a34a"
          />
        </div>
      </motion.div>
    );
  }

  // Idle state: upload zone
  return (
    <div>
      <div
        className={`cursor-pointer rounded-xl border border-dashed p-6 text-center transition-colors ${
          isDragging
            ? 'border-neutral-900 bg-neutral-50'
            : 'border-neutral-300 bg-white hover:border-neutral-400'
        } ${disabled ? 'pointer-events-none opacity-50' : ''}`}
        onClick={openPicker}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            openPicker();
          }
        }}
      >
        <div className="flex flex-col items-center">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
            <Upload className="h-4 w-4 text-neutral-600" />
          </div>
          <p className="text-sm text-neutral-700">
            We support {SUPPORTED_FORMATS_DISPLAY} files up to {MAX_FILE_SIZE_DISPLAY}
          </p>
          <p className="mt-1 text-sm text-neutral-500">Drag and drop or click to upload</p>
        </div>

        <input
          ref={inputRef}
          id={`artwork-upload-${logoId}`}
          type="file"
          accept={INPUT_ACCEPT}
          className="hidden"
          aria-label="Upload artwork"
          disabled={disabled || isUploading}
          onChange={async (e) => {
            await handleCandidateFile(e.target.files?.[0]);
          }}
        />
      </div>

      {validationError && <p className="mt-2 text-xs text-red-600">{validationError}</p>}
    </div>
  );
}

export default ArtworkUpload;
