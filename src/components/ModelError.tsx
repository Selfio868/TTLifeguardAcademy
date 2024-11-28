import { AlertCircle } from 'lucide-react';

interface ModelErrorProps {
  message: string;
}

export default function ModelError({ message }: ModelErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-red-500">
      <AlertCircle size={32} className="mb-2" />
      <p className="text-center">{message}</p>
    </div>
  );
}