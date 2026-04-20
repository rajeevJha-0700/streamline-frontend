// components/Header.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Logout from "./Logout.jsx";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const authStatus = useSelector((state) => state.authorization.status);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const NavigationItems = [
        { name: "Feed", path: "/", show: true },
        { name: "Subscriptions", path: "/subscription", show: authStatus },
        { name: "Playlists", path: "/playlist", show: authStatus },
        { name: "Profile", path: "/profile", show: authStatus },
        { name: "Login", path: "/login", show: !authStatus },
        { name: "Sign Up", path: "/registration", show: !authStatus },
    ];

    const isActive = (path) => location.pathname === path;

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                
                {/* Logo */}
                <div 
                    onClick={() => {
                        navigate("/");
                        closeMobileMenu();
                    }}
                    className="flex items-center gap-3 cursor-pointer group"
                >
                    <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30 transition-transform group-hover:scale-110">
                        <span className="text-white text-2xl font-bold">S</span>
                    </div>
                    <div>
                        <h1 className="font-serif text-4xl tracking-tight text-gray-900">
                            Stream<span className="text-red-600">Line</span>
                        </h1>
                        <p className="text-[10px] text-gray-500 -mt-1 tracking-[2px] font-medium">WATCH • CONNECT • FLOW</p>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-2">
                    {NavigationItems.map((item) =>
                        item.show ? (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                className={`px-5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300
                                    ${isActive(item.path)
                                        ? "bg-red-600 text-white shadow-lg shadow-red-500/40 scale-105"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                            >
                                {item.name}
                            </button>
                        ) : null
                    )}

                    {authStatus && (
                        <div className="ml-3">
                            <Logout 
                                className="px-5 py-2.5 rounded-2xl text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
                            />
                        </div>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button 
                    onClick={toggleMobileMenu}
                    className="md:hidden p-3 text-gray-700 hover:bg-gray-100 rounded-2xl transition-all"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="w-7 h-7" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6h12v12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-black/70 z-40" onClick={closeMobileMenu}>
                    <div 
                        className="bg-white absolute top-0 right-0 h-full w-80 shadow-2xl transform transition-transform duration-300 ease-out"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center">
                                        <span className="text-white text-2xl font-bold">S</span>
                                    </div>
                                    <h2 className="font-serif text-3xl text-gray-900">StreamLine</h2>
                                </div>
                                <button 
                                    onClick={closeMobileMenu}
                                    className="p-2 text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Mobile Navigation Links */}
                            <div className="flex flex-col gap-2">
                                {NavigationItems.map((item) =>
                                    item.show ? (
                                        <button
                                            key={item.name}
                                            onClick={() => {
                                                navigate(item.path);
                                                closeMobileMenu();
                                            }}
                                            className={`text-left px-6 py-4 rounded-2xl text-lg font-medium transition-all
                                                ${isActive(item.path)
                                                    ? "bg-red-600 text-white"
                                                    : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                        >
                                            {item.name}
                                        </button>
                                    ) : null
                                )}

                                {/* Logout in Mobile */}
                                {authStatus && (
                                    <div className="mt-4 px-6">
                                        <Logout 
                                            className="w-full text-left px-6 py-4 rounded-2xl text-lg font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;