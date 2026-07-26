import NavBar from "../components/layout/NavBar.tsx";
import AboutHero from "../components/about/Hero.tsx";
import Footer from "../components/layout/Footer.tsx";

export default function About() {
   return (
    <main className="bg-wildsand text-jaguar">
      <NavBar />
      <AboutHero/>
      <Footer />
    </main>
  );
}
