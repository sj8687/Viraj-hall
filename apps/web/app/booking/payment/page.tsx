import { auth } from "@/auth";
import PaymentPage from "../components/Pay";
// import { redirect } from "next/navigation";


export default async function BookingPage() {
 
 const authData = await auth();
    //  if (!authData) {
    //  redirect('/login'); }

  return (
    <>
      <PaymentPage  />
    </>
  );
}
