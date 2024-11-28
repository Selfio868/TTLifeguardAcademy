export const FILE_SIZE_LIMITS = {
  GLB: 50 * 1024 * 1024, // 50MB for GLB files
  HTML5: 100 * 1024 * 1024, // 100MB for HTML5 packages
  THUMBNAIL: 2 * 1024 * 1024 // 2MB for thumbnails
} as const;

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function isFileSizeValid(fileSize: number, fileType: keyof typeof FILE_SIZE_LIMITS): boolean {
  return fileSize <= FILE_SIZE_LIMITS[fileType];
}