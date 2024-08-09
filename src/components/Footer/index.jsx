import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-black   text-white px-4 py-8 md:px-8 md:py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex gap-4 py-3 text-[13px] sm:text-[15px]">
          <a href="#" className="hover:underline  text-wrap">
            About
          </a>
          <a href="#" className="hover:underline ">
            Contact
          </a>
          <a href="#" className="hover:underline ">
            Terms of Service
          </a>
          <a href="#" className="hover:underline ">
            Privacy Policy
          </a>
        </div>
        <div className="flex space-x-4 justify-center md:justify-start">
          <a href="#">
            <FaFacebookF />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
