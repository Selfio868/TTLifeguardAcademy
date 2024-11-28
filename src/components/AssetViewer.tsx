import { Asset3D } from '../types/asset';
import Viewer3D from './Viewer3D';
import { Download, X } from 'lucide-react';

interface AssetViewerProps {
  asset: Asset3D;
  onClose: () => void;
}

export default function AssetViewer({ asset, onClose }: AssetViewerProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90vw] max-w-4xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{asset.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        <Viewer3D modelUrl={asset.modelUrl} enableVR />
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Download Options</h3>
          <div className="flex gap-3">
            {asset.formats.map((format) => (
              <button
                key={format}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Download size={16} />
                Download {format.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}