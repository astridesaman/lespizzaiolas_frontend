import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="c-space pt-7 pb-3 border-t border-black-300 flex flex-wrap justify-between items-center gap-5 bg-black text-white">
      {/* Liens légaux */}
      <div className="flex gap-2 text-white-500">
        <Link href='/TermsConditions' className="hover:underline">
          <p>Termes & Conditions</p>
        </Link>
        <span>|</span>
        <Link href="#" className="hover:underline">
          <p>Politique de confidentialité</p>
        </Link>
      </div>

      {/* Réseaux sociaux */}
      <div className="flex gap-3">
        <div className="social-icon">
          <a
            href="#"
            className="group"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Image
              src="/assets/icons8-facebook-50.svg"
              alt="Facebook"
              width={40}
              height={40}
              className="w-8 h-8 group-hover:scale-110 group-hover:brightness-75 transition-transform duration-300"
            />
          </a>
        </div>
        <div className="social-icon">
          <a
            href="https://www.instagram.com/lespizzaiolas/"
            className="group"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Image
              src="/assets/instagram.svg"
              alt="Instagram"
              width={40}
              height={40}
              className="w-8 h-8 group-hover:scale-110 group-hover:brightness-75 transition-transform duration-300"
            />
          </a>
        </div>
        <div className="social-icon">
          <a
            href="#"
            className="group"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <Image
              src="/assets/icons8-tiktok (1).svg"
              alt="TikTok"
              width={40}
              height={40}
              className="w-10 h-10 group-hover:scale-110 group-hover:brightness-75 transition-transform duration-300"
            />
          </a>
        </div>
      </div>

      {/* Droits réservés */}
      <p className="text-white-500 text-sm text-center md:text-base">
        © 2024 Les Pizzaiolas. Tous droits réservés.
      </p>
    </footer>
  );
};

export default Footer;
