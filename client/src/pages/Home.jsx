import { useEffect, useState } from 'react';
import { imageUrl, useImages } from '../imageStore';
import Icon from '../components/Icon';
import Photo from '../components/Photo';
import { Link } from '../router';
import { useMarque } from '../theme';
import { business, home, img, marques } from '../data/content';
import { services } from '../data/services';
import { AreasMarquee, MarqueStrip, SectionHead, ServiceCards, Testimonials, TrustGrid } from '../components/Blocks';

const heroImage = (id) => (id === 'all' ? 'hero' : `hero-${id}`);

// Stacked hero images: the selected marque's car fades in over the previous one.
function HeroSlides({ marque }) {
  useImages();
  const video = imageUrl('hero-video');
  const [seen, setSeen] = useState(['all']);
  useEffect(() => {
    setSeen((s) => (s.includes(marque.id) ? s : [...s, marque.id]));
  }, [marque.id]);
  // Preload every marque image after first paint so switching is instant.
  useEffect(() => {
    const t = setTimeout(() => marques.forEach((m) => { const i = new Image(); i.src = img(heroImage(m.id)); }), 1200);
    return () => clearTimeout(t);
  }, []);
  // An uploaded banner video plays for "All marques"; picking a brand shows that brand's image.
  if (video && marque.id === 'all') {
    return (
      <div className="hero__slides" aria-hidden="true">
        <video className="hero__video" src={video} autoPlay muted loop playsInline poster={imageUrl('hero')} />
      </div>
    );
  }
  return (
    <div className="hero__slides" aria-hidden="true">
      {seen.map((id) => (
        <Photo key={id} name={heroImage(id)} eager
          className={`hero__photo ${id === 'all' ? '' : 'hero__photo--blur'} ${id === marque.id ? 'is-active' : ''}`} />
      ))}
    </div>
  );
}

// Brand photo shown sharp in a frame on the right when a marque is selected.
function HeroShowcase({ marque }) {
  if (marque.id === 'all') return null;
  return (
    <figure className="hero__show" key={marque.id}>
      <Photo name={heroImage(marque.id)} alt={marque.name} eager className="hero__show-img" />
      <figcaption>
        <span className="hero__model-dot" />
        <span><small>{marque.origin}</small><strong>{marque.name}</strong><em>{marque.models}</em></span>
      </figcaption>
    </figure>
  );
}

const homeCards = home.services.cards.map((c) => ({ ...services.find((s) => s.slug === c.slug), title: c.title, short: c.text }));
const stats = home.stats.filter((s) => s.value);

export default function Home() {
  const marque = useMarque();
  const [before, after] = home.hero.title.split('Performance & Luxury');
  return (
    <>
      <section className="hero">
        <HeroSlides marque={marque} />
        <div className="hero__shade" aria-hidden="true" />
        <div className="container hero__inner">
          <p className="kicker"><span className="kicker__bar" /> {business.fullName} · Dubai Investment Park</p>
          <h1 className="hero__title">
            {before}<span className="hero__marque" key={marque.id}>{marque.id === 'all' ? 'Performance & Luxury' : marque.name}</span>{after}
          </h1>
          <p className="hero__lead">{home.hero.text}</p>
          <div className="hero__cta">
            <Link to="/our-services" className="btn btn--accent">{home.hero.button} <Icon name="arrow" size={18} /></Link>
            <a href={business.whatsapp} target="_blank" rel="noreferrer" className="btn btn--outline-light"><Icon name="chat" size={18} /> WhatsApp us</a>
          </div>
        </div>
        {marque.id === 'all' ? (
          <div className="hero__model">
            <span className="hero__model-dot" />
            <span><small>Every marque</small><strong>German, luxury & sports cars</strong><em>Select your marque below</em></span>
          </div>
        ) : <HeroShowcase marque={marque} />}
        <div className="hero__stats">
          <div className="container hero__stats-inner">
            {stats.map((h) => (
              <div key={h.label} className="hero__stat"><strong>{h.value}</strong><span>{h.label}</span></div>
            ))}
            <div className="hero__stat"><strong>24/7</strong><span>Available, including holidays</span></div>
            <div className="hero__stat"><strong>16</strong><span>Areas we cover</span></div>
          </div>
        </div>
      </section>

      <MarqueStrip onPick={() => { if (window.scrollY > window.innerHeight * 0.4) window.scrollTo({ top: 0, behavior: 'smooth' }); }} />

      {/* HOT PISTONZ GARAGE (about) */}
      <section className="section section--light">
        <div className="container split">
          <div className="split__media reveal">
            <Photo name="engine" alt="Engine work at Hot Pistonz Garage" className="split__photo" />
            <Photo name="cockpit" alt="Performance car dashboard" className="split__photo split__photo--small" />
            <div className="badge"><strong>24/7</strong><span>Including<br />holidays</span></div>
          </div>
          <div className="reveal">
            <p className="kicker"><span className="kicker__bar" /> About us</p>
            <h2>{home.about.title}</h2>
            <p className="lead-text">{home.about.text}</p>
            <div className="hero__cta">
              <Link to="/about-us" className="btn btn--dark">{home.about.button} <Icon name="arrow" size={18} /></Link>
              <a href={business.phoneHref} className="link-call"><Icon name="phone" size={18} /> {business.phone}</a>
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="section section--paper">
        <div className="container">
          <div className="head-row">
            <SectionHead kicker={home.services.kicker} title={home.services.title} sub={home.services.text} />
            <Link to="/our-services" className="btn btn--dark reveal">{home.services.button} <Icon name="arrow" size={18} /></Link>
          </div>
          <ServiceCards items={homeCards} />
        </div>
      </section>

      <AreasMarquee />

      {/* Why Choose Us */}
      <section className="section section--dark trust-sec">
        <div className="container">
          <SectionHead kicker={home.why.kicker} title={home.why.title} sub={home.why.text} light />
          <TrustGrid />
        </div>
      </section>

      <Testimonials />
    </>
  );
}
