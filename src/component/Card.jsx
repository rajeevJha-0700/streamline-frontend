// components/Card.jsx
import React from "react";

function Card({ 
    thumbnail, 
    duration, 
    title, 
    channel, 
    avatar, 
    views = 0 
}) {
    return (
        <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            {/* Thumbnail Container */}
            <div className="relative aspect-video bg-gray-900 overflow-hidden">
                <img 
                    src={thumbnail} 
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
                
                {/* Duration Badge */}
                {duration && (
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-medium px-2.5 py-1 rounded-lg backdrop-blur-md">
                        {duration}
                    </div>
                )}

                {/* Subtle Play Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-2xl bg-white/90 flex items-center justify-center backdrop-blur-md scale-75 group-hover:scale-100 transition-transform duration-300">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="w-6 h-6 text-red-600" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2.5} 
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132z" 
                            />
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2.5} 
                                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 4.01V8" 
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-4 flex gap-3">
                {/* Avatar */}
                {avatar && (
                    <div className="flex-shrink-0 mt-1">
                        <img 
                            src={avatar} 
                            alt={channel}
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm"
                            loading="lazy"
                        />
                    </div>
                )}

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base leading-tight line-clamp-2 text-gray-900 group-hover:text-red-600 transition-colors duration-200">
                        {title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mt-2 font-medium truncate">
                        {channel}
                    </p>
                    
                    <p className="text-xs text-gray-500 mt-1">
                        {views.toLocaleString()} views
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Card;