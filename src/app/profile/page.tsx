'use client'

import React from 'react'
import { useUser } from '@auth0/nextjs-auth0/client';
import Layout from '../components/Layout';

const ProfilePage = () => {
    const { user, error, isLoading } = useUser();



    return (
        <Layout>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Profile</h1>

                {isLoading && (
                    <p className="text-center text-gray-600">Loading profile...</p>
                )}

                {error && (
                    <p className="text-center text-red-500">{error.message}</p>
                )}

                    <div className="text-center">
                        <img
                            src={user?.picture || '/default-profile.png'}  // Fallback image if user.picture is null or undefined
                            alt={user?.name || 'User profile'}  // Fallback alt text if user.name is null or undefined
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                        <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
                        <p className="text-gray-600 mb-4">{user?.email}</p>

                        <div className="text-left mb-6">
                            <p><strong>Given Name:</strong> {user?.name || 'N/A'}</p>
                            <p><strong>Nickname:</strong> {user?.nickname || 'N/A'}</p>
                            <p><strong>Full Name:</strong> {user?.name || 'N/A'}</p>
                            <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
                            <p><strong>Email Verified:</strong> {user?.email_verified ? "Yes" : "No"}</p>
                        </div>

                        {/* <button
                        //  /api/auth/logout
                            onClick={() => fetch('/api/auth/logout', { method: 'POST' })}   
                          
                            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
                        >
                            Sign Out
                        </button> */}

                        <a href='/api/auth/logout' className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600">Sign Out</a>
                    </div>
            
            </div>
        </div>
        </Layout>
    )
}

export default ProfilePage;
