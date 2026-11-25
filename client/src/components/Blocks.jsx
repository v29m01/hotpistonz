// Reusable page sections.
import { useState } from 'react';
import Icon from './Icon';
import Photo from './Photo';
import { Link, prefill } from '../router';
import { setMarque, useMarque } from '../theme';
import { areas, home, marques, testimonials } from '../data/content';
import { slugify } from '../data/specialist';
import { services, serviceCategories } from '../data/services';

export function SectionHead({ kicker, title, sub, center = false, light = false }) {
  return (
    <div className={`head ${center ? 'head--center' : ''} ${light ? 'head--light' : ''} reveal`}>
      {kicker && (
        <p className={`kicker ${center ? 'kicker--center' : ''}`}>
          <span className="kicker__bar" /> {kicker} {center && <span className="kicker__bar" />}
        </p>
      )}
      <h2>{title}</h2>
      {sub && <p className="head__sub">{sub}</p>}
    </div>
  );
}

export function MarqueStrip({ onPick }) {
  const current = useMarque();
  return (
    <section className="marques" aria-label="Choose your marque">
      <div className="container marques__inner">
        <div className="marques__label">
          <span className="kicker kicker--sm"><span className="kicker__bar" /> Your marque</span>
          <strong key={current.id}>{current.id === 'all' ? 'All marques' : current.name}</strong>
          <small>{current.models}</small>
        </div>
        <div className="marques__list" role="radiogroup" aria-label="Car marque">
          {marques.map((m) => (
            <button
              key={m.id}
              role="radio"
              aria-checked={m.id === current.id}
              className={`marque ${m.id === current.id ? 'marque--active' : ''}`}
              style={{ '--m': m.accent }}
              onClick={() => { setMarque(m.id); onPick?.(m); }}
            >
              <span className="marque__dot" />
              {m.id === 'all' ? 'All' : m.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceTiles({ withTabs = true, limit }) {
  const [cat, setCat] = useState('All');
  let shown = cat === 'All' ? services : services.filter((s) => s.category === cat);
  if (limit) shown = shown.slice(0, limit);
  return (
    <>
      {withTabs && (
        <div className="tabs tabs--center reveal" role="tablist" aria-label="Service categories">
          {serviceCategories.map((c) => (
            <button key={c} role="tab" aria-selected={c === cat} className={`tab ${c === cat ? 'tab--active' : ''}`} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
      )}
      <div className="tiles">
        {shown.map((s, i) => (
          <Link key={s.slug} to={'/' + s.slug} className="tile" style={{ animationDelay: `${i * 35}ms` }}>
            <span className="tile__icon"><Icon name={s.icon} size={34} stroke={1.4} /></span>
            <span className="tile__title">{s.title}</span>
            <span className="tile__text">{s.short}<em>Explore <Icon name="arrow" size={14} /></em></span>
            <span className="tile__go"><Icon name="arrow" size={16} /></span>
          </Link>
        ))}
      </div>
    </>
  );
}

export function ServiceCards({ items }) {
  return (
    <div className="scards">
      {items.map((s, i) => (
        <Link key={s.slug} to={'/' + s.slug} className="scard reveal" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
          <Photo name={s.image} alt={s.title} className="scard__photo" />
          <div className="scard__body">
            <span className="scard__cat"><Icon name={s.icon} size={16} /> {s.category}</span>
            <h3>{s.title}</h3>
            <p>{s.short}</p>
            <span className="scard__link">View service <Icon name="arrow" size={16} /></span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function TrustGrid() {
  return (
    <div className="trust">
      {home.why.items.map((t, i) => (
        <div key={t.title} className="trust__item reveal" style={{ transitionDelay: `${i * 80}ms` }}>
          <span className="trust__icon"><Icon name={t.icon} size={26} stroke={1.6} /></span>
          <h3>{t.title}</h3>
        </div>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="section section--light reviews">
      <div className="container">
        <SectionHead center kicker={home.testimonials.kicker} title={home.testimonials.title} />
        <div className="reviews__grid">
          {testimonials.map((t, i) => (
            <figure key={t.name} className="review reveal" style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="review__top">
                <span className="review__stars" aria-label="5 out of 5 stars">★★★★★</span>
                <Icon name="quote" size={30} className="review__quote" />
              </div>
              <blockquote>{t.text}</blockquote>
              <figcaption>
                <span className="review__avatar">{t.name[0]}</span>
                <span><strong>{t.name}</strong><small>Verified customer</small></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AreasMarquee() {
  const loop = [...areas, ...areas];
  return (
    <section className="areas" aria-label="Areas covered">
      <Link to="/areas-we-cover" className="areas__label"><Icon name="truck" size={18} /> Free collection &amp; delivery</Link>
      <div className="marquee"><div className="marquee__track">
        {loop.map((a, i) => <Link key={i} to={`/areas-we-cover/${slugify(a)}`} className="marquee__item">{a}</Link>)}
      </div></div>
    </section>
  );
}

export function Faq({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {items.map(([q, a], i) => (
        <div key={q} className={`faq__item ${open === i ? 'is-open' : ''}`}>
          <button className="faq__q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{q}</span><span className="faq__plus" aria-hidden="true" />
          </button>
          <div className="faq__a"><p>{a}</p></div>
        </div>
      ))}
    </div>
  );
}
