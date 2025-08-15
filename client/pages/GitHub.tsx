import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';

export default function GitHub() {
  return (
    <div className="min-h-screen bg-ado-bg">
      <Header />
      <main className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-ado-text font-inter text-4xl font-bold mb-8">
            GitHub
          </h1>
          <p className="text-ado-text font-montserrat text-xl leading-8 opacity-70 mb-8">
            This page is coming soon. Return to the homepage to explore our ADO Tool Suite.
          </p>
          <Link 
            to="/" 
            className="bg-ado-primary text-white font-inter text-17 font-bold px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors inline-block"
          >
            Return Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
