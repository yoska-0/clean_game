import Header from "./_componts/Header";
import AboutUs from "./_componts/AboutUs";
import MassegMe from "./_componts/MassegMe";
import OurFeatures from "./_componts/OurFeatures";
import VidiosSliderRefrance from "./_componts/VidiosSliderRefrance";
import Donation from "./_componts/Donation";
import Footer from "./_componts/Footer";
import Test from "./_componts/Test";
export default function Home() {
  return (
    <>
      <Header></Header>
      <div className="mt-55">
        <OurFeatures />
      </div>
      {/* <Test /> */}
      <div className="mt-50">
        <AboutUs />
      </div>
      <div className="mt-50">
        <VidiosSliderRefrance />
      </div>
      <div className="mt-50">
        <MassegMe />
      </div>
      <div className="mt-50">
        <Donation />
      </div>
      <div>{/* <Footer /> */}</div>
    </>
  );
}
// bg-[#0070ff33]
