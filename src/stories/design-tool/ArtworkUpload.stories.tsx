import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ArtworkUpload } from '@vendored/design-tool/artwork/ArtworkUpload';

const meta = {
  title: 'App/Design Tool/ArtworkUpload',
  component: ArtworkUpload,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Artwork file upload zone with drag-and-drop, progress bar, and validation. Used in the design-tool quote flow to upload logos and artwork.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    logoId: 'front',
    onFileSelect: fn(),
    onRemove: fn(),
  },
} satisfies Meta<typeof ArtworkUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  args: {
    isUploading: false,
  },
};

export const Uploading: Story = {
  args: {
    isUploading: true,
    uploadProgress: 45,
    currentFilename: 'team-logo.svg',
  },
};

export const Success: Story = {
  args: {
    isUploading: false,
    currentFilename: 'team-logo.svg',
  },
};

export const Disabled: Story = {
  args: {
    isUploading: false,
    disabled: true,
  },
};

export const Interactive: Story = {
  args: {
    isUploading: false,
  },
  render: function InteractiveDemo() {
    const [filename, setFilename] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, []);

    const handleFileSelect = useCallback(async (file: File) => {
      setFilename(file.name);
      setIsUploading(true);
      setProgress(0);

      // Simulate upload progress
      await new Promise<void>((resolve) => {
        let current = 0;
        intervalRef.current = setInterval(() => {
          current += Math.random() * 20 + 5;
          if (current >= 100) {
            current = 100;
            if (intervalRef.current) clearInterval(intervalRef.current);
            resolve();
          }
          setProgress(Math.round(current));
        }, 300);
      });

      setIsUploading(false);
    }, []);

    const handleRemove = useCallback(() => {
      setFilename(null);
      setProgress(0);
    }, []);

    return (
      <div style={{ width: 420 }}>
        <ArtworkUpload
          logoId="interactive-demo"
          currentFilename={filename}
          isUploading={isUploading}
          uploadProgress={progress}
          onFileSelect={handleFileSelect}
          onRemove={handleRemove}
        />
        <p className="mt-3 text-xs text-neutral-500">
          Try dragging a file onto the drop zone, or click to browse.
        </p>
      </div>
    );
  },
};
