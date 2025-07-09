import Footer from "./components/Footer";
import Features from "./components/Home/Features";
import Hero from "./components/Home/Hero";
import Testimonials from "./components/Home/Testimonials";
import UseCase from "./components/Home/UseCase";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="lg:mx-[8rem] my-[2rem] max-w-6xl mx-2 ">
      <Navbar/>
      <div className="lg:mx-[5rem] my-7 mx-4">
      <Hero/>
      <Features/>
      <UseCase/>
      <Testimonials/>
      </div>
      <Footer/>  
    </div>
  );
}
