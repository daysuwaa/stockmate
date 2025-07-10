import Footer from "./components/Footer";
import Features from "./components/Home/Features";
import Hero from "./components/Home/Hero";
import Testimonials from "./components/Home/Testimonials";
import UseCase from "./components/Home/UseCase";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="">
      <Navbar/>
      <div className=" mx-auto px-4 w-full">
      <Hero/>
      <Features/>
      <UseCase/>
      <Testimonials/>
      </div>
      <Footer/>  
    </div>
  );
}
