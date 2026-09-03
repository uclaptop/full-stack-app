/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, WhatsAppButton } from './components/Navigation';
import { Hero } from './components/Hero';
import { CategoryCollections } from './components/CategoryCollections';
import { ProductsSection } from './components/Products';
import { About } from './components/AboutServices';
import { RecommendedTech } from './components/RecommendedTech';
import { BrandMarquee } from './components/BrandMarquee';
import { SpotlightProduct } from './components/SpotlightProduct';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { Contact, MapSection, Footer } from './components/InfoSections';
import { CartDrawer } from './components/CartDrawer';
import AdminLogin from './admin/Login';
import Dashboard from './admin/Dashboard';
import ProtectedRoute from './admin/ProtectedRoute';
import AllProductsPage from './pages/AllProductsPage';

function MainSite() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, []);

  return (
    <div className="bg-bg-dark text-text-primary selection:bg-brand-blue selection:text-white overflow-x-hidden min-h-screen">
      <Navbar />
      <CartDrawer />
      <WhatsAppButton />
      <main className="pt-[114px] sm:pt-[118px] md:pt-[124px] lg:pt-[126px]">
        <Hero />
        <CategoryCollections />
        <ProductsSection />
        <About />
        <RecommendedTech />
        <BrandMarquee />
        <SpotlightProduct />
        <WhyChooseUsSection />
        <Contact />
        <MapSection />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainSite />} />
      <Route path="/products" element={<AllProductsPage />} />
      <Route path="/catalog" element={<AllProductsPage />} />
      <Route path="/uclaptop" element={<AdminLogin />} />
      <Route
        path="/uclaptop/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
