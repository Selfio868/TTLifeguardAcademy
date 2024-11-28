import { Download, View } from 'lucide-react';
import { Asset3D } from '../types/asset';
import Button from './ui/Button';
import Card from './ui/Card';
import { formatFileSize, FILE_SIZE_LIMITS } from '../utils/fileSize';

interface AssetCardProps {
  asset: Asset3D;
  onView: (asset: Asset3D) => void;
}

export default function AssetCard({ asset, onView }: AssetCardProps) {
  return (
    <Card>
      <img 
        src={asset.thumbnailUrl} 
        alt={asset.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{asset.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{asset.description}</p>
        <p className="text-gray-500 text-xs mb-4">
          Max file size: {formatFileSize(FILE_SIZE_LIMITS.GLB)} (GLB), {formatFileSize(FILE_SIZE_LIMITS.HTML5)} (HTML5)
        </p>
        <div className="flex justify-between items-center">
          <Button onClick={() => onView(asset)}>
            <View size={16} />
            View 3D
          </Button>
          <div className="flex gap-2">
            {asset.formats.map((format) => (
              <Button key={format} variant="secondary">
                <Download size={14} />
                {format.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}