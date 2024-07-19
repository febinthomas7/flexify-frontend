const Footer = () => {
  return (
    <footer className="bg-black   text-white p-4 md:p-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <a href="/about" className="hover:underline mr-4">
            About
          </a>
          <a href="/contact" className="hover:underline mr-4">
            Contact
          </a>
          <a href="/terms" className="hover:underline mr-4">
            Terms of Service
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
        </div>
        <div className="flex space-x-4 justify-center md:justify-start">
          <a href="#">
            <img src="/facebook.webp" alt="Facebook" className="w-6 h-6" />
          </a>
          <a href="#">
            <img src="/twitter.webp" alt="Twitter" className="w-6 h-6" />
          </a>
          <a href="#">
            <img src="/insta.webp" alt="Instagram" className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
