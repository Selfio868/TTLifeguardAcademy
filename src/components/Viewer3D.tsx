import { useRef, Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Html } from '@react-three/drei';
import { VRButton, XR, Controllers, Hands } from '@react-three/xr';
import ModelError from './ModelError';

interface Model3DProps {
  url: string;
  onError: (error: Error) => void;
}

function Model3D({ url, onError }: Model3DProps) {
  try {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
  } catch (error) {
    onError(error as Error);
    return null;
  }
}

function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    </Html>
  );
}

interface Viewer3DProps {
  modelUrl: string;
  enableVR?: boolean;
}

export default function Viewer3D({ modelUrl, enableVR = false }: Viewer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<Error | null>(null);

  if (error) {
    return <ModelError message={`Failed to load 3D model: ${error.message}`} />;
  }

  return (
    <div ref={containerRef} className="w-full h-[500px] relative">
      {enableVR && <VRButton />}
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        {enableVR ? (
          <XR>
            <Controllers />
            <Hands />
            <Stage environment="city" intensity={0.5}>
              <Suspense fallback={<LoadingSpinner />}>
                <Model3D url={modelUrl} onError={setError} />
              </Suspense>
            </Stage>
            <OrbitControls enablePan enableZoom enableRotate />
          </XR>
        ) : (
          <Stage environment="city" intensity={0.5}>
            <Suspense fallback={<LoadingSpinner />}>
              <Model3D url={modelUrl} onError={setError} />
            </Suspense>
            <OrbitControls enablePan enableZoom enableRotate />
          </Stage>
        )}
      </Canvas>
    </div>
  );
}