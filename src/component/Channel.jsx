// components/Channel.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosInstance from "../config/axiosInstance.js";
import Card from "./Card.jsx";

function Channel() {
    const { id } = useParams();
    const currentUserId = useSelector(state => state.authorization?.userData?.data._id);
    const [channel, setChannel] = useState({});
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subLoading, setSubLoading] = useState(false);

    const fetchChannel = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axiosInstance.get(`/api/v1/user/channel/${id}`);
            
            const channelData = response.data?.data[0];

            if (channelData) {
                setChannel(channelData);
                console.log(channelData)
                setIsSubscribed(channelData.isSubscribed);

                // Extract videos -
                const channelVideos = channelData.videos || [];
                setVideos(Array.isArray(channelVideos) ? channelVideos : []);
            } else {
                setError("Channel not found");
            }
        } catch (err) {
            console.error("Error fetching channel:", err);
            setError("Failed to load channel. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchChannel();
    }, [id]);

    const handleSubscription = async () => {
        if (!currentUserId || subLoading) return;

        setSubLoading(true);
        try {
            const response = await axiosInstance.post(`/api/v1/subs/c/${id}`);
            
            if (response.status === 200 || response.status === 201) {
                setIsSubscribed(prev => !prev);
            }
        } catch (error) {
            console.error("Subscription error:", error);
            alert("Failed to update subscription. Please try again.");
        } finally {
            setSubLoading(false);
        }
    };

    const formatCount = (num = 0) => {
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
        if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
        return num.toLocaleString();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-14 h-14 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-400 text-xl">Loading channel...</p>
                </div>
            </div>
        );
    }

    if (error || !channel) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 flex items-center justify-center text-white">
                <div className="text-center">
                    <p className="text-red-500 text-2xl mb-6">{error || "Channel not found"}</p>
                    <button 
                        onClick={fetchChannel}
                        className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-2xl font-medium transition-all"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 pb-12">
            <div className="max-w-6xl mx-auto px-6 pt-8">
                
                {/* Channel Header */}
                <div className="bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden mb-12">
                    <div className="h-72 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 relative">
                        <div className="absolute -bottom-16 left-8 md:left-12">
                            <img 
                                src={channel.avatar} 
                                alt={channel.username}
                                className="w-36 h-36 rounded-full object-cover border-[6px] border-gray-950 shadow-2xl"
                            />
                        </div>
                    </div>

                    <div className="pt-20 pb-10 px-8 md:px-12">
                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                            <div>
                                <h1 className="text-5xl font-bold text-white tracking-tight">
                                    {channel.fullname}
                                </h1>
                                <p className="text-2xl text-gray-400 mt-2">@{channel.username}</p>
                            </div>

                            <button 
                                onClick={handleSubscription}
                                disabled={subLoading}
                                className={`px-12 py-4 rounded-2xl font-semibold text-lg transition-all shadow-xl min-w-[170px]
                                    ${isSubscribed 
                                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                                        : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/40'}`}
                            >
                                {subLoading 
                                    ? "Processing..." 
                                    : isSubscribed 
                                        ? "Subscribed" 
                                        : "Subscribe"}
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-16 mt-10">
                            <div>
                                <p className="text-4xl font-bold text-white">
                                    {formatCount(channel.subsCount)}
                                </p>
                                <p className="text-gray-400 tracking-widest text-sm">SUBSCRIBERS</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-white">
                                    {formatCount(channel.subscribedToCount)}
                                </p>
                                <p className="text-gray-400 tracking-widest text-sm">SUBSCRIBED TO</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Videos Section */}
                <div>
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                        Videos 
                        <span className="text-gray-500 text-xl font-normal">({videos.length})</span>
                    </h2>

                    {videos.length === 0 ? (
                        <div className="bg-gray-900/60 border border-white/10 rounded-3xl py-20 text-center">
                            <p className="text-2xl text-gray-400">No videos uploaded yet</p>
                            <p className="text-gray-500 mt-2">This channel hasn't uploaded any videos.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {videos.map((video) => (
                                <Link 
                                    key={video._id} 
                                    to={`/video/${video._id}`}
                                    className="block group"
                                >
                                    <Card
                                        thumbnail={video.thumbnail}
                                        duration={video.duration ? 
                                            `${Math.floor(video.duration / 60)}:${String(video.duration % 60).padStart(2, '0')}` 
                                            : "0:00"}
                                        title={video.title}
                                        channel={channel.fullname || channel.username}
                                        avatar={channel.avatar}
                                        views={video.views || 0}
                                    />
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Channel;