// components/Video.jsx
import React from 'react';

function Video({ video, formatCount }) {
    return (
        <div className="flex-1">
            {/* Video Player */}
            <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl mb-6">
                <video
                    src={video.videoFile || video.videoUrl}
                    poster={video.thumbnail}
                    controls
                    className="w-full h-full"
                    autoPlay
                >
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Video Title */}
            <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
                {video.title}
            </h1>

            {/* Views and Date */}
            <div className="text-gray-400 mb-8">
                {formatCount(video.views)} views •{' '}
                {video.createdAt 
                    ? new Date(video.createdAt).toLocaleDateString('en-IN', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      }) 
                    : "Recently"}
            </div>
        </div>
    );
}

export default Video;