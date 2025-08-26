import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { DashboardImage } from '../components/DashboardImage';
import { Features } from '../components/Features';
import { QueryCreator } from '../components/QueryCreator';
import { Footer } from '../components/Footer';

export default function Index() {
  return (
    <div className="min-h-screen bg-ado-bg">
      <Header />
      <Hero />
      <DashboardImage />
      <Features />
      <QueryCreator />
      <Footer />
    </div>
  );
}
