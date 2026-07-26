import { ArrowLeft, Phone } from "lucide-react";
import Link from "next/link";
import { business } from "@/data/business";

export default function NotFound() {
  return (
    <main className="grid min-h-[78svh] place-items-center bg-graphite px-5 pb-20 pt-32 text-cream">
      <div className="max-w-2xl text-center">
        <p className="eyebrow text-bronze">404</p>
        <h1 className="font-display text-6xl leading-none sm:text-8xl">
          This page needs a trim.
        </h1>
        <p className="mx-auto mt-6 max-w-lg leading-7 text-cream/62">
          The page you requested is not available. Return to the salon website or
          call Perfect Cut directly.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link className="button button-bronze" href="/">
            <ArrowLeft className="size-5" aria-hidden="true" />
            Back Home
          </Link>
          <a className="button button-outline-light" href={business.phone.href}>
            <Phone className="size-5" aria-hidden="true" />
            Call the Salon
          </a>
        </div>
      </div>
    </main>
  );
}
