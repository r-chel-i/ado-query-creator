import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';

export default function Rachel() {
  return (
    <div className="min-h-screen bg-ado-bg">
      <Header />
      <main className="px-4 py-6">
        <div className="max-w-4xl mx-auto text-left">
          <h1 className="text-ado-text font-inter text-4xl font-bold mb-12 text-center">
             🐝 Rachel's Project
          </h1>
        </div>
      </main>
      <Footer />
    </div>
  );
}
