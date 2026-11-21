export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-3xl bg-white px-6 py-12 text-center shadow-[0_8px_25px_rgba(18,50,95,0.09)]">
      <p className="mx-auto max-w-xl text-base text-biscay sm:text-lg">{message}</p>
      <a
        href="#connect"
        className="mt-6 inline-flex rounded-lg bg-biscay px-6 py-3 font-display font-bold text-white transition-colors hover:bg-mariner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mariner focus-visible:ring-offset-2"
      >
        Connect With Us
      </a>
    </div>
  );
}
