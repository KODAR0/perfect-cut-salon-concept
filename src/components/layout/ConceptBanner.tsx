export function ConceptBanner() {
  return (
    <aside
      className="fixed inset-x-0 top-0 z-[60] flex min-h-9 items-center justify-center bg-bronze px-4 py-2 text-center text-[0.68rem] font-extrabold uppercase text-ink"
      aria-label="Portfolio concept notice"
    >
      <span>
        Unofficial concept preview
        <span className="mx-2 text-ink/45" aria-hidden="true">
          /
        </span>
        Created by Danil Interactive
      </span>
    </aside>
  );
}