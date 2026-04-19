// components/Profile.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from "../config/axiosInstance.js";
import { useSelector } from 'react-redux';

function Profile() {
    const [user, setUser] = useState(null);
    const [userVideos, setUserVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [subs,setSubs] = useState(0);
    // Fetch user from localStorage
    const fetchUserFromLocalStorage = () => {
        try {
            const userData = localStorage.getItem('user');
            if (userData) {
                const parsedUser = JSON.parse(userData);
                const actualUser = parsedUser.data || parsedUser;
                setUser(actualUser);
            }
        } catch (err) {
            console.error("Error parsing user from localStorage:", err);
            setUser(null);
        }
    };

    //fetch total number of subscribers
    const userData = useSelector(state => state.authorization.userData)
    const getSubsCount = async()=>{
        try {
            const ownerId = userData.data._id
            const subsCount = await axiosInstance.get(`/api/v1/subs/c/${ownerId}`)
            const val = subsCount.data.data;
            setSubs(val)
        } catch (error) {
            console.error("error occured while counting subs...",error);
        }
    }

    // Fetch user's uploaded videos
    const getUserVideos = async () => {
        try {
            const response = await axiosInstance.get('/api/v1/user/getUserVideos');
            const videos = response.data?.data?.[0]?.uploadedVideoList || 
                          response.data?.videos || [];
            setUserVideos(videos);
        } catch (err) {
            console.error("Error fetching user videos:", err);
        }
    };

    useEffect(() => {
        fetchUserFromLocalStorage();
        getUserVideos();
        getSubsCount()
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-400 text-lg">Loading your profile...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 flex items-center justify-center text-white">
                <div className="text-center">
                    <p className="text-2xl mb-4">No user data found</p>
                    <Link 
                        to="/login"
                        className="inline-block bg-red-600 hover:bg-red-700 px-8 py-3 rounded-2xl font-medium transition-all"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white pb-12">
            <div className="max-w-6xl mx-auto px-6 pt-10">
                
                {/* Profile Header Card */}
                <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-12">
                    {/* Gradient Cover */}
                    <div className="h-64 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 relative">
                        <div className="absolute -bottom-16 left-8 md:left-12">
                            <div className="relative">
                                <img 
                                    src={user.avatar} 
                                    alt={user.username}
                                    className="w-36 h-36 rounded-full object-cover border-[6px] border-gray-950 shadow-2xl"
                                />
                                <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-2 border-gray-950 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-24 pb-10 px-8 md:px-12">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                            <div>
                                <h1 className="text-5xl font-bold tracking-tight text-white">
                                    {user.fullName || user.fullname || user.username}
                                </h1>
                                <p className="text-2xl text-gray-400 mt-1">@{user.username}</p>
                                {user.email && (
                                    <p className="text-gray-500 mt-3 text-lg">{user.email}</p>
                                )}
                            </div>

                            {/* Stats */}
                            <div className="flex gap-12">
                                <div className="text-center">
                                    <p className="text-4xl font-bold text-white">
                                        {subs || "0"}
                                    </p>
                                    <p className="text-gray-400 text-sm mt-1 tracking-wide">SUBSCRIBERS</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-4xl font-bold text-white">
                                        {userVideos.length}
                                    </p>
                                    <p className="text-gray-400 text-sm mt-1 tracking-wide">VIDEOS</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* My Videos Section */}
                <div className="flex items-center justify-between mb-8 px-2">
                    <h2 className="text-4xl font-bold text-white tracking-tight">My Videos</h2>
                    
                    <Link 
                        to="/upload-video"
                        className="flex items-center gap-3 bg-red-600 hover:bg-red-700 active:bg-red-800 px-8 py-3.5 rounded-2xl font-semibold transition-all shadow-lg shadow-red-600/30"
                    >
                        <span>Upload New Video</span>
                        <span className="text-2xl leading-none">+</span>
                    </Link>
                </div>

                {/* Videos Grid */}
                {userVideos.length === 0 ? (
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl py-20 px-8 text-center">
                        <div className="text-7xl mb-6 opacity-70">🎥</div>
                        <h3 className="text-3xl font-semibold text-white mb-3">No videos yet</h3>
                        <p className="text-gray-400 max-w-md mx-auto mb-8">
                            You haven't uploaded any videos. Start sharing your content with the world!
                        </p>
                        <Link 
                            to="/upload-video"
                            className="inline-block bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-2xl font-semibold text-lg transition-all"
                        >
                            Upload Your First Video
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {userVideos.map((video) => (
                            <Link 
                                key={video._id} 
                                to={`/video/${video._id}`}
                                className="group block"
                            >
                                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1">
                                    <div className="relative aspect-video">
                                        <img 
                                            src={video.thumbnail} 
                                            alt={video.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        {video.duration && (
                                            <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-xl">
                                                {video.duration}
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5">
                                        <h3 className="font-semibold text-lg leading-tight line-clamp-2 text-white group-hover:text-red-400 transition-colors">
                                            {video.title}
                                        </h3>
                                        <p className="text-sm text-gray-400 mt-3">
                                            {video.views?.toLocaleString() || 0} views
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;