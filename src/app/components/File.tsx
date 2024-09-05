import React, { useRef, useState } from 'react';

interface AudioFileUploaderProps {}

const File: React.FC<AudioFileUploaderProps> = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const [audioDuration, setAudioDuration] = useState<string>('');
    const [audioFile, setAudioFile] = useState<File | null>(null);

    const handleFileUpload = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('audio/')) {
            setFileName(file.name);
            setAudioFile(file);

            const audio = new Audio(URL.createObjectURL(file));
            audio.onloadedmetadata = () => {
                const duration = formatDuration(audio.duration);
                setAudioDuration(duration);
            };
        } else {
            alert('Please select a valid audio file.');
        }
    };

    const formatDuration = (duration: number): string => {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const handleNextClick = () => {
        if (audioFile) {
            console.log('Proceed to script conversion with:', audioFile);
            // Add logic here to convert the audio file to script
        }
    };

    const handleCancelClick = () => {
        setFileName('');
        setAudioDuration('');
        setAudioFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset the file input field
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="audio/*"
                onChange={handleFileChange}
            />
            <button
                type="button"
                className="relative block w-full rounded-lg border-4 border-dashed border-gray-300 p-16 text-center hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-4"
                onClick={handleFileUpload}
            >
                <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                    className="mx-auto h-16 w-16 text-gray-400"
                >
                    <path
                        d="M9 19v10a8 8 0 008 8h14a8 8 0 008-8V19a8 8 0 00-8-8H17a8 8 0 00-8 8z"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M15 15v18m18-18v18m-9-3.8a3.8 3.8 0 010-7.6"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <span className="mt-4 block text-lg font-semibold text-gray-900">
                    Upload an audio file
                </span>
            </button>

            {fileName && (
                <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold">Audio File Details</h2>
                    <p><strong>File Name:</strong> {fileName}</p>
                    <p><strong>Duration:</strong> {audioDuration}</p>

                    <div className="flex justify-between mt-4 space-x-4">
                        <button
                            type="button"
                            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white text-lg font-semibold rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
                            onClick={handleNextClick}
                        >
                            Next: Convert to Script
                        </button>
                        <button
                            type="button"
                            className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white text-lg font-semibold rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
                            onClick={handleCancelClick}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default File;
