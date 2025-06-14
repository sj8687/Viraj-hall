import { Hero } from "./Hero";
import Intro from "./Intro";
import PricingSection from "./Price";
import { Services } from "./Services";
import Testimonials from "./Testo";

export function Structure() {
    return (
        <>
        <Hero />
        <Intro />
        <Services />
        <PricingSection />
        <Testimonials />
        </> 
    )
}