import NavBar from "./components/layout/NavBar";
import HomeHero from "./components/home/Hero";
import HomeWhatIsRise from "./components/home/WhatIsRise";
import HomeValues from "./components/home/Values";
import HomeConnectCTA from "./components/home/ConnectCTA";
import Footer from "./components/layout/Footer";

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
