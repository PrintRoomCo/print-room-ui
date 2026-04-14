import React, { useState } from 'react';
import { Check, ChevronLeft, ChevronRight, FileText, Globe } from 'lucide-react';
import { Button, Modal, ModalBody, ModalContent, ModalFooter } from '@print-room-studio/ui';

export type TechniqueId = 'screen' | 'heat' | 'embroidery';

type TechniqueConfig = {
  id: TechniqueId;
  label: string;
  description: string;
  moq: number;
  acceptedFileTypes: string[];
  details: {
    whyChooseIt: string;
    bestUsedFor: string;
    feelsLike: string;
    artworkTips: string;
    images: string[];
  };
};

export const TECHNIQUE_CONFIGS: TechniqueConfig[] = [
  {
    id: 'screen',
    label: 'Screen Printing',
    description: 'Best for bold spot colours, merch programs, and cost-effective bulk runs.',
    moq: 25,
    acceptedFileTypes: ['AI', 'EPS', 'PDF'],
    details: {
      whyChooseIt: 'Durable finish, vibrant solids, and strong value once quantities increase.',
      bestUsedFor: 'Band tees, event merch, uniforms, and retail capsule collections.',
      feelsLike: 'Soft handfeel with water-based inks or a classic print texture with plastisol.',
      artworkTips: 'Keep colours separated clearly and supply vector artwork where possible.',
      images: [
        'https://placehold.co/800x600/FBFBF6/2B3990?text=Screen+Printing+1',
        'https://placehold.co/800x600/EEE/4B4D72?text=Screen+Printing+2',
      ],
    },
  },
  {
    id: 'heat',
    label: 'Heat Transfers',
    description: 'Great for complex artwork, names and numbers, and lower minimum orders.',
    moq: 10,
    acceptedFileTypes: ['PDF', 'PNG', 'AI'],
    details: {
      whyChooseIt: 'Handles gradients, photo detail, and variable-data placement with minimal setup.',
      bestUsedFor: 'Sportswear, one-off placements, event packs, and short-run promotional products.',
      feelsLike: 'Smooth bonded transfer with a crisp edge.',
      artworkTips: 'Use high-resolution files and avoid tiny reversed text on transfer-heavy designs.',
      images: [
        'https://placehold.co/800x600/FBFBF6/2B3990?text=Heat+Transfers+1',
        'https://placehold.co/800x600/EEE/4B4D72?text=Heat+Transfers+2',
      ],
    },
  },
  {
    id: 'embroidery',
    label: 'Embroidery',
    description: 'Premium stitched branding for caps, polos, jackets, and hospitality uniforms.',
    moq: 25,
    acceptedFileTypes: ['AI', 'PDF', 'DST'],
    details: {
      whyChooseIt: 'Creates a tactile, premium finish that wears well over time.',
      bestUsedFor: 'Caps, workwear, restaurant uniforms, and corporate apparel.',
      feelsLike: 'Raised stitched texture with a structured finish.',
      artworkTips: 'Simplify small details and allow enough stroke weight for clean digitising.',
      images: [
        'https://placehold.co/800x600/FBFBF6/2B3990?text=Embroidery+1',
        'https://placehold.co/800x600/EEE/4B4D72?text=Embroidery+2',
      ],
    },
  },
];

type TechniquesGuideModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (techniqueId: TechniqueId) => void;
  initialTechnique?: TechniqueId;
};

export function TechniquesGuideModal({
  open,
  onOpenChange,
  onSelect,
  initialTechnique,
}: TechniquesGuideModalProps) {
  const [activeTab, setActiveTab] = useState<TechniqueId>(initialTechnique ?? TECHNIQUE_CONFIGS[0].id);
  const [imageIndex, setImageIndex] = useState(0);

  const technique = TECHNIQUE_CONFIGS.find((item) => item.id === activeTab) ?? TECHNIQUE_CONFIGS[0];
  const images = technique.details.images;

  const handleTabChange = (id: TechniqueId) => {
    setActiveTab(id);
    setImageIndex(0);
  };

  const handleSelect = () => {
    onSelect(technique.id);
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} size="xl">
      <ModalContent className="max-h-[90vh] overflow-hidden">
        <div className="border-b border-neutral-200">
          <div className="flex gap-0.5 overflow-x-auto px-4 pt-3">
            {TECHNIQUE_CONFIGS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTabChange(item.id)}
                className={`shrink-0 border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <ModalBody className="overflow-y-auto">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">{technique.label}</h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{technique.description}</p>

              <div className="mt-6 space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">Why choose it?</h3>
                  <p className="mt-1 text-sm text-neutral-600">{technique.details.whyChooseIt}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">Best used for</h3>
                  <p className="mt-1 text-sm text-neutral-600">{technique.details.bestUsedFor}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">Feels like</h3>
                  <p className="mt-1 text-sm text-neutral-600">{technique.details.feelsLike}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">Artwork tips</h3>
                  <p className="mt-1 text-sm text-neutral-600">{technique.details.artworkTips}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="relative overflow-hidden rounded-lg bg-neutral-100">
                {images.length === 0 ? (
                  <div className="flex h-72 items-center justify-center text-sm text-neutral-400">
                    Images coming soon
                  </div>
                ) : (
                <div
                  className="flex transition-transform duration-300"
                  style={{ transform: `translateX(-${imageIndex * 100}%)` }}
                >
                  {images.map((src, index) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${technique.label} example ${index + 1}`}
                      className="h-72 w-full shrink-0 object-cover"
                    />
                  ))}
                </div>

                )}

                {images.length > 1 ? (
                  <>
                    <button
                      type="button"
                      aria-label="Previous image"
                      onClick={() => setImageIndex((prev) => Math.max(0, prev - 1))}
                      disabled={imageIndex === 0}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow hover:bg-white disabled:opacity-30"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next image"
                      onClick={() => setImageIndex((prev) => Math.min(images.length - 1, prev + 1))}
                      disabled={imageIndex === images.length - 1}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow hover:bg-white disabled:opacity-30"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                ) : null}
              </div>

              {images.length > 1 ? (
                <div className="mt-3 flex justify-center gap-1.5">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Go to image ${index + 1}`}
                      onClick={() => setImageIndex(index)}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        index === imageIndex ? 'bg-neutral-900' : 'bg-neutral-300'
                      }`}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </ModalBody>

        <ModalFooter className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
            <span className="inline-flex items-center gap-1.5">
              <Globe className="h-4 w-4" />
              Available from {technique.moq} units
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              Files supported: {technique.acceptedFileTypes.join(', ').toLowerCase()}
            </span>
          </div>
          <Button type="button" onClick={handleSelect} className="rounded-full px-6">
            Select {technique.label}
            <Check className="ml-2 h-4 w-4" />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TechniquesGuideModal;
