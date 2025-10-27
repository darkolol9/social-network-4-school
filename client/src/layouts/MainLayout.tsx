import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";


interface LayoutProps {
  children: ReactNode;
  hideNav: boolean;
}

const Layout = ({ children, hideNav = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col justify-center w-screen">
      {/* Navbar */}
      {!hideNav ? <Navbar brand={<span className="text-yellow-400 font-bold">Fache-book</span>}>
        <Link
          to="/"
          className="block px-3 py-2 rounded-md hover:bg-gray-700"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="block px-3 py-2 rounded-md hover:bg-gray-700"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="block px-3 py-2 rounded-md hover:bg-gray-700"
        >
          Contact
        </Link>
      </Navbar> : null
      }

      {/* Page content */}
      <main className="flex-1 bg-gray-50 p-4 flex flex-row justify-center ">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; {new Date().getFullYear()} Fache-book. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;

