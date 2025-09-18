import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    // Add smooth scrolling behavior
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      
      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: hsl(var(--background-secondary));
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-hover)));
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, hsl(var(--primary-hover)), hsl(var(--primary)));
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
};

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 80; // Account for fixed navigation
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};