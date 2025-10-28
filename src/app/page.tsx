import Footer from "../app/components/layout/Footer";
import Features from "../app/components/home/Features";
import Hero from "../app/components/home/Hero";
import Testimonials from "../app/components/home/Testimonials";
import UseCase from "../app/components/home/UseCase";
import Navbar from "../app/components/layout/Navbar";

export default function Home() {
  return (
    <div className="">
      <Navbar/>
      <div className="mx-auto w-full">
      <Hero/>
      <Features/>
      <UseCase/>
      <Testimonials/>
      </div>
      <Footer/>  
    </div>
  );
}
