'use client';

import { useEffect, useState } from 'react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from './Spinner';
import { useSession } from 'next-auth/react';

interface RazorpayPaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  plan: string;
  id: string; // booking ID
  customer: string;
  email: string;
  contact: string;
}

interface RazorpayOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  plan: string;
  id: string; // booking ID
  customer: string;
  email: string;
  contact: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    bookingId: string;
  };
  theme: {
    color: string;
  };
}

// interface payment {
//   email: string | null;
// }

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}


export default function PaymentPage() {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const router = useRouter();
   const { data: authData, status } = useSession();
  
    useEffect(() => {
      if (status === "loading") return;
  
      if (!authData || !authData.user?.isAdmin) {
        router.replace("/");
      }
    }, [authData, status, router]);



  // ✅ Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // ✅ Fetch Razorpay Order & open Razorpay UI
  useEffect(() => {
    if (!bookingId) {
      toast.error('No booking ID provided');
      return;
    }

    const fetchOrder = async () => {
      try {
        const { data } = await axios.post<RazorpayOrderResponse>(
          `${process.env.NEXT_PUBLIC_Backend_URL}/payment/create`,
          { bookingId  } ,
          
          {withCredentials:true

          }
        );

        const options: RazorpayOptions & { modal?: any } = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
          amount: data.amount,
          currency: data.currency,
          name: 'Viraj Multipurpose Hall',
          description: `Booking Payment (${data.plan})`,
          order_id: data.orderId,
          handler: async function (response: RazorpayPaymentResponse) {
            try {
              await axios.post(`${process.env.NEXT_PUBLIC_Backend_URL}/payment/verify`, {
                order_id: response.razorpay_order_id,
                payment_Id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                bookingId: bookingId,
              },  {withCredentials:true
            
          });

              toast.success('🎉 Payment verified successfully!');
              // window.location.href = `/success?bookingId=${bookingId}`;
              router.push("/")
            } catch (error: any) {
              console.error(error);
              toast.error('❌ Payment verification failed!');
              router.push("./")
            }
          },
          prefill: {
            name: data.customer,
            email: data.email,
            contact: data.contact,
          },
          notes: {
            bookingId: data.id,
          },
          theme: {
            color: '#ec6e24',
          },
          modal: {
            ondismiss: function () {
              toast.info("❌ Payment was cancelled by user");
              setLoading(false)
              router.push("/"); // or redirect to a 'payment failed' page
            },
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
        setLoading(false); 
      } catch (err: any) {
        toast.error(err?.response?.data?.error || 'Payment initiation failed');
         setLoading(false);
        router.push("/")

      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [bookingId]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {loading ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <Spinner />
          <span className="text-gray-600 text-sm">Loading payment gateway...</span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4">
          <Spinner />

          <span className="text-gray-600 text-sm">Redirecting to Dashboard...</span>
        </div>
      )}
    </div>

  );
}
