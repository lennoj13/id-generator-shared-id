import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LayoutDashboard, CreditCard, User } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#6366f1"/>
            <path d="M7 16V8L11 14V8 M14 8H18 M16 8V14C16 15.1 15.1 16 14 16C13.5 16 13 15.8 13 15.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="header-title">NJ ID Generator</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <Link to="/" className="nav-link active">
            <LayoutDashboard size={16} /> Templates
          </Link>
          <a href="#" className="nav-link disabled" onClick={(e) => e.preventDefault()}>
            <CreditCard size={16} /> Custom IDs <span className="nav-badge">Soon</span>
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-nav-link active" onClick={() => setMenuOpen(false)}>
            <LayoutDashboard size={18} /> University Templates
          </Link>
          <a href="#" className="mobile-nav-link disabled" onClick={(e) => e.preventDefault()}>
            <CreditCard size={18} /> Custom IDs (Coming Soon)
          </a>
          <a href="#" className="mobile-nav-link disabled" onClick={(e) => e.preventDefault()}>
            <User size={18} /> Employee Badges (Coming Soon)
          </a>
        </div>
      )}
    </header>
  );
}
