import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          {/* Logo and About */}
          <div className="mb-6 md:mb-0 md:w-1/2">
            <p className="mt-2 text-sm text-gray-400">
              Your ultimate destination for streaming movies and TV shows. Watch
              anywhere, anytime.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-8 md:w-1/2 text-sm">
            <a href="/home" className="hover:text-gray-400">
              Home
            </a>
            <a href="/tv" className="hover:text-gray-400">
              TV Shows
            </a>
            <a href="/movie" className="hover:text-gray-400">
              Movies
            </a>
            <a href="/myprofile" className="hover:text-gray-400">
              Profile
            </a>
            <a href="/#" className="hover:text-gray-400">
              Contact Us
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Social Media Links */}
        <div className="flex flex-wrap justify-center space-x-6 text-gray-400">
          <a href="#" className="hover:text-white">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-white">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-white">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-white">
            <FaYoutube />
          </a>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-gray-500 text-sm mt-6">
          <p>
            &copy; {new Date().getFullYear()} flexifyy. All Rights Reserved.
          </p>
          {/* Uncomment if needed */}
          {/* <p>
          Made with ❤️ by{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Your Name
          </a>
        </p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
