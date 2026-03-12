import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, LogOut } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-border bg-background/80 backdrop-blur-md">
      <Link to="/" className="flex items-center gap-2">
        <Shield className="w-6 h-6 text-primary" />
        <span className="font-display text-sm font-bold text-foreground tracking-wider">FORGERY DETECT</span>
      </Link>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Link
              to="/detect"
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Detection
            </Link>
            <span className="text-sm text-muted-foreground">
              {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
