import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return <AuthProvider><AppRoutes /><Toaster position="top-right" toastOptions={{ duration: 4000, style: { borderRadius: "14px", fontWeight: 500 } }} /></AuthProvider>;
}
