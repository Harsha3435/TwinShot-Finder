import { useState, useCallback } from "react";
import { Upload, Link as LinkIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface UploadSectionProps {
  onImageSelect: (imageUrl: string) => void;
}

export const UploadSection = ({ onImageSelect }: UploadSectionProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateImageUrl = (url: string): boolean => {
    try {
      new URL(url);
      return /\.(jpg|jpeg|png|webp|gif)$/i.test(url);
    } catch {
      return false;
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload a JPEG or PNG image.",
          variant: "destructive",
        });
        return;
      }
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onImageSelect(url);
    }
  }, [onImageSelect, toast]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload a JPEG or PNG image.",
          variant: "destructive",
        });
        return;
      }
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onImageSelect(url);
    }
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      toast({
        title: "Empty URL",
        description: "Please enter an image URL.",
        variant: "destructive",
      });
      return;
    }

    if (!validateImageUrl(urlInput)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid image URL ending with .jpg, .jpeg, or .png.",
        variant: "destructive",
      });
      return;
    }

    setPreviewUrl(urlInput);
    onImageSelect(urlInput);
  };

  const clearPreview = () => {
    setPreviewUrl(null);
    setUrlInput("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
      {!previewUrl ? (
        <>
          <div
            className={cn(
              "relative border-2 border-dashed rounded-xl p-12 transition-all duration-300",
              dragActive
                ? "border-primary bg-primary/5 scale-105"
                : "border-border hover:border-primary/50"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleFileInput}
            />
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-4 shadow-elevated">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Drop an image here
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                or click the button to browse (JPEG, PNG)
              </p>
              <label htmlFor="file-upload">
                <Button variant="secondary" size="lg" type="button" asChild>
                  <span className="cursor-pointer">Choose File</span>
                </Button>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground font-medium">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                placeholder="Paste image URL here..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit()}
                className="h-12"
              />
            </div>
            <Button onClick={handleUrlSubmit} size="lg" className="gap-2">
              <LinkIcon className="w-4 h-4" />
              Load URL
            </Button>
          </div>
        </>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-border shadow-elevated animate-slide-up">
          <button
            onClick={clearPreview}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/90 backdrop-blur flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <img
            src={previewUrl}
            alt="Upload preview"
            className="w-full h-auto max-h-96 object-contain bg-muted"
          />
        </div>
      )}
    </div>
  );
};
