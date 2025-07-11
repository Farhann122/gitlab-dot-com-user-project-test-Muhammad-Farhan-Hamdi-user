import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const controlHeader = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    return () => window.removeEventListener("scroll", controlHeader);
  }, [lastScrollY]);

  // Menutup 
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: "Work", path: "/work" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Ideas", path: "/" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full h-[65px] z-50 transition-transform duration-300 ${
        show
          ? "translate-y-0 bg-orange-500/80 backdrop-blur-md"
          : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-white">
        <div className="text-lg font-bold">
          Suit<span className="text-white/70">media</span>
        </div>

       {/* Tampilan Desktop */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium mt-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-white pb-1"
                  : "hover:text-white/80 transition"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded hover:bg-white/20 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-[70px] left-0 w-full bg-orange-500/90 backdrop-blur-md flex flex-col items-center py-4 space-y-4 text-sm font-medium animate-slideDown z-40">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-white pb-1"
                    : "hover:text-white/80 transition"
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
