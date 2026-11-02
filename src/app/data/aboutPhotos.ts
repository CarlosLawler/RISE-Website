// Photos shown in the rolling rows on the About page hero.
// To add your own: drop the image into /public (e.g. /public/about/myPhoto.jpg),
// then add an entry below with its path and a short description for alt text.

export type Photo = { src: string; alt: string };

export const topRow: Photo[] = [
  { src: "/riseConnect1.JPG", alt: "RISE community gathering" },
  { src: "/riseConnect2.JPG", alt: "RISE community gathering" },
  { src: "/riseConnect3.JPG", alt: "RISE community gathering" },
];

export const bottomRow: Photo[] = [
  { src: "/riseConnect4.JPG", alt: "RISE community gathering" },
  { src: "/riseConnect5.JPG", alt: "RISE community gathering" },
  { src: "/riseConnect6.JPG", alt: "RISE community gathering" },
];
