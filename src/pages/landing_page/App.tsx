import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { HowItWorks } from './components/HowItWorks';
import { RepairersAndReviews } from './components/RepairersAndReviews';
import { Marketplace } from './components/Marketplace';
import { Blogs } from './components/Blogs';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        <main className="relative">
          <div id="home">
            <Hero />
          </div>
          <div id="services">
            <Services />
          </div>
          <div id="how-it-works">
            <HowItWorks />
          </div>
          <div id="avis">
            <RepairersAndReviews />
          </div>
          <div id="marketplace">
            <Marketplace />
          </div>
          <div id="blogs">
            <Blogs />
          </div>
          <div id="contact">
            <Footer />
          </div>
        </main>
        <Chatbot />
      </div>
    </div>
  );
}