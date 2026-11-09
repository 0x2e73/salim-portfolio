import { TESTIMONIAL } from "@/data/content";
import { Reveal } from "./reveal";

/** Hidden until a real quote is set in `TESTIMONIAL`. */
export function Testimonial() {
  if (!TESTIMONIAL) return null;
  return (
    <section aria-label="Témoignage" className="mx-auto max-w-[1600px] px-4 pb-24 sm:px-8 md:pb-40">
      <Reveal>
        <figure className="border-t border-line pt-10 md:grid md:grid-cols-12 md:gap-10">
          <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.14em] text-fog md:col-span-5">Ce qu&apos;en dit le client</div>
          <div className="md:col-span-7">
            <blockquote className="max-w-[32ch] text-pretty font-serif text-[clamp(1.8rem,3.6vw,3.4rem)] italic leading-[1.1] text-paper">
              « {TESTIMONIAL.quote} »
            </blockquote>
            <figcaption className="mt-6 font-mono text-[12px] uppercase tracking-[0.1em] text-accent">
              {TESTIMONIAL.author}
              <span className="ml-2 text-fog normal-case tracking-normal">{TESTIMONIAL.context}</span>
            </figcaption>
          </div>
        </figure>
      </Reveal>
    </section>
  );
}
