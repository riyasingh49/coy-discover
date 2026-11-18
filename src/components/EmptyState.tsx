import { Heart } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
      <Heart
        size={48}
        className="mx-auto mb-4 text-pink-400"
      />

      <h2 className="text-2xl font-bold text-gray-800">
        {title}
      </h2>

      <p className="mx-auto mt-3 max-w-sm text-gray-500">
        {description}
      </p>
    </div>
  );
}
