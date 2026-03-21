import { X } from "lucide-react";
import { getPreviewUrl } from "@/data/recipes";
import type { Recipe } from "@/data/recipes";

interface RecipeViewerProps {
  recipe: Recipe;
  spanish?: boolean;
  onClose: () => void;
}

export function RecipeViewer({ recipe, spanish, onClose }: RecipeViewerProps) {
  const fileId = spanish ? recipe.spanishDriveFileId : recipe.driveFileId;

  if (!fileId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <h2 className="font-semibold text-lg truncate pr-4">
            {recipe.title}
            {spanish && <span className="ml-2 text-sm text-primary font-medium">(Español)</span>}
          </h2>
          <button
            onClick={onClose}
            className="shrink-0 p-2 rounded-lg hover:bg-muted transition-colors active:scale-[0.95]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* PDF Embed */}
        <div className="flex-1 bg-muted">
          <iframe
            src={getPreviewUrl(fileId)}
            className="w-full h-full border-0"
            title={`${recipe.title} recipe PDF`}
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  );
}
