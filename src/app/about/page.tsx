import NavBar from "../components/layout/NavBar.tsx";
import AboutHero from "../components/about/Hero.tsx";
import Footer from "../components/layout/Footer.tsx";
import DisciplesOfJesus from "../components/about/DisciplesOfJesus.tsx";
import AboutHouses from "../components/about/AboutHouses.tsx";
import AboutFAQ from "../components/about/AboutFAQ.tsx";


export default function About() {
   return (
    <main className="bg-wildsand text-jaguar">
      <NavBar />
      <AboutHero/>
      <DisciplesOfJesus />
      <AboutHouses />
      <AboutFAQ />
      <Footer />
    </main>
  );
}
