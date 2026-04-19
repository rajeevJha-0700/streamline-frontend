// components/UploadVideo.jsx
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axiosInstance from "../config/axiosInstance.js";
import Button from "./Button.jsx";
import Input from "./Input.jsx";

function UploadVideo() {
    const [loading, setLoading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [progress, setProgress] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);
    const [selectedVideoName, setSelectedVideoName] = useState("");

    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors } 
    } = useForm();

    // Get video duration
    const getVideoDuration = (videoFile) => {
        return new Promise((resolve, reject) => {
            if (!videoFile) {
                reject(new Error("No video file"));
                return;
            }

            const video = document.createElement('video');
            video.preload = 'metadata';

            video.onloadedmetadata = () => {
                window.URL.revokeObjectURL(video.src);
                resolve(Math.floor(video.duration)); // in seconds
            };

            video.onerror = () => {
                window.URL.revokeObjectURL(video.src);
                reject(new Error("Failed to read video duration"));
            };

            video.src = URL.createObjectURL(videoFile);
        });
    };

    // Format duration (e.g., 3:45 or 1:12:30)
    const formatDuration = (seconds) => {
        if (!seconds) return "0:00";
        
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        if (hrs > 0) {
            return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const onSubmit = async (data) => {
        setLoading(true);
        setProgress(0);

        try {
            let durationInSeconds = 0;
            if (data.video && data.video[0]) {
                durationInSeconds = await getVideoDuration(data.video[0]);
                setVideoDuration(durationInSeconds);
            }

            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("video", data.video[0]);
            formData.append("thumbnail", data.thumbnail[0]);
            formData.append("duration", durationInSeconds);

            const response = await axiosInstance.post(
                "/api/v1/video/upload-video", 
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setProgress(percentCompleted);
                    }
                }
            );

            setUploadSuccess(true);
            reset();
            setVideoDuration(0);
            setSelectedVideoName("");

            setTimeout(() => setUploadSuccess(false), 5000);

        } catch (error) {
            console.error("Upload Error:", error);
            const errorMsg = error.response?.data?.message || "Failed to upload video. Please try again.";
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 py-12 px-4 text-white">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                    
                    {/* Header */}
                    <div className="px-10 py-10 bg-gradient-to-r from-red-600 to-pink-600 text-white">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-3xl">
                                📤
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight">Upload Video</h1>
                                <p className="text-red-100 mt-2 text-lg">Share your creativity with the StreamLine community</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-10">
                        {uploadSuccess && (
                            <div className="mb-8 p-5 bg-green-500/10 border border-green-500/30 text-green-400 rounded-2xl flex items-center gap-4">
                                <span className="text-3xl">🎉</span>
                                <div>
                                    <p className="font-semibold text-lg">Video uploaded successfully!</p>
                                    <p className="text-sm mt-1">Your video is now live on StreamLine</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            
                            {/* Title */}
                            <Input 
                                label="Video Title"
                                placeholder="Give your video a catchy title..."
                                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-red-500"
                                labelClassName="text-gray-300"
                                {...register("title", { 
                                    required: "Title is required",
                                    minLength: { value: 5, message: "Title must be at least 5 characters" }
                                })}
                                error={errors.title?.message}
                            />

                            {/* Video File */}
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Video File <span className="text-red-500">*</span>
                                </label>
                                <Input 
                                    type="file"
                                    accept="video/*"
                                    className="bg-white/5 border-white/20 text-white file:bg-red-600 file:text-white file:border-0 file:rounded-2xl file:px-6 file:py-3 file:font-medium cursor-pointer"
                                    {...register("video", { 
                                        required: "Please select a video file" 
                                    })}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setSelectedVideoName(file.name);
                                        }
                                    }}
                                    error={errors.video?.message}
                                />
                                {selectedVideoName && (
                                    <p className="text-xs text-gray-400 mt-2 truncate">
                                        Selected: {selectedVideoName}
                                    </p>
                                )}
                            </div>

                            {/* Video Duration Display */}
                            {videoDuration > 0 && (
                                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
                                    <span className="text-2xl">⏱️</span>
                                    <div>
                                        <p className="text-sm text-gray-400">Video Duration</p>
                                        <p className="text-xl font-semibold text-white">
                                            {formatDuration(videoDuration)}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Thumbnail */}
                            <Input 
                                label="Thumbnail Image"
                                type="file"
                                accept="image/*"
                                className="bg-white/5 border-white/20 text-white file:bg-red-600 file:text-white file:border-0 file:rounded-2xl file:px-6 file:py-3 file:font-medium"
                                labelClassName="text-gray-300"
                                {...register("thumbnail", { 
                                    required: "Thumbnail image is required" 
                                })}
                                error={errors.thumbnail?.message}
                            />

                            {/* Upload Progress */}
                            {loading && progress > 0 && (
                                <div className="space-y-3 bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Uploading your video...</span>
                                        <span className="font-medium text-red-400">{progress}%</span>
                                    </div>
                                    <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-300 rounded-full"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button 
                                type="submit" 
                                disabled={loading}
                                loading={loading}
                                className="w-full py-4 text-lg font-semibold bg-red-600 hover:bg-red-700 active:bg-red-800 transition-all rounded-2xl shadow-lg shadow-red-600/40 mt-4"
                            >
                                {loading ? `Uploading... ${progress}%` : "Upload Video to StreamLine"}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Helpful Tip */}
                <div className="text-center mt-8 text-gray-500 text-sm flex items-center justify-center gap-2">
                    <span>💡</span>
                    Pro Tip: Use a bright, clear thumbnail and an engaging title to attract more viewers
                </div>
            </div>
        </div>
    );
}

export default UploadVideo;