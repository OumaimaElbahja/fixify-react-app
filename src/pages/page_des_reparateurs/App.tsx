import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { RepairersListing } from "./components/RepairersListing";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Header />
      <RepairersListing />
      <Footer />
    </div>
  );
}