import Footer from "../app/components/layout/Footer";
import Features from "./components/index/Features";
import Hero from "./components/index/Hero";
import Testimonials from "./components/index/Testimonials";
import UseCase from "./components/index/UseCase";
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
