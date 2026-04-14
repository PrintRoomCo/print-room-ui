import * as React from 'react';

export interface ProductImageRow {
  view: string;
  [key: string]: unknown;
}

type Props = {
  images: ProductImageRow[];
  value: string;
  onChange: (view: string) => void;
};

export function ViewTabs({ images, value, onChange }: Props) {
  const views = React.useMemo(
    () => Array.from(new Set(images.map((image) => image.view))),
    [images]
  );

  return (
    <div className="flex gap-2">
      {views.map((view) => {
        const isActive = view === value;
        return (
          <button
            key={view}
            type="button"
            className={`px-3 py-1 rounded transition-colors ${
              isActive ? 'bg-black text-white' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
            onClick={() => onChange(view)}
          >
            {view.replace('_', ' ')}
          </button>
        );
      })}
    </div>
  );
}
