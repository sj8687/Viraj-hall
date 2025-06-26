'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { Spinner } from '../components/Spinner';
import { useRouter } from 'next/navigation';

interface Bug  {
  id: string;
  title: string;
  description: string;
  screenshot: string;
  userEmail: string;
  userName: string;
  createdAt: string;
};

export default function AdminBugReports() {
  const { data: session, status } = useSession();
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [token, setToken] = useState<string>();
  const Router = useRouter();

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get("/api/token");
        setToken(response.data.token);
      } catch (err) {
        console.error("Error fetching token:", err);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (status !== 'authenticated' || !token) return;

    const fetchBugs = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}/bug/bug-report`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (Array.isArray(res.data.bugs)) {
          setBugs(res.data.bugs);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err: any) {
        toast.error(err.response?.data?.error || 'Failed to fetch bug reports');
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.isAdmin) {
      fetchBugs();
    } else {
      toast.error('Unauthorized. Admin only.');
      Router.push("/")
    }
  }, [session, status, token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-5xl min-h-screen mt-28 mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">🐞 All Bug Reports</h1>

      {bugs.length === 0 ? (
        <div className="flex items-center justify-center min-h-[60vh] text-gray-500 text-lg">
          🐞 No bug reports found.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {bugs.map((bug) => (
            <div key={bug.id} className="bg-white shadow rounded p-4 border">
              <h2 className="text-lg font-semibold text-orange-600">{bug.title}</h2>
              <p className="text-sm text-gray-600 mb-2">
                Reported by {bug.userName} ({bug.userEmail})
              </p>
              <p className="text-gray-800 mb-2">{bug.description}</p>
              <img
                src={bug.screenshot}
                alt="screenshot"
                className="max-h-64 rounded border shadow cursor-pointer"
                onClick={() => handleImageClick(bug.screenshot)}
              />
              <p className="text-xs text-gray-500 mt-2">
                🕒 {new Date(bug.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
          {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full-size bug screenshot"
            className="max-w-[90%] max-h-[90%] rounded shadow-lg"
          />
        </div>
      )}
        </div>
      )}

      
    </div>
  );
}