// Shared DeepRock Gallery image data.
// Single source of truth for both the homepage Gallery carousel and the /gallery page.

export type GalleryImage = {
  id: string
  src: string
  alt: string
  width: number
  height: number
  caption?: string
  /** CSS object-position used to keep faces/focal points in frame. */
  focus?: string
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'gallery-1',
    src: '/images/gallery/gallery-1.jpg',
    alt: 'Deep Rock team inspecting gold samples at a secure aggregation facility',
    width: 1000,
    height: 1250,
    caption: 'Gold sample inspection at our aggregation facility',
    focus: 'center 30%',
  },
  {
    id: 'gallery-2',
    src: '/images/gallery/gallery-2.jpg',
    alt: 'Technicians operating mineral processing equipment during a responsible mining operation',
    width: 1000,
    height: 1250,
    caption: 'Responsible mining operations and processing',
    focus: 'center 35%',
  },
  {
    id: 'galery-3',
    src: '/images/gallery/galery-3.jpg',
    alt: 'Deep Rock field team conducting a site assessment at a licensed mining partner',
    width: 1000,
    height: 1250,
    caption: 'Field assessment with a licensed mining partner',
    focus: 'center 30%',
  },
  {
    id: 'gallery-4',
    src: '/images/gallery/gallery-4.jpg',
    alt: 'Engineers reviewing exploration data during a technical services engagement',
    width: 1000,
    height: 1250,
    caption: 'Exploration and technical review',
    focus: 'center 32%',
  },
  {
    id: 'gallery-5',
    src: '/images/gallery/gallery-5.jpg',
    alt: 'Community engagement session hosted by Deep Rock near a mining community',
    width: 1000,
    height: 1250,
    caption: 'Community engagement session',
    focus: 'center 28%',
  },
  {
    id: 'gallery-6',
    src: '/images/gallery/gallery-6.jpg',
    alt: 'Deep Rock personnel at a secure gold weighing and documentation station',
    width: 1000,
    height: 1250,
    caption: 'Secure weighing and documentation',
    focus: 'center 35%',
  },
  {
    id: 'gallery-7',
    src: '/images/gallery/gallery-7.jpg',
    alt: 'Operational team gathered at a Deep Rock site following a responsible-sourcing review',
    width: 1000,
    height: 1250,
    caption: 'Team at a responsible-sourcing review',
    focus: 'center 30%',
  },
]
