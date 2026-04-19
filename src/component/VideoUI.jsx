// components/VideoUI.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from "../config/axiosInstance.js";

import Video from "./Video.jsx";
import VideoInfo from "./VideoInfo.jsx";

function VideoUI() {
    const { id } = useParams();

    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Format numbers (K, M)
    const formatCount = (num = 0) => {
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
        if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
        return num.toLocaleString();
    };

    const fetchVideo = async (videoId) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axiosInstance.get(`/api/v1/video/v/${videoId}`);
            const videoData = response.data.data?.[0] || response.data.data;

            if (videoData) {
                setVideo(videoData);
            } else {
                setError("Video not found");
            }
        } catch (err) {
            console.error("Error fetching video:", err);
            setError("Failed to load video. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchVideo(id);
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
                <div className="text-xl">Loading video...</div>
            </div>
        );
    }

    if (error || !video) {
        return (
            <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-xl mb-4">{error || "Video not found"}</p>
                    <button 
                        onClick={() => fetchVideo(id)}
                        className="px-6 py-2 bg-red-600 rounded-xl hover:bg-red-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white pb-12">
            <div className="max-w-7xl mx-auto px-4 pt-6 flex flex-col lg:flex-row gap-8">
                
                {/* Video Player Section - No re-render on subscribe */}
                <Video 
                    video={video} 
                    formatCount={formatCount} 
                />

                {/* Video Info Section - Subscribe state isolated here */}
                <div className="lg:w-96">
                    <VideoInfo 
                        video={video} 
                        formatCount={formatCount} 
                    />
                </div>
            </div>
        </div>
    );
}

export default VideoUI;