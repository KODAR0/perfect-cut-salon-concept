export default function Loading() {
  return (
    <main
      className="grid min-h-svh place-items-center bg-ink text-cream"
      aria-label="Loading page"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-5">
        <span className="grid size-14 place-items-center border border-bronze font-display text-xl">
          PC
        </span>
        <span className="text-sm text-cream/55">Loading Perfect Cut</span>
      </div>
    </main>
  );
}
