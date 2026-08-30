import NavBar from "../components/layout/NavBar.tsx";
import IFrame from "../components/layout/IFrame.tsx";
import Footer from "../components/layout/Footer.tsx";
import JoinUsHero from "../components/join/JoinUsHero.tsx"

export default function Join() {
   return (
    <main className="bg-wildsand text-jaguar">
      <NavBar />
      <JoinUsHero/>
      <IFrame link = "https://docs.google.com/forms/d/e/1FAIpQLSdxI1RRwUXxrjCYMZbyBOI1eoLQBL_m90qR22awXHpeDsihQQ/viewform?usp=dialog" desc = "Rise Gooogle Form"/>
      <Footer />
    </main>
  );
}
