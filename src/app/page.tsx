import NavBar from "./components/layout/NavBar";
import HomeHero from "./components/home/Hero";
import HomeWhatIsRise from "./components/home/WhatIsRise";
import HomeValues from "./components/home/Values";
import HomeConnectCTA from "./components/home/ConnectCTA";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <main className="bg-wildsand bg-[url('/fabric_plaid.png')] bg-repeat text-jaguar">
      <NavBar />
      <HomeHero />

      {/* "What is RISE?" and the Values panel share one navy shape, so they're wrapped together */}
      <div className="relative overflow-hidden">
        {/* Navy panel (desktop/tablet): the left side, with a rounded corner that sweeps down
            behind the Values panel. On phones the "What is RISE?" section draws its own navy. */}
        <div
          aria-hidden
          className="absolute left-0 top-0 hidden h-[calc(100%-3rem)] w-[56%] rounded-br-[100%_55%] bg-biscay md:block"
        />
        <HomeWhatIsRise />
        <HomeValues />
      </div>

      <HomeConnectCTA />
      <Footer />
    </main>
  );
}
