import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black text-white border-t border-zinc-800 px-6 pt-10 pb-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Liens légaux */}
        <div className="flex flex-wrap gap-3 text-gray-400">
          <Link href="/TermsConditions" className="hover:text-primary-pizza transition">
            Termes & Conditions
          </Link>
          <span className="hidden sm:inline">|</span>
          <Link href="#" className="hover:text-primary-pizza transition">
            Politique de confidentialité
          </Link>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex gap-4">
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="group">
            <Image
              src="/assets/icons8-facebook-50.svg"
              alt="Facebook"
              width={32}
              height={32}
              className="group-hover:scale-110 group-hover:brightness-90 transition-transform duration-200"
            />
          </a>
          <a href="https://www.instagram.com/lespizzaiolas/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group">
            <Image
              src="/assets/instagram.svg"
              alt="Instagram"
              width={32}
              height={32}
              className="group-hover:scale-110 group-hover:brightness-90 transition-transform duration-200"
            />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="group">
            <Image
              src="/assets/icons8-tiktok (1).svg"
              alt="TikTok"
              width={36}
              height={36}
              className="group-hover:scale-110 group-hover:brightness-90 transition-transform duration-200"
            />
          </a>
        </div>

        {/* Droits réservés */}
        <p className="text-center text-gray-500 text-xs md:text-sm">
          © {new Date().getFullYear()} <span className="font-semibold text-white">Les Pizzaiolas</span>. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
