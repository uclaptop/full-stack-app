/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar, WhatsAppButton } from './components/Navigation';
import { Hero } from './components/Hero';
import { CategoryCollections } from './components/CategoryCollections';
import { ProductsSection } from './components/Products';
import { About } from './components/AboutServices';
import { RecommendedTech } from './components/RecommendedTech';
import { BrandMarquee } from './components/BrandMarquee';
import { SpotlightProduct } from './components/SpotlightProduct';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { Contact, MapSection, Footer } from './components/InfoSections';
import { CartDrawer } from './components/CartDrawer';
import AdminLogin from './admin/Login';
import Dashboard from './admin/Dashboard';
import ProtectedRoute from './admin/ProtectedRoute';
import AllProductsPage from './pages/AllProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

function MainSite() {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, [location.hash, location.pathname]);

  return (
    <div className="bg-bg-dark text-text-primary selection:bg-brand-blue selection:text-white overflow-x-hidden min-h-screen">
      <Navbar />
      <CartDrawer />
      <WhatsAppButton />
      <main className="pt-[96px] sm:pt-[108px] md:pt-[118px] lg:pt-[124px]">
        <Hero />
        <CategoryCollections />
        <ProductsSection />
        <About />
        <RecommendedTech />
        <BrandMarquee />
        <SpotlightProduct />
        <WhyChooseUsSection />
        <CustomerReviewsSection />
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
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
      <Route path="/uclaptop" element={<AdminLogin />} />
      <Route
        path="/uclaptop/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      {/* Convenient Aliases & Redirects */}
      <Route path="/admin" element={<Navigate to="/uclaptop" replace />} />
      <Route path="/admin/dashboard" element={<Navigate to="/uclaptop/dashboard" replace />} />
      <Route path="/login" element={<Navigate to="/uclaptop" replace />} />
      <Route path="/dashboard" element={<Navigate to="/uclaptop/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
