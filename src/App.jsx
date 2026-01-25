import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import FabMenu from './components/FabMenu';
import Hero from './components/Hero';
import MascotSection from './components/MascotSection';
import ProductGrid from './components/ProductGrid';
import StatsBar from './components/StatsBar';
import ReserveSection from './components/ReserveSection';
import Footer from './components/Footer';

function AppContent() {
  // Cart state: { productId: quantity }
  const [cart, setCart] = useState({});

  // No auto-scroll - let users browse products freely

  const handleQuantityChange = (productId, quantity) => {
    setCart(prev => ({
      ...prev,
      [productId]: Math.max(0, quantity),
    }));
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-theme-cream">
      {/* Fixed Header - minimal */}
      <Header />

      {/* FAB Menu - top right with radial options */}
      <FabMenu />

      {/* Section 1: Hero */}
      <div className="snap-section">
        <Hero />
      </div>

      {/* Section 2: Mascots */}
      <div className="snap-section flex flex-col">
        <MascotSection />
      </div>

      {/* Section 3: Stats + Products */}
      <div className="snap-section-auto flex flex-col">
        <StatsBar />
        <ProductGrid
          cart={cart}
          onQuantityChange={handleQuantityChange}
        />
      </div>

      {/* Section 4: Reserve (Form + Info Cards) + Footer */}
      <div className="snap-section-auto flex flex-col">
        <ReserveSection cart={cart} />
        <Footer />
      </div>
    </main>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
