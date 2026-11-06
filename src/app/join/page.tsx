import NavBar from "../components/layout/NavBar";
import HowItWorks from "../components/join/HowItWorks";
import ConnectForm from "../components/join/ConnectForm";
import Footer from "../components/layout/Footer";
import JoinUsHero from "../components/join/JoinUsHero";
import WhatToExpect from "../components/join/WhatToExpect";
import Churches from "../components/join/Churches";

export default function Join() {
   return (
    <main className="bg-wildsand bg-[url('/fabric_plaid.png')] bg-repeat text-jaguar">
      <NavBar />
      <JoinUsHero/>
      <WhatToExpect/>
      <Churches/>
      <HowItWorks />
      <ConnectForm />
      <Footer />
    </main>
  );
}
