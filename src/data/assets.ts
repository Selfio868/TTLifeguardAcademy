import { Asset3D } from '../types/asset';

export const assets: Asset3D[] = [
  {
    id: 'spine-board',
    name: 'Spine Board',
    description: 'Professional rescue spine board with straps and head immobilizer',
    category: 'Medical Equipment',
    thumbnailUrl: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800',
    modelUrl: '/models/spine-board.glb',
    formats: ['glb', 'html5'],
  },
  {
    id: 'rescue-binoculars',
    name: 'Rescue Binoculars',
    description: 'Professional lifeguard binoculars with compass',
    category: 'Surveillance Equipment',
    thumbnailUrl: 'https://images.unsplash.com/photo-1582994254571-52c62d96ebab?auto=format&fit=crop&w=800',
    modelUrl: '/models/rescue-binoculars.glb',
    formats: ['glb', 'html5'],
  },
  {
    id: 'cpr-kit',
    name: 'CPR Kit',
    description: 'Complete CPR rescue kit with mask and accessories',
    category: 'Medical Equipment',
    thumbnailUrl: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800',
    modelUrl: '/models/cpr-kit.glb',
    formats: ['glb', 'html5'],
  }
];