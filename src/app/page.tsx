import NavBar from "./components/layout/NavBar.tsx";
import HomeHero from "./components/home/Hero.tsx";
import HomeWhatIsRise from "./components/home/WhatIsRise.tsx";
import HomeValues from "./components/home/Values.tsx";
import HomeConnectCTA from "./components/home/ConnectCTA.tsx";
import Footer from "./components/layout/Footer.tsx";

export default function Home() {
  return (
    <main className="bg-wildsand text-jaguar">
      <NavBar />
      <HomeHero />
      <HomeWhatIsRise />
      <HomeValues />
      <HomeConnectCTA />
      <Footer />
    </main>
  );
}
