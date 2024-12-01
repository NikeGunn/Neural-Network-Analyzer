import React from 'react';
import { Brain, Github, Twitter, Linkedin } from 'lucide-react';
import { Newsletter } from './Newsletter';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1120] border-t border-gray-800 text-gray-300">
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* Hauba AI Logo */}
              <Brain className="w-8 h-8 text-blue-500" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Hauba AI
              </h2>
            </div>
            <p className="leading-relaxed text-gray-400">
              Empowering the next generation of AI researchers and students with
              cutting-edge neural network visualization tools.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {/* Links with "Soon" Labels */}
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Documentation (Soon)
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Tutorials (Soon)
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  API Reference (Soon)
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Examples (Soon)
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-3">
              {/* Resources with "Soon" Labels */}
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Blog (Soon)
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Research Papers (Soon)
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Community (Soon)
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Support (Soon)
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="md:border-l md:border-gray-800 md:pl-12">
            <h3 className="text-lg font-semibold mb-4 text-white">Subscribe to Updates</h3>
            <p className="text-gray-400 text-sm mb-4">
              Stay informed about the latest features and releases.
            </p>
            {/* Newsletter Subscription */}
            <Newsletter />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Footer Copyright */}
            <p className="text-gray-400 text-sm">
              © {currentYear} Hauba AI. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              {[
                { icon: Github, label: 'GitHub', link: 'https://github.com/NikeGunn' },
                { icon: Twitter, label: 'Twitter', link: 'https://x.com/Carryon_Nikhil' },
                { icon: Linkedin, label: 'LinkedIn', link: 'https://linkedin.com/in/bhagatnikhil/' }
              ].map(({ icon: Icon, label, link }) => (
                <a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label={label}
                >
                  {/* Dynamic Social Icon */}
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              {['Privacy Policy (Soon)', 'Terms of Service (Soon)'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm hover:text-blue-400 transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
