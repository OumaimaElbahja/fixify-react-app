import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronDown, User, Settings, LogOut, Bell } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const cartRef = useRef<HTMLDivElement>(null);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);

  // Mock cart data
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Batterie Samsung Galaxy S21",
      price: 450,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1609592542418-4ebd26e78ae7?w=80&h=80&fit=crop&crop=center",
      category: "Batteries",
    },
    {
      id: 2,
      name: "Écran iPhone 13 Pro Max",
      price: 1200,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=80&h=80&fit=crop&crop=center",
      category: "Écrans",
    },
    {
      id: 3,
      name: "Coque Protection Samsung S22",
      price: 65,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=80&h=80&fit=crop&crop=center",
      category: "Accessoires",
    },
  ]);

  // Calculate totals
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Handle quantity changes
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems((prev) =>
        prev.filter((item) => item.id !== id),
      );
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, quantity: newQuantity }
            : item,
        ),
      );
    }
  };

  // Handle outside clicks for cart and user menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target as Node) &&
        cartButtonRef.current &&
        !cartButtonRef.current.contains(event.target as Node)
      ) {
        setIsCartOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
  }, []);

  // Scroll tracking for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        {
          id: "home",
          element: document.getElementById("home"),
        },
        {
          id: "services",
          element: document.getElementById("services"),
        },
        {
          id: "how-it-works",
          element: document.getElementById("how-it-works"),
        },
        {
          id: "avis",
          element: document.getElementById("avis"),
        },
        {
          id: "marketplace",
          element: document.getElementById("marketplace"),
        },
        {
          id: "blogs",
          element: document.getElementById("blogs"),
        },
        {
          id: "contact",
          element: document.getElementById("contact"),
        },
      ].filter((section) => section.element);

      const scrollPosition = window.scrollY + 100; // Offset for header height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = (section.element as HTMLElement)
            .offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    // Set initial active section
    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links configuration - ordered to match sections in App.tsx
  const navLinks = [
    { href: "#home", label: "Accueil", id: "home" },
    {
      href: "#services",
      label: "Nos services",
      id: "services",
    },
    {
      href: "#how-it-works",
      label: "Comment ça marche ?",
      id: "how-it-works",
    },
    { href: "#avis", label: "Avis", id: "avis" },
    {
      href: "#marketplace",
      label: "Marketplace",
      id: "marketplace",
    },
    { href: "#blogs", label: "Blogs", id: "blogs" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  // Get link classes based on active state
  const getLinkClasses = (linkId: string) => {
    const isActive = activeSection === linkId;
    return `${
      isActive
        ? "text-[#e67a17] font-medium"
        : "text-gray-700 hover:text-[#e67a17]"
    } transition-all duration-200 whitespace-nowrap px-3 py-1 rounded-full hover:bg-white/40 hover:scale-105 active:scale-95 ${
      isActive ? "bg-white/30" : ""
    }`;
  };

  // Handle smooth scrolling for navigation
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();

      // Get target element by ID
      const targetElement = document.getElementById(
        href.slice(1),
      );

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Glass effect container */}
      <div className="backdrop-blur-md bg-white/80 border-b border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.12)]">
        <div className="w-full">
          <div className="flex flex-row items-center justify-center w-full">
            <div className="box-border flex flex-row gap-2 lg:gap-4 items-center justify-between px-4 md:px-5 py-3 w-full max-w-7xl">
              {/* Logo Section */}
              <div className="flex items-center shrink-0">
                <div className="h-8 relative w-auto flex items-center">
                  <div className="w-7 h-7 bg-gradient-to-br from-[--navy-blue] to-blue-800 rounded-xl flex items-center justify-center shadow-sm">
                    <span className="text-white font-semibold text-sm">F</span>
                  </div>
                  <div className="ml-2 font-semibold text-[#0b3e74] text-lg sm:text-xl leading-tight whitespace-nowrap drop-shadow-sm">
                    Fixify
                  </div>
                </div>
              </div>

              {/* Desktop Navigation - Hidden on smaller screens */}
              <div className="hidden xl:flex items-center gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className={getLinkClasses(link.id)}
                    onClick={(e) =>
                      handleNavClick(e, link.href)
                    }
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-2 lg:gap-4">
                {/* Notifications */}
                <button className="relative p-2 lg:p-3 text-gray-700 hover:text-[--navy-blue] transition-all duration-200 rounded-full hover:bg-white/40 backdrop-blur-sm group hover:scale-105 active:scale-95 hover:translate-x-1">
                  <Bell className="w-4 h-4 lg:w-5 lg:h-5 transition-transform group-hover:scale-110" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </button>

                {/* Shopping Cart */}
                <div className="relative">
                  <button
                    ref={cartButtonRef}
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    className="relative p-2 lg:p-3 text-gray-700 hover:text-[--navy-blue] transition-all duration-200 rounded-full hover:bg-white/40 backdrop-blur-sm group hover:scale-105 active:scale-95 hover:translate-x-1"
                  >
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 transition-transform group-hover:scale-110"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 10H6L5 9z"
                      />
                    </svg>
                    {totalItems > 0 && (
                      <Badge className="absolute -top-1 -right-1 bg-[#e67a17] text-white text-xs min-w-[18px] h-4 flex items-center justify-center p-0 border-2 border-white animate-pulse">
                        {totalItems > 99 ? "99+" : totalItems}
                      </Badge>
                    )}
                  </button>

                  {/* Cart Dropdown */}
                  {isCartOpen && (
                    <div
                      ref={cartRef}
                      className="absolute right-0 top-full mt-2 w-[300px] sm:w-[360px] lg:w-[400px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 z-50 max-h-[80vh] overflow-hidden"
                    >
                      {/* Cart Header */}
                      <div className="p-4 lg:p-5 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg text-[#1a3151]">
                            Panier ({totalItems})
                          </h3>
                          <button
                            onClick={() => setIsCartOpen(false)}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors hover:scale-105 active:scale-95"
                          >
                            <svg
                              className="w-4 h-4 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Cart Items */}
                      <div className="max-h-[280px] lg:max-h-[320px] overflow-y-auto">
                        {cartItems.length === 0 ? (
                          <div className="p-6 text-center">
                            <div className="w-14 h-14 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                              <svg
                                className="w-7 h-7 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 10H6L5 9z"
                                />
                              </svg>
                            </div>
                            <p className="text-gray-500 mb-4">
                              Votre panier est vide
                            </p>
                            <Button
                              onClick={() => {
                                setIsCartOpen(false);
                                document
                                  .getElementById("marketplace")
                                  ?.scrollIntoView({
                                    behavior: "smooth",
                                  });
                              }}
                              className="bg-[#195ea8] hover:bg-[#164a91] text-white hover:scale-105 active:scale-95 transition-all duration-200"
                            >
                              Découvrir nos produits
                            </Button>
                          </div>
                        ) : (
                          <div className="p-4 space-y-3">
                            {cartItems.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center gap-3 p-3 bg-white/60 rounded-xl hover:bg-white/80 transition-colors"
                              >
                                {/* Product Image */}
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                  <ImageWithFallback
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                {/* Product Info */}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-sm text-[#1a3151] line-clamp-2 mb-1">
                                    {item.name}
                                  </h4>
                                  <p className="text-xs text-gray-500 mb-2">
                                    {item.category}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <span className="font-semibold text-[#195ea8] text-sm">
                                      {item.price} MAD
                                    </span>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={() =>
                                          updateQuantity(
                                            item.id,
                                            item.quantity - 1,
                                          )
                                        }
                                        className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-all duration-200 hover:scale-105 active:scale-95"
                                      >
                                        <svg
                                          className="w-3 h-3"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M20 12H4"
                                          />
                                        </svg>
                                      </button>
                                      <span className="w-6 text-center font-medium text-sm">
                                        {item.quantity}
                                      </span>
                                      <button
                                        onClick={() =>
                                          updateQuantity(
                                            item.id,
                                            item.quantity + 1,
                                          )
                                        }
                                        className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-all duration-200 hover:scale-105 active:scale-95"
                                      >
                                        <svg
                                          className="w-3 h-3"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Cart Footer */}
                      {cartItems.length > 0 && (
                        <div className="p-4 border-t border-gray-100 bg-white/80">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-semibold text-[#1a3151]">
                              Total:
                            </span>
                            <span className="font-bold text-lg text-[#195ea8]">
                              {totalPrice.toLocaleString()} MAD
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setIsCartOpen(false)
                              }
                              className="flex-1 border-[#195ea8] text-[#195ea8] hover:bg-[#195ea8]/10 hover:scale-105 active:scale-95 transition-all duration-200"
                            >
                              Continuer
                            </Button>
                            <Button
                              size="sm"
                              className="flex-1 bg-[#195ea8] hover:bg-[#164a91] text-white hover:scale-105 active:scale-95 transition-all duration-200"
                            >
                              Commander
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* User Profile - Desktop */}
                <div className="hidden lg:flex items-center relative">
                  <button
                    ref={userButtonRef}
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 backdrop-blur-sm bg-white/60 h-8 px-3 rounded-full border border-white/30 hover:bg-[--navy-blue] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 hover:translate-x-1 group"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-[--navy-blue] to-blue-800 rounded-full flex items-center justify-center group-hover:from-white group-hover:to-gray-100 transition-all duration-300">
                      <User className="w-3 h-3 text-white group-hover:text-[--navy-blue]" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-white transition-all duration-300">
                      Ahmed M.
                    </span>
                    <ChevronDown className="w-3 h-3 text-gray-500 group-hover:text-white transition-all duration-300" />
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div
                      ref={userMenuRef}
                      className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 z-50 overflow-hidden"
                    >
                      {/* User Info Header */}
                      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-[--navy-blue]/5 to-blue-50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[--navy-blue] to-blue-800 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Ahmed Mansouri</p>
                            <p className="text-xs text-gray-600">ahmed.mansouri@email.com</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-[--navy-blue]/10 rounded-xl transition-all duration-200 group hover:translate-x-1">
                          <User className="w-4 h-4 text-gray-500 group-hover:text-[--navy-blue]" />
                          <span className="text-sm text-gray-700 group-hover:text-[--navy-blue] font-medium">Mon profil</span>
                        </button>
                        <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-[--navy-blue]/10 rounded-xl transition-all duration-200 group hover:translate-x-1">
                          <Settings className="w-4 h-4 text-gray-500 group-hover:text-[--navy-blue]" />
                          <span className="text-sm text-gray-700 group-hover:text-[--navy-blue] font-medium">Paramètres</span>
                        </button>
                        <div className="border-t border-gray-100 my-2"></div>
                        <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-red-50 rounded-xl transition-all duration-200 group hover:translate-x-1">
                          <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
                          <span className="text-sm text-gray-700 group-hover:text-red-600 font-medium">Déconnexion</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile menu button */}
                <button
                  className="xl:hidden p-2 text-gray-700 hover:text-[--navy-blue] transition-all duration-200 rounded-full hover:bg-white/40 backdrop-blur-sm hover:scale-105 active:scale-95 hover:translate-x-1"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="xl:hidden backdrop-blur-md bg-white/85 border-t border-white/20 shadow-sm">
              <div className="px-4 py-3 space-y-3">
                {/* Mobile Navigation Links */}
                <nav className="flex flex-col space-y-1">
                  {navLinks.map((link) => (
                    <a
                      key={`mobile-${link.id}`}
                      href={link.href}
                      className={`${
                        activeSection === link.id
                          ? "text-[#e67a17] font-medium bg-white/50"
                          : "text-gray-700 hover:text-[#e67a17]"
                      } transition-all duration-200 py-2 px-3 rounded-xl hover:bg-white/50 backdrop-blur-sm hover:scale-105 active:scale-95 hover:translate-x-1`}
                      onClick={(e) => {
                        setIsMenuOpen(false);
                        handleNavClick(e, link.href);
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                {/* Mobile User Info */}
                <div className="pt-3 border-t border-white/20">
                  <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-[--navy-blue] to-blue-800 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Ahmed M.</p>
                      <p className="text-xs text-gray-600">Connecté</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}