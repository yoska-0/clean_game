import Header from "./_componts/Header";
import AboutUs from "./_componts/AboutUs";
import OurFeatures from "./_componts/OurFeatures";
import VidiosSliderRefrance from "./_componts/VidiosSliderRefrance";
import Donation from "./_componts/Donation";
export default function Home() {
  return (
    <>
      <Header></Header>
      <div className="mt-55">
        <OurFeatures />
      </div>
      <div className="mt-50">
        <AboutUs />
      </div>
      <div className="mt-50">
        <VidiosSliderRefrance />
      </div>
      <div className="mt-50">
        <Donation />
      </div>
    </>
  );
}
