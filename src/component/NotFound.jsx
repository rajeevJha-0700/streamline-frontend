// components/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 flex items-center justify-center px-4 overflow-hidden relative">
            {/* Background subtle elements */}
            <div className="absolute inset-0 bg-[radial-gradient(at_center,#ef444410_0%,transparent_70%)]"></div>
            
            <div className="text-center z-10 max-w-lg">
                {/* Large 404 Text */}
                <div className="relative mb-8">
                    <h1 className="text-[180px] md:text-[220px] font-bold text-white/10 tracking-tighter leading-none select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                            Oops!
                        </div>
                    </div>
                </div>

                {/* Message */}
                <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
                    Page Not Found
                </h2>
                
                <p className="text-gray-400 text-lg md:text-xl max-w-sm mx-auto mb-12">
                    The video or page you're looking for doesn't exist or has been moved.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        to="/"
                        className="group px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-red-600/40"
                    >
                        Go Back Home
                        <span className="text-xl group-hover:rotate-12 transition-transform">🏠</span>
                    </Link>

                    <Link 
                        to="/feed"
                        className="px-10 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-lg rounded-2xl transition-all active:scale-95"
                    >
                        Browse Feed
                    </Link>
                </div>

                {/* Decorative Element */}
                <div className="mt-16 text-gray-600 text-sm flex items-center justify-center gap-2">
                    <span>🎥</span>
                    StreamLine • Something went wrong? 
                    <Link to="/" className="text-red-400 hover:text-red-500 underline">
                        Report it
                    </Link>
                </div>
            </div>

            {/* Floating Video Icons (subtle decoration) */}
            <div className="absolute bottom-10 left-10 text-6xl opacity-10 hidden lg:block">📹</div>
            <div className="absolute top-20 right-20 text-6xl opacity-10 hidden lg:block rotate-12">🎬</div>
        </div>
    );
}

export default NotFound;