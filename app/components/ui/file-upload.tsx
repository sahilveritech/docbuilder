import { useId, useRef, useState, type ChangeEvent } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "./button";

export interface FileUploadProps {
  label?: string;
  value?: string | null;
  onChange: (dataUrl: string | null) => void;
  accept?: string;
  maxSizeBytes?: number;
  hint?: string;
  className?: string;
}

export function FileUpload({
  label,
  value,
  onChange,
  accept = "image/*",
  maxSizeBytes = 1024 * 1024,
  hint,
  className,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const [error, setError] = useState<string | null>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > maxSizeBytes) {
      setError(
        `File too large. Max ${(maxSizeBytes / 1024 / 1024).toFixed(1)} MB`,
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onChange(typeof reader.result === "string" ? reader.result : null);
    };
    reader.onerror = () => setError("Failed to read file");
    reader.readAsDataURL(file);
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label ? (
        <label htmlFor={id} className="text-sm font-medium text-[var(--color-fg)]">
          {label}
        </label>
      ) : null}
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg border border-dashed border-[var(--color-border)] p-3 bg-[var(--color-surface)]",
        )}
      >
        <div className="h-14 w-14 rounded-md bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center overflow-hidden shrink-0">
          {value ? (
            <img
              src={value}
              alt="Uploaded preview"
              className="h-full w-full object-contain"
            />
          ) : (
            <ImageIcon className="h-6 w-6 text-[var(--color-muted)]" aria-hidden />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[var(--color-fg)]">
            {value ? "Logo uploaded" : "No logo selected"}
          </p>
          <p className="text-xs text-[var(--color-muted)] truncate">
            {hint ?? "PNG, JPG, or SVG. Max 1 MB."}
          </p>
          {error ? (
            <p className="text-xs text-[var(--color-danger)] mt-1">{error}</p>
          ) : null}
        </div>
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          onChange={handleFile}
          className="sr-only"
        />
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="secondary"
            leftIcon={<Upload className="h-3.5 w-3.5" />}
            onClick={() => inputRef.current?.click()}
          >
            {value ? "Replace" : "Upload"}
          </Button>
          {value ? (
            <Button
              size="icon"
              variant="ghost"
              aria-label="Remove"
              onClick={() => {
                onChange(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
