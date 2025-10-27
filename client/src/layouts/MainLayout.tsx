import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";


interface LayoutProps {
  children: ReactNode;
  hideNav: boolean;
}

const Layout = ({ children, hideNav = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      {!hideNav ? <Navbar>
        <></>
      </Navbar> : null}

      {/* Page content */}
      <main className="flex-1 bg-gray-50">{children}</main>

    </div>
  );
};

export default Layout;
