import Footer from "../../components/footer";
import MapUbication from "../../components/map";
import Navbar from "../../components/navbar";
import FAQ from "./components/FAQ";
import Hero from "./components/Hero";
import PaintingCarousel from "./components/PaintingCarousel";
import Services from "./components/Services";

export default function WorkShop() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <Hero />

      <Services />

      <PaintingCarousel />

      <FAQ />

      <MapUbication changeBackground />

      <Footer />
    </div>
  );
}
