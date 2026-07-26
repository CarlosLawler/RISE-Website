import NavBar from "../components/layout/NavBar";
import IFrame from "../components/layout/IFrame.tsx";
import Footer from "../components/layout/Footer";

export default function Join() {
   return (
    <main className="bg-wildsand text-jaguar">
      <NavBar />
      <IFrame link = "https://docs.google.com/forms/d/e/1FAIpQLSdxI1RRwUXxrjCYMZbyBOI1eoLQBL_m90qR22awXHpeDsihQQ/viewform?usp=dialog" desc = "Rise Gooogle Form"/>
      <Footer />
    </main>
  );
}
