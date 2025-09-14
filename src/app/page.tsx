import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import WhatIsRise from "./components/WhatIsRise";
import Values from "./components/Values";
import ConnectCTA from "./components/ConnectCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-wildsand text-jaguar">
      <NavBar />
      <Hero />
      <WhatIsRise />
      <Values />
      <ConnectCTA />
      <Footer />
    </main>
  );
}
