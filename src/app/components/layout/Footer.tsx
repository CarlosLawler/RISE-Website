export default function Footer() {
  return (
    <footer className="bg-biscay">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-4 md:py-6">
        {/* endLogoWhite.png has lots of transparent space above and below the artwork.
            The aspect ratio here is the image's full width by just the artwork's height (1323 of 2250px),
            and object-cover crops the empty top and bottom so the height is all logo. */}
        <img
          src="/endLogoWhite.png"
          alt="RISE Discipleship Network"
          className="aspect-[3292/1323] h-20 w-auto object-cover sm:h-24 lg:h-28"
        />

        <div className="mt-4 text-center text-sm text-white opacity-90">
          © {new Date().getFullYear()} RISE Discipleship Network
        </div>
      </div>
    </footer>
  );
}
