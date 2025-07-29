import { SignupPage } from "./components/SignupPage";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <>
      <SignupPage />
      <Toaster position="top-right" />
    </>
  );
}