'use client';

import { studymaterialData } from "@/data/data";
import { useState } from 'react';
import axios from 'axios';

export default function StudyMaterialPage() {
  const { consolidators } = studymaterialData;
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/auth/study-toolkit', {
        headers: {
          'Authorization': 'Bearer your-secret-token',
        },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/zip' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'toolkit.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
        });
        if (error.response?.status === 404) {
          alert('Download failed: File not found on server.');
        } else if (error.response?.status === 403) {
          alert('Unauthorized access. Please check your credentials.');
        } else if (error.response?.status === 405) {
          alert('Method not allowed. Please contact support.');
        } else {
          alert(`Download failed: ${error.response?.data?.message || error.message}`);
        }
      } else {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred during download.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Study Material Consolidators</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {consolidators.map((consolidator, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            <h2 className="text-xl font-semibold mb-4">{consolidator.title}</h2>
            <div className="space-y-2">
              {consolidator.link && (
                <a href={consolidator.link} className="block text-blue-600 hover:underline">
                  Visit Link
                </a>
              )}
              {consolidator.site && (
                <a
                  href={consolidator.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline"
                >
                  Visit Site
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={handleDownload}
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isLoading ? 'Downloading...' : 'Download Toolkit'}
        </button>
      </div>
    </div>
  );
}