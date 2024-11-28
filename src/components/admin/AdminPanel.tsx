import { useEffect, useState } from 'react';
import { supabase } from '../../config/supabase';
import { Trash2 } from 'lucide-react';
import { Asset3D } from '../../types/asset';
import AssetUpload from './AssetUpload';

export default function AdminPanel() {
  const [assets, setAssets] = useState<Asset3D[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAssets(data as Asset3D[]);
    }
    setLoading(false);
  };

  const handleDelete = async (asset: Asset3D) => {
    if (!window.confirm('Are you sure you want to delete this asset?')) return;

    try {
      // Delete from database
      const { error: dbError } = await supabase
        .from('assets')
        .delete()
        .eq('id', asset.id);
      if (dbError) throw dbError;

      // Delete files from storage
      const modelFileName = asset.modelUrl.split('/').pop();
      const thumbnailFileName = asset.thumbnailUrl.split('/').pop();

      if (modelFileName) {
        const { error: modelError } = await supabase.storage
          .from('models')
          .remove([modelFileName]);
        if (modelError) throw modelError;
      }

      if (thumbnailFileName) {
        const { error: thumbError } = await supabase.storage
          .from('thumbnails')
          .remove([thumbnailFileName]);
        if (thumbError) throw thumbError;
      }

      // Update UI
      setAssets(assets.filter(a => a.id !== asset.id));
    } catch (error) {
      console.error('Error deleting asset:', error);
      alert('Failed to delete asset');
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <AssetUpload />
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Manage Assets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <div key={asset.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={asset.thumbnailUrl} 
                alt={asset.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{asset.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{asset.description}</p>
                <button
                  onClick={() => handleDelete(asset)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}