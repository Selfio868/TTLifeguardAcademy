import { useState } from 'react';
import { supabase } from '../../config/supabase';
import { Upload } from 'lucide-react';
import { isFileSizeValid, FILE_SIZE_LIMITS } from '../../utils/fileSize';

export default function AssetUpload() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [glbFile, setGlbFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!glbFile || !thumbnail) {
      setError('Please select all required files');
      return;
    }

    if (!isFileSizeValid(glbFile.size, 'GLB')) {
      setError('GLB file exceeds size limit');
      return;
    }

    if (!isFileSizeValid(thumbnail.size, 'THUMBNAIL')) {
      setError('Thumbnail exceeds size limit');
      return;
    }

    setUploading(true);
    setError('');

    try {
      // Upload GLB file
      const glbFileName = `${Date.now()}-${glbFile.name}`;
      const { error: glbError, data: glbData } = await supabase.storage
        .from('models')
        .upload(glbFileName, glbFile);
      if (glbError) throw glbError;

      // Upload thumbnail
      const thumbFileName = `${Date.now()}-${thumbnail.name}`;
      const { error: thumbError, data: thumbData } = await supabase.storage
        .from('thumbnails')
        .upload(thumbFileName, thumbnail);
      if (thumbError) throw thumbError;

      // Get public URLs
      const { data: { publicUrl: modelUrl } } = supabase.storage
        .from('models')
        .getPublicUrl(glbFileName);

      const { data: { publicUrl: thumbnailUrl } } = supabase.storage
        .from('thumbnails')
        .getPublicUrl(thumbFileName);

      // Save metadata to database
      const { error: dbError } = await supabase
        .from('assets')
        .insert([{
          name,
          description,
          category,
          model_url: modelUrl,
          thumbnail_url: thumbnailUrl,
          formats: ['glb', 'html5'],
          file_size: {
            glb: glbFile.size,
          },
          created_at: new Date().toISOString(),
        }]);

      if (dbError) throw dbError;

      // Reset form
      setName('');
      setDescription('');
      setCategory('');
      setGlbFile(null);
      setThumbnail(null);
    } catch (err) {
      setError('Failed to upload asset');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Upload New Asset</h2>
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows={3}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">GLB File</label>
          <input
            type="file"
            accept=".glb"
            onChange={(e) => setGlbFile(e.target.files?.[0] || null)}
            className="w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            className="w-full"
            required
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 flex items-center justify-center gap-2"
        >
          <Upload size={20} />
          {uploading ? 'Uploading...' : 'Upload Asset'}
        </button>
      </form>
    </div>
  );
}