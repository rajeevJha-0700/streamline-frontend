// components/Feed.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../config/axiosInstance.js";

import Card from "./Card.jsx";

function Feed() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    // Fetch videos
    const getVideos = async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        else setLoading(true);

        try {
            setError(null);

            const response = await axiosInstance.get("/api/v1/video/feed");
           

            const videoData =
                response.data?.data ||
                response.data?.videos ||
                response.data ||
                [];

            setVideos(videoData);
        } catch (err) {
            console.error("Error fetching videos:", err);
            setError("Failed to load videos. Please check your connection and try again.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        getVideos();
    }, []);

    const handleRefresh = () => {
        getVideos(true);
    };

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-5">
                    <div className="w-14 h-14 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-400 text-xl font-medium">Discovering amazing videos...</p>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 flex items-center justify-center">
                <div className="text-center max-w-md px-6">
                    <div className="text-7xl mb-6">😕</div>
                    <h2 className="text-3xl font-semibold text-white mb-3">Something went wrong</h2>
                    <p className="text-gray-400 mb-10 text-lg">{error}</p>
                    <button
                        onClick={handleRefresh}
                        className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-2xl transition-all active:scale-95 flex items-center gap-3 shadow-xl shadow-red-600/30"
                    >
                        <span>Try Again</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.058 11H1M12 3v2m0 16v2m9-9H18" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 pb-12">
            <div className="max-w-7xl mx-auto px-6 py-12">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-5xl font-bold text-white tracking-tighter">
                            Discover Videos
                        </h1>
                        <p className="text-gray-400 mt-3 text-xl">
                            Fresh content from talented creators around the world
                        </p>
                    </div>

                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="flex items-center gap-3 px-7 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white rounded-2xl font-medium transition-all active:scale-95 disabled:opacity-70 backdrop-blur-md"
                    >
                        {refreshing ? (
                            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.058 11H1M12 3v2m0 16v2m9-9H18" />
                            </svg>
                        )}
                        <span>Refresh Feed</span>
                    </button>
                </div>

                {/* Empty State */}
                {videos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-28 text-center">
                        <div className="text-8xl mb-8 opacity-75">📭</div>
                        <h3 className="text-4xl font-semibold text-white mb-4">No videos yet</h3>
                        <p className="text-gray-400 max-w-md text-lg">
                            Be the first to upload a video or check back later for fresh content!
                        </p>
                        <Link
                            to="/upload-video"
                            className="mt-10 inline-block bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-2xl font-semibold text-lg transition-all shadow-lg shadow-red-600/30"
                        >
                            Upload Your First Video
                        </Link>
                    </div>
                ) : (
                    /* Responsive Video Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                        {videos.map((video) => (
                            <Link
                                key={video._id}
                                to={`/video/${video._id}`}
                                className="group block transform transition-all duration-300 hover:-translate-y-1"
                            >
                                <Card
                                    thumbnail={video.thumbnail}
                                    duration={video.duration}
                                    title={video.title}
                                    channel={video.username || video.channel || "Unknown"}
                                    avatar={video.avatar}
                                    views={video.views || 0}
                                />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Feed;