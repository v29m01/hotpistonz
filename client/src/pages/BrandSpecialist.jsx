import { useState } from 'react';
import Icon from '../components/Icon';
import Photo from '../components/Photo';
import PageHeader from '../components/PageHeader';
import { Link } from '../router';
import { isCustom, useImages } from '../imageStore';
import { business, wa } from '../data/content';
import { createBooking } from '../api';
import { brandFaqs, brandThemes, brandTiles, brandWhy, specialistBrands } from '../data/specialist';
import { Faq, SectionHead } from '../components/Blocks';

// Uploaded photo ("brand-<slug>" slot) wins over the built-in one.
export const brandPhoto = (b) => (isCustom(`brand-${b.slug}`) ? `brand-${b.slug}` : b.image);
const isGroup = (b) => b.name === 'Luxury Cars' || b.name === 'Sports Cars';
const groupTitle = (g) => (g === 'German Cars' ? 'German Cars' : 'Luxury & Sports Cars');

export function BrandSpecialistIndex() {
  useImages();
  const groups = [...new Set(specialistBrands.map((b) => b.group))];
  return (
    <>
      <PageHeader title="Brand Specialist" kicker="German, luxury & sports cars" sub="Specialist service and repair for every brand we cover, with pick-up and drop-off across Dubai." image="spec-workshop" crumbs={[{ label: 'Brand Specialist' }]} />
      {groups.map((g, gi) => (
        <section key={g} className={`section ${gi % 2 ? 'section--paper' : 'section--light'}`}>
          <div className="container">
            <SectionHead kicker="Brand Specialist" title={groupTitle(g)} />
            <div className="brand-grid brand-grid--9">
              {specialistBrands.filter((b) => b.group === g).map((b, i) => (
                <Link key={b.slug} to={`/brand-specialist/${b.slug}`} className="brand-tile brand-tile--photo reveal" style={{ transitionDelay: `${(i % 3) * 70}ms`, '--accent': (brandThemes[b.theme] || brandThemes.default).accent }}>
                  <Photo name={brandPhoto(b)} alt={b.name} className="brand-tile__photo" />
                  <span className="brand-tile__name">{b.name}</span>
                  <span className="brand-tile__go">View specialist page <Icon name="arrow" size={14} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

const tomorrow = () => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().slice(0, 10); };

// Quick "Service Request" strip, as in the client's reference designs.
function RequestStrip({ brand, tiles }) {
  const [f, setF] = useState({ name: '', phone: '', model: '', service: tiles[0][0], preferredDate: tomorrow() });
  const [state, setState] = useState({ busy: false, done: null, error: '', fields: {} });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    setState({ busy: true, done: null, error: '', fields: {} });
    try {
      const res = await createBooking({ ...f, marque: isGroup(brand) ? 'Other' : brand.name, pickup: true, notes: `Brand page: ${brand.name}` });
      setState({ busy: false, done: res.ref || res.booking?.ref || 'received', error: '', fields: {} });
    } catch (err) {
      setState({ busy: false, done: null, error: err.message, fields: err.fields || {} });
    }
  };
  const err = (k) => state.fields[k] && <small className="bp-req__err">{state.fields[k]}</small>;
  return (
    <section className="bp-req" id="request">
      <div className="container">
        {state.done ? (
          <div className="bp-req__done">
            <Icon name="check" size={28} />
            <div><strong>Request received{state.done !== 'received' ? ` — ref ${state.done}` : ''}.</strong><span> We'll call you shortly to confirm. Need it sooner? Call {business.phone}.</span></div>
          </div>
        ) : (
          <form className="bp-req__form" onSubmit={submit} noValidate>
            <h2>Service Request</h2>
            <label><span>Name</span><input value={f.name} onChange={set('name')} placeholder="Your name" autoComplete="name" />{err('name')}</label>
            <label><span>Mobile</span><input value={f.phone} onChange={set('phone')} placeholder="+971 50 000 0000" inputMode="tel" autoComplete="tel" />{err('phone')}</label>
            <label><span>{isGroup(brand) ? 'Make & model' : 'Model'}</span><input value={f.model} onChange={set('model')} placeholder={brand.models.slice(0, 2).join(', ')} /></label>
            <label><span>Service</span><select value={f.service} onChange={set('service')}>{tiles.map(([t]) => <option key={t}>{t}</option>)}<option>Other / not sure</option></select>{err('service')}</label>
            <label><span>Preferred date</span><input type="date" value={f.preferredDate} min={new Date().toISOString().slice(0, 10)} onChange={set('preferredDate')} />{err('preferredDate')}</label>
            <button className="bp-btn bp-btn--fill" disabled={state.busy}>{state.busy ? 'Sending…' : 'Submit Request'}</button>
            {state.error && !Object.keys(state.fields).length && <p className="bp-req__fail">{state.error}</p>}
          </form>
        )}
      </div>
    </section>
  );
}

export function BrandDetail({ brand: b }) {
  useImages();
  const t = brandThemes[b.theme] || brandThemes.default;
  const tiles = brandTiles[b.tiles] || brandTiles.german;
  const label = isGroup(b) ? b.name.toLowerCase() : b.name;
  const vars = {
    '--bp-accent': t.accent, '--bp-on': t.onAccent, '--bp-title': t.title, '--bp-ground': t.ground,
    '--bp-section': t.section, '--bp-strip': t.strip, '--bp-icon': t.icon || t.accent, '--bp-line': t.line || t.accent,
    '--bp-soft': t.soft || '#f4f4f4', '--bp-nav': t.nav || 'transparent', '--accent': t.accent,
  };
  const dark = t.section !== '#fff';
  return (
    <div className={`bp bp--tiles-${t.tiles} ${dark ? 'bp--dark' : ''}`} style={vars}>
      <section className="bp-hero">
        <Photo name={brandPhoto(b)} alt={`${b.name} at Hot Pistonz Garage`} className="bp-hero__img" eager />
        <div className="container bp-hero__inner">
          <nav className="bp-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span>/</span><Link to="/brand-specialist">Brand Specialist</Link><span>/</span><em>{b.name}</em>
          </nav>
          <h1>Expert {b.name} Service &amp; Maintenance</h1>
          <p className="bp-hero__sub">Premium care for your {label} in Dubai. Trust the specialists at Hot Pistonz Garage — {business.hours.toLowerCase()}.</p>
          <div className="bp-hero__cta">
            <a href="#request" className="bp-btn bp-btn--outline" onClick={(e) => { e.preventDefault(); document.getElementById('request')?.scrollIntoView({ behavior: 'smooth' }); }}>Request Service <Icon name="arrow" size={16} /></a>
            <a href={wa(`Hello Hot Pistonz, I need service for my ${b.name}.`)} target="_blank" rel="noreferrer" className="bp-btn bp-btn--ghost"><Icon name="chat" size={16} /> WhatsApp us</a>
          </div>
        </div>
      </section>

      <section className="bp-services">
        <div className="container">
          <h2 className="bp-h2">Our {isGroup(b) ? '' : `${b.name} `}Services</h2>
          <div className="bp-tiles">
            {tiles.map(([title, icon, text, slug]) => (
              <Link key={title} to={'/' + slug} className="bp-tile reveal">
                <Icon name={icon} size={46} stroke={1.3} className="bp-tile__icon" />
                <h3>{title}</h3>
                <p>{text}</p>
              </Link>
            ))}
          </div>
          <div className="bp-why">
            <h2>Why choose Hot Pistonz Garage?</h2>
            <ul>{brandWhy.map((w) => <li key={w}><span className="bp-why__mark"><Icon name="check" size={13} stroke={2.4} /></span>{w}</li>)}</ul>
          </div>
        </div>
      </section>

      <RequestStrip brand={b} tiles={tiles} />

      <section className="section section--light">
        <div className="container bp-about">
          <div className="reveal">
            <p className="kicker"><span className="kicker__bar" /> {b.origin}</p>
            <h2 className="detail__h2">{b.name} specialist in Dubai</h2>
            <p className="lead-text">{b.intro}</p>
            <p className="lead-text">At Hot Pistonz Garage, we specialise in all car repairs, including luxury cars. With experienced technicians, the latest tools and technology, and pick-up and drop-off across Dubai, your {isGroup(b) ? 'car' : b.name} is in good hands.</p>
            <h3 className="bp-h3">{isGroup(b) ? 'Brands we look after' : `${b.name} models we service`}</h3>
            <ul className="brand-tags brand-tags--tight">{b.models.map((m) => <li key={m}>{m}</li>)}</ul>
            <div className="bp-focus">
              {b.focus.map(([title, d]) => (
                <div key={title}><h4>{title}</h4><p>{d}</p></div>
              ))}
            </div>
          </div>
          <div className="reveal">
            <h3 className="bp-h3 bp-h3--top">Frequently Asked Questions</h3>
            <Faq items={brandFaqs(label)} />
            <div className="bp-contact">
              <a href={business.phoneHref}><Icon name="phone" size={18} /> {business.phone}</a>
              <a href={wa(`Hello Hot Pistonz, I need service for my ${b.name}.`)} target="_blank" rel="noreferrer"><Icon name="chat" size={18} /> WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="container">
          <h3 className="bp-h3">Other brands we specialise in</h3>
          <ul className="brand-tags">
            {specialistBrands.filter((x) => x.slug !== b.slug).map((x) => <li key={x.slug}><Link to={`/brand-specialist/${x.slug}`}>{x.name}</Link></li>)}
          </ul>
        </div>
      </section>
    </div>
  );
}
