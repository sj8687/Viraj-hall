import { Suspense } from "react";
import CheckAvailability from "../components/Check";

export default async function BookingPage() {
 
 

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <CheckAvailability />
      </Suspense>
    </>
  );
}
