import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white mt-20 py-16 overflow-hidden">
      {/* Animated background elements - Enhanced vibrant colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-lime-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 pb-12 border-b border-cyan-500/20">
          {/* Brand Section */}
          <div className="group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl group-hover:scale-110 transition-transform animate-float drop-shadow-lg">♻️</span>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-lime-300 bg-clip-text text-transparent">
                  CleanCity
                </h3>
                <p className="text-xs text-cyan-400 font-semibold">Powered by AI 🤖</p>
              </div>
            </div>
            <p className="text-cyan-200/80 text-sm leading-relaxed">
              Making cities cleaner, one report at a time. Join thousands of citizens in the fight against waste and earn rewards!
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 hover:bg-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-110">
                f
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-fuchsia-500/20 border border-fuchsia-400 flex items-center justify-center text-fuchsia-300 hover:bg-fuchsia-500/50 hover:shadow-lg hover:shadow-fuchsia-500/50 transition-all transform hover:scale-110">
                𝕏
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-lime-500/20 border border-lime-400 flex items-center justify-center text-lime-300 hover:bg-lime-500/50 hover:shadow-lg hover:shadow-lime-500/50 transition-all transform hover:scale-110">
                📷
              </a>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-bold mb-5 text-cyan-300 flex items-center gap-2">
              <span className="text-xl">✨</span> Features
            </h4>
            <ul className="text-cyan-200/70 text-sm space-y-3">
              {[
                { icon: '🖼️', text: 'Image Detection' },
                { icon: '🗺️', text: 'Location Tracking' },
                { icon: '🤖', text: 'AI Classification' },
                { icon: '⭐', text: 'Rewards System' }
              ].map((item, idx) => (
                <li key={idx} className="hover:text-fuchsia-400 transition-colors cursor-pointer flex items-center gap-2 hover:translate-x-1 duration-300 group/item">
                  <span className="group-hover/item:scale-125 transition-transform">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-5 text-fuchsia-300 flex items-center gap-2">
              <span className="text-xl">🔗</span> Quick Links
            </h4>
            <ul className="text-fuchsia-200/70 text-sm space-y-3">
              {[
                { icon: '📋', text: 'About Us' },
                { icon: '🤝', text: 'Partner With Us' },
                { icon: '💬', text: 'Support' },
                { icon: '⚖️', text: 'Terms & Privacy' }
              ].map((item, idx) => (
                <li key={idx} className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-2 hover:translate-x-1 duration-300 group/item">
                  <span className="group-hover/item:scale-125 transition-transform">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-5 text-lime-300 flex items-center gap-2">
              <span className="text-xl">📧</span> Contact
            </h4>
            <div className="space-y-3">
              <a href="mailto:hello@cleancity.io" className="text-lime-200/70 text-sm hover:text-cyan-400 transition-colors flex items-center gap-2 hover:translate-x-1 duration-300 group/contact">
                <span className="group-hover/contact:scale-125 transition-transform">📧</span> hello@cleancity.io
              </a>
              <a href="https://cleancity.io" target="_blank" rel="noopener noreferrer" className="text-lime-200/70 text-sm hover:text-fuchsia-400 transition-colors flex items-center gap-2 hover:translate-x-1 duration-300 group/contact">
                <span className="group-hover/contact:scale-125 transition-transform">🌐</span> www.cleancity.io
              </a>
              <a href="tel:+1-555-000-0000" className="text-lime-200/70 text-sm hover:text-lime-400 transition-colors flex items-center gap-2 hover:translate-x-1 duration-300 group/contact">
                <span className="group-hover/contact:scale-125 transition-transform">📱</span> +1 (555) 000-0000
              </a>
              <div className="pt-2 flex gap-2 flex-wrap">
                {['🔐', '🎯', '💚'].map((emoji, idx) => (
                  <span key={idx} className="text-xl hover:scale-125 transition-transform cursor-pointer animate-float" style={{animationDelay: `${idx * 0.2}s`}}>
                    {emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-6">
          <div className="text-center md:text-left">
            <p className="text-cyan-200/70 text-sm">
              © {currentYear} <span className="font-bold text-cyan-400">CleanCity</span>. All rights reserved. | Built with <span className="text-rose-500">❤️</span> for a cleaner world
            </p>
          </div>

          <div className="flex gap-4 flex-wrap justify-center">
            {[
              { text: 'Privacy Policy', link: '#privacy' },
              { text: 'Terms of Service', link: '#terms' },
              { text: 'Cookie Policy', link: '#cookies' }
            ].map((item, idx) => (
              <a 
                key={idx}
                href={item.link} 
                className="text-cyan-500/50 hover:text-fuchsia-400 transition-colors text-sm font-medium hover:underline"
              >
                {item.text}
              </a>
            ))}
          </div>
        </div>

        {/* Decorative top border - Enhanced gradient */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-cyan-500 via-fuchsia-500 via-lime-500 to-cyan-500 opacity-60 animate-shimmer"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 text-4xl opacity-30 animate-float drop-shadow-lg">♻️</div>
      <div className="absolute bottom-20 right-10 text-5xl opacity-30 animate-float animation-delay-2000 drop-shadow-lg">🌍</div>
    </footer>
  );
}
