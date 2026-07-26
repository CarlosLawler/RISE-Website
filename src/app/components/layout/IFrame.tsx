export default function IFrame({
  link = "https://genrandom.com/cats/",
  desc = "cat photo generator",
}) {
  return (
    <main className="bg-wildsand text-jaguar">
      <iframe src={link} title={desc} className="relative h-[99vh] min-h-[560px] w-full"></iframe>
    </main>
  );
}
