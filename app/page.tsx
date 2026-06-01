import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProductScroll from "@/components/ProductScroll";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <ProductScroll />
      <TrustBar />
      <Services />
      <Process />
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
  );
}
