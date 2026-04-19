// components/VideoInfo.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from "../config/axiosInstance.js";

function VideoInfo({ video, formatCount }) {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [subLoading, setSubLoading] = useState(false);

    const owner = video.ownerDetails?.[0] || video.owner || {};
    // Check if already subscribed 
  useEffect(() => {
    if (!owner?._id) return;

    const checkSubscription = async () => {
        const response = await axiosInstance.get(
            `/api/v1/subs/check/${owner._id}`
        );
          console.log(response.data.data)
        setIsSubscribed(response.data.data);
    };

    checkSubscription();
}, [owner?._id]);

    const handleSubscription = async () => {
        if (!currentUserId || !owner._id) return;

        setSubLoading(true);

        try {
            const response = await axiosInstance.post(`/api/v1/subs/c/${owner._id}`);
            console.log(response)
            if (response.status==201) {
                setIsSubscribed(!isSubscribed);
            }else if(response.status == 200){
                setIsSubscribed(!isSubscribed);
            }
        } catch (error) {
            console.error("Subscription error:", error);
            // You can add toast notification here later
        } finally {
            setSubLoading(false);
        }
    };
        
    return (
        <div className="space-y-6">
            {/* Channel Information + Subscribe Button */}
            <div className="flex items-center justify-between bg-gray-900 p-5 rounded-2xl">
                <div className="flex items-center gap-4">
                    <img 
                        src={owner.avatar} 
                        alt={owner.username}
                        className="w-12 h-12 rounded-full object-cover border border-gray-700"
                    />
                    <div>
                        <h3 className="font-semibold text-lg">
                            {owner.fullname || owner.username}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {formatCount(owner.subsCount || owner.subscribers || 0)} subscribers
                        </p>
                    </div>
                </div>

                {/* Subscribe Button */}
                <button 
                    onClick={handleSubscription}
                    className={`px-8 py-2.5 rounded-full font-semibold transition-all text-sm min-w-[120px]
                        ${isSubscribed 
                            ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                            : 'bg-red-600 hover:bg-red-700 text-white'}
                        disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                    {subLoading 
                        ? "Processing..." 
                        : isSubscribed 
                            ? "Subscribed" 
                            : "Subscribe"}
                </button>
            </div>

            {/* Description Section */}
            <div className="bg-gray-900 p-6 rounded-2xl">
                <div className={`text-gray-300 leading-relaxed whitespace-pre-wrap ${!showFullDesc && 'line-clamp-3'}`}>
                    {video.description || "No description provided for this video."}
                </div>
                
                {video.description && video.description.length > 150 && (
                    <button 
                        onClick={() => setShowFullDesc(!showFullDesc)}
                        className="text-blue-400 font-medium mt-4 hover:underline"
                    >
                        {showFullDesc ? "Show less" : "Show more"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default VideoInfo;