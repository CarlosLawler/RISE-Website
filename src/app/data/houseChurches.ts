// House churches shown on the Join page (card + "Preferred Area" dropdown in the connect form).
// Add a new entry here and it appears in both places.

export type HouseChurch = {
  id: string;
  name: string;
  day: string;
  area: string;
  time: string;
  location: string;
  audience: string;
  imageSrc: string;
  imageAlt: string;
};

export const houseChurches: HouseChurch[] = [
  {
    id: "ostermeyer-home",
    name: "The Ostermeyer’s Home",
    day: "Sundays",
    area: "Bethel Rd, Columbus",
    time: "10:00 PM",
    location: "Near Bethel Rd.",
    audience: "All Ages",
    imageSrc: "/riseConnect1.JPG",
    imageAlt: "The Ostermeyer home in Columbus, Ohio",
  },

  /*
   * Add future house churches here:
   *
   * {
   *   id: "another-house-church",
   *   name: "Another House Church",
   *   day: "Wednesdays",
   *   area: "Dublin, Ohio",
   *   time: "7:00 PM",
   *   location: "Near Downtown Dublin",
   *   audience: "All Ages",
   *   imageSrc: "/images/another-house.jpg",
   *   imageAlt: "The home where the Dublin house church gathers",
   * },
   */
];
