export default function Footer() {
  return (
    <footer className="bg-biscay">
      <div className="mx-auto max-w-6xl px-4 py-2 md:py-3 lg:py-5 flex flex-col items-center">
        <img
          src="/endLogoWhite.png"
          alt="RISE Discipleship Network"
          className="w-auto h-30 sm:h-45 md:h-65 lg:h-85 xl:h-100"
        />

        {/* Tighten the space; tweak mt-* as desired */}
        <div className="mt-0 text-white text-center text-sm opacity-90">
          © {new Date().getFullYear()} RISE Discipleship Network
        </div>
      </div>
    </footer>
  );
}
