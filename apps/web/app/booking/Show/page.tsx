import { Suspense } from "react";
import MyBookings from "../components/Show";

export default async function BookingPage() {
 

  return (
    <>
     <Suspense>
      <MyBookings   />
      </Suspense>
    </>
  );
}
