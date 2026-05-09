/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, WhatsAppButton } from './components/Navigation';
import { Hero } from './components/Hero';
import { About, Services } from './components/AboutServices';
import { ProductsSection } from './components/Products';
import { WhyChooseUs, Gallery, Contact, MapSection, Footer } from './components/InfoSections';
import AdminLogin from './admin/Login';
import Dashboard from './admin/Dashboard';
import ProtectedRoute from './admin/ProtectedRoute';

function MainSite() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, []);

  return (
    <div className="bg-bg-dark text-text-primary selection:bg-brand-blue selection:text-white overflow-x-hidden">
      <Navbar />
      <WhatsAppButton />
      <main>
        <Hero />
        <About />
        <Services />
        <ProductsSection />
        <WhyChooseUs />
        <Gallery />
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
