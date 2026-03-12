import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Upload, X, ScanSearch, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

const Detection = () => {
  const { isAuthenticated } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ forged: boolean; confidence: number; details: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setFileName(file.name);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    // Simulated CNN analysis
    setTimeout(() => {
      const forged = Math.random() > 0.5;
      const confidence = Math.round(70 + Math.random() * 28);
      setResult({
        forged,
        confidence,
        details: forged
          ? "Suspicious artifacts detected: copy-move patterns found in regions. ELA analysis shows inconsistent compression levels."
          : "No significant tampering artifacts detected. Compression levels are consistent throughout the image.",
      });
      setAnalyzing(false);
    }, 2500);
  };

  const clearImage = () => {
    setImage(null);
    setFileName("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background grid-bg relative">
      <div className="scan-line absolute inset-0 pointer-events-none" />
      <Navbar />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-display text-3xl font-bold text-foreground mb-3 glow-text">
            Image Forgery Detection
          </h1>
          <p className="text-muted-foreground">Upload an image to analyze it for signs of tampering</p>
        </motion.div>

        {!image ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-primary/30 rounded-2xl p-16 text-center cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-all glow-border"
          >
            <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
            <p className="text-foreground font-medium mb-2">Drop your image here or click to upload</p>
            <p className="text-sm text-muted-foreground">Supports JPG, PNG, BMP, TIFF</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </motion.div>
        ) : (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-xl overflow-hidden border border-border bg-card/50 glow-border"
            >
              <button
                onClick={clearImage}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 border border-border text-muted-foreground hover:text-destructive transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <img src={image} alt="Uploaded" className="w-full max-h-96 object-contain bg-secondary/30" />
              <div className="p-4 border-t border-border flex items-center justify-between">
                <span className="text-sm text-muted-foreground truncate">{fileName}</span>
                {!analyzing && !result && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAnalyze}
                    className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-display text-xs font-semibold tracking-wider flex items-center gap-2 glow-box"
                  >
                    <ScanSearch className="w-4 h-4" /> Analyze
                  </motion.button>
                )}
              </div>
            </motion.div>

            <AnimatePresence>
              {analyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4 py-8"
                >
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                  <p className="font-display text-sm text-primary tracking-wider">Running CNN Analysis...</p>
                  <div className="w-64 h-1 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-xl border ${
                    result.forged
                      ? "border-destructive/40 bg-destructive/5"
                      : "border-success/40 bg-success/5"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {result.forged ? (
                      <AlertTriangle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                    ) : (
                      <CheckCircle2 className="w-8 h-8 text-success flex-shrink-0 mt-1" />
                    )}
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-1">
                        {result.forged ? "Forgery Detected" : "Image Appears Authentic"}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">{result.details}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-display text-muted-foreground tracking-wider">CONFIDENCE</span>
                        <div className="flex-1 h-2 rounded-full bg-secondary max-w-48">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.confidence}%` }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className={`h-full rounded-full ${result.forged ? "bg-destructive" : "bg-success"}`}
                          />
                        </div>
                        <span className={`text-sm font-bold ${result.forged ? "text-destructive" : "text-success"}`}>
                          {result.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={clearImage}
                    className="mt-6 w-full py-3 rounded-lg border border-border bg-secondary text-secondary-foreground font-display text-xs font-semibold tracking-wider hover:bg-secondary/80 transition-colors"
                  >
                    Analyze Another Image
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detection;
