import NavBar from "../components/layout/NavBar";
import AboutHero from "../components/about/Hero";
import Footer from "../components/layout/Footer";
import DisciplesOfJesus from "../components/about/DisciplesOfJesus";
import StatementsOfFaith from "../components/about/StatementsOfFaith";
import AboutFAQ from "../components/about/AboutFAQ";


export default function About() {
   return (
    <main className="bg-wildsand bg-[url('/fabric_plaid.png')] bg-repeat text-jaguar">
      <NavBar />
      <AboutHero/>
      <DisciplesOfJesus />
      <StatementsOfFaith />
      <AboutFAQ />
      <Footer />
    </main>
  );
}
