// components/Subscription.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axiosInstance from "../config/axiosInstance.js";

function Subscription() {
    
    const [subscribedChannels, setSubscribedChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    useEffect(() => {
       
        fetchSubscribedChannels();
        
    }, []);

    const fetchSubscribedChannels = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get(`/api/v1/subs/gsc`);
            
            // Handle your response structure safely
            const data = response.data?.data || [];
            
            // Extract subscribedChannel from each subscription item
            const channels = data
                .map(item => item.subscribedChannel)
                .filter(Boolean);   // Remove any null/undefined entries

            setSubscribedChannels(channels);
        } catch (err) {
            console.error("Error fetching subscriptions:", err);
            if (err.response?.status === 401) {
                setError("Please login to see your subscriptions");
            } else {
                setError("Failed to load your subscriptions. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const formatCount = (num = 0) => {
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
        if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
        return num.toLocaleString();
    };

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-400 text-lg">Loading your subscriptions...</p>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 flex items-center justify-center text-white">
                <div className="text-center max-w-md px-6">
                    <div className="text-6xl mb-6">😕</div>
                    <h2 className="text-2xl font-semibold mb-4">Oops!</h2>
                    <p className="text-gray-400 mb-8">{error}</p>
                    <button
                        onClick={fetchSubscribedChannels}
                        className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-2xl font-medium transition-all active:scale-95"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-bold text-white tracking-tight">Subscriptions</h1>
                    <p className="text-gray-400 mt-3 text-xl">
                        Channels you've subscribed to • {subscribedChannels.length} channels
                    </p>
                </div>

                {subscribedChannels.length === 0 ? (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="text-7xl mb-8 opacity-70">📺</div>
                        <h3 className="text-3xl font-semibold text-white mb-4">No subscriptions yet</h3>
                        <p className="text-gray-400 max-w-md text-lg mb-10">
                            You haven't subscribed to any channels yet.<br />
                            Explore amazing creators on the Feed!
                        </p>
                        <Link 
                            to="/"
                            className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-2xl font-semibold text-lg transition-all shadow-lg shadow-red-600/30"
                        >
                            Browse Feed
                        </Link>
                    </div>
                ) : (
                    /* Channels Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {subscribedChannels.map((channel) => (
                            <div 
                                key={channel._id}
                                className="group bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-red-500/30 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex flex-col items-center text-center">
                                    {/* Avatar */}
                                    <div className="relative mb-6">
                                        <img 
                                            src={channel.avatar} 
                                            alt={channel.username}
                                            className="w-28 h-28 rounded-full object-cover border-4 border-gray-800 group-hover:border-red-500 transition-colors duration-300"
                                        />
                                        <div className="absolute bottom-2 right-2 w-7 h-7 bg-green-500 border-[3px] border-gray-900 rounded-full"></div>
                                    </div>

                                    {/* Channel Info */}
                                    <h3 className="font-semibold text-xl text-white mb-1 line-clamp-1">
                                        {channel.fullname || channel.username}
                                    </h3>
                                    
                                    <p className="text-gray-400 text-sm mb-8">
                                        @{channel.username}
                                    </p>

                                    {/* Uncomment if you want to show subscriber count */}
                                    {/* <p className="text-gray-500 text-sm mb-8">
                                        {formatCount(channel.subscribers || 0)} subscribers
                                    </p> */}

                                    {/* Visit Channel Button */}
                                    <Link 
                                        to={`/channel/${channel._id}`}
                                        className="w-full py-3.5 bg-white/10 hover:bg-white/15 border border-white/10 
                                                   text-white font-medium rounded-2xl transition-all text-sm active:scale-95"
                                    >
                                        Visit Channel
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Subscription;