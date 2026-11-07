import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { reviews } from "@/lib/data";

function Stars() {
  return <span className="review-stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <svg key={index} viewBox="0 0 16 16" aria-hidden="true"><path d="m8 1.2 2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 12l-4.2 2.2.8-4.7L1.2 6.2l4.7-.7L8 1.2Z" /></svg>)}</span>;
}

export function Reviews({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.reviews;
  return (
    <section className="section reviews-section" id="reviews">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div><p className="eyebrow"><span className="eyebrow-line" />{t.eyebrow}</p><h2>{t.title}<br /><em>{t.accent}</em></h2></div>
          <p className="section-intro">{t.description}</p>
        </div>
        <div className="reviews-overview"><div className="rating-score"><strong>4.9</strong><span>/ 5</span></div><div><Stars /><small>{t.rating} · 4 demo examples</small></div><div className="review-overview-rule" /><span className="mono">RIGA / CLIENT NOTES</span></div>
        <div className="reviews-grid">
          {reviews.map((review, index) => <article className="review-card" key={review.name}>
            <div className="review-card-top"><span className="review-number mono">0{index + 1} / 04</span><span className="review-demo">{t.demoTag}</span></div>
            <Stars />
            <blockquote>“{review.text[lang]}”</blockquote>
            <div className="review-card-bottom"><div className="review-avatar">{review.name.charAt(0)}</div><div><strong>{review.name}</strong><span>{review.car} · {review.area}</span></div><span className="review-mark">↗</span></div>
          </article>)}
        </div>
      </div>
    </section>
  );
}
