import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Shield, Search, Brain, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const features = [
    { icon: Brain, title: "CNN Powered", desc: "Deep learning model trained on thousands of forged images" },
    { icon: Search, title: "Pixel Analysis", desc: "Detects splicing, copy-move, and retouching artifacts" },
    { icon: Shield, title: "High Accuracy", desc: "State-of-the-art detection with confidence scoring" },
  ];

  return (
    <div className="min-h-screen bg-background grid-bg relative overflow-hidden">
      <div className="scan-line absolute inset-0 pointer-events-none z-0" />
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">AI-Powered Forensics</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6 glow-text text-foreground">
            Welcome to Image Forgery Detection Using CNN
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload any image and let our Convolutional Neural Network analyze it for signs of tampering, splicing, or manipulation with forensic precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/detect")}
                className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm tracking-wider glow-box flex items-center gap-2 justify-center"
              >
                Start Detection <ArrowRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/login")}
                  className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm tracking-wider glow-box flex items-center gap-2 justify-center"
                >
                  Login <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/register")}
                  className="px-8 py-4 rounded-lg border border-primary/40 text-primary font-display font-semibold text-sm tracking-wider hover:bg-primary/10 transition-colors flex items-center gap-2 justify-center"
                >
                  Register
                </motion.button>
              </>
            )}
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
              className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm glow-border"
            >
              <f.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-display text-sm font-semibold mb-2 text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
