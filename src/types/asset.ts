export interface Asset3D {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  modelUrl: string;
  formats: string[];
  fileSize?: {
    glb?: number;
    html5?: number;
  };
}