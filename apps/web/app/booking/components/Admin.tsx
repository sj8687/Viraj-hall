"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Spinner } from "./Spinner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Booking {
  id: string;
  date: string;
  functionType: string;
  guests: number;
  plan: "BASIC" | "PREMIUM";
  status: "CONFIRMED" | "PENDING";
  timeSlot: string;
  customer: string;
  contact: string;
  paymentId: string;
  additionalInfo?: string;
  user?: {
    email: string;
  };
}

interface Session {
  user?: {
    id?: string;
    email?: string | null;
    name?: string | null;
    isAdmin?: boolean;
  };
}

export default function AdminDashboard() {
  const [bookingsByMonth, setBookingsByMonth] = useState<Record<string, Booking[]>>({});
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const router = useRouter();
 const { data: authData, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    
    if (!authData || !authData.user?.isAdmin) {
      router.replace("/");
    }
  }, [authData, status, router]);

  const fetchBookings = () => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_Backend_URL}/adminbooking/admin/bookings`, {
        withCredentials: true,
      })
      .then((res) => setBookingsByMonth(res.data))
      .catch(() => toast.error("Failed to fetch bookings"))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_Backend_URL}/adminbooking/admin/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success("Booking deleted");
      fetchBookings();
    } catch (error) {
      toast.error("Error deleting booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col mt-[55px] mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Ad<span className="text-orange-500">min Dash</span>board
      </h1>

      {Object.keys(bookingsByMonth).length === 0 ? (
        <div className="flex-grow flex items-center justify-center text-gray-500 text-lg">
          No bookings found.
        </div>
      ) : (
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full border text-sm table-auto">
            <thead className="bg-orange-100 sticky top-0 z-10">
              <tr>
                <th className="border px-3 py-2 max-w-[160px] truncate">User Email</th>
                <th className="border px-3 py-2 max-w-[130px] truncate">Name</th>
                <th className="border px-3 py-2 max-w-[110px] truncate">Phone</th>
                <th className="border px-3 py-2 max-w-[120px] truncate">Function</th>
                <th className="border px-3 py-2 max-w-[100px] truncate">Date</th>
                <th className="border px-3 py-2 max-w-[100px] truncate">Time Slot</th>
                <th className="border px-3 py-2 max-w-[80px] truncate">Guests</th>
                <th className="border px-3 py-2 max-w-[90px] truncate">Plan</th>
                <th className="border px-3 py-2 max-w-[150px] truncate">Payment ID</th>
                <th className="border px-3 py-2 max-w-[90px] truncate">Status</th>
                <th className="border px-3 py-2 w-[140px] min-w-[140px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(bookingsByMonth).map(([month, bookings]) => (
                <React.Fragment key={month}>
                  <tr className="bg-orange-200 text-black font-semibold text-center">
                    <td colSpan={11} className="py-3 text-lg">
                      {month}
                    </td>
                  </tr>

                  {bookings.map((booking) => (
                    <React.Fragment key={booking.id}>
                      <tr className="text-center align-top hover:bg-orange-50 transition">
                        <td className="border px-3 py-2 max-w-[160px] truncate" title={booking.user?.email || "N/A"}>
                          {booking.user?.email || "N/A"}
                        </td>
                        <td className="border px-3 py-2 max-w-[130px] truncate" title={booking.customer}>
                          {booking.customer}
                        </td>
                        <td className="border px-3 py-2 max-w-[110px] truncate" title={booking.contact}>
                          {booking.contact}
                        </td>
                        <td className="border px-3 py-2 max-w-[120px] truncate" title={booking.functionType}>
                          {booking.functionType}
                        </td>
                        <td className="border px-3 py-2 max-w-[100px] truncate">
                          {new Date(booking.date).toLocaleDateString("en-IN")}
                        </td>
                        <td className="border px-3 py-2 max-w-[100px] truncate">{booking.timeSlot}</td>
                        <td className="border px-3 py-2 max-w-[80px] truncate">{booking.guests}</td>
                        <td className="border px-3 py-2 max-w-[90px] truncate">{booking.plan}</td>
                        <td className="border px-3 py-2 max-w-[150px] truncate" title={booking.paymentId}>
                          {booking.paymentId}
                        </td>
                        <td
                          className={`border px-3 py-2 max-w-[90px] truncate ${
                            booking.status === "CONFIRMED" ? "text-green-600" : "text-red-600"
                          }`}
                          title={booking.status}
                        >
                          {booking.status}
                        </td>
                        <td className="border px-1 py-2 w-[140px] min-w-[140px]">
                          <div className="flex justify-center items-center gap-1 flex-wrap">
                            <button
                              onClick={() => handleDelete(booking.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                              title="Delete Booking"
                            >
                              Delete
                            </button>
                            {booking.additionalInfo && (
                              <button
                                onClick={() => toggleRow(booking.id)}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                                title={expandedRows.has(booking.id) ? "Hide Customer Note" : "Show Customer Note"}
                              >
                                {expandedRows.has(booking.id) ? "Hide Note" : "Show Note"}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>

                      {booking.additionalInfo && expandedRows.has(booking.id) && (
                        <tr className="bg-orange-50">
                          <td
                            colSpan={11}
                            className="px-6 py-4 text-left text-gray-800 whitespace-pre-wrap max-h-40 overflow-auto"
                            style={{ wordBreak: "break-word" }}
                          >
                            <span className="font-semibold text-orange-600">Customer Note: </span>
                            <br />
                            {booking.additionalInfo}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
