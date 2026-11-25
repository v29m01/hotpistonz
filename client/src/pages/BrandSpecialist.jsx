import Icon from '../components/Icon';
import Photo from '../components/Photo';
import PageHeader from '../components/PageHeader';
import { Link, prefill } from '../router';
import { isCustom, useImages } from '../imageStore';
import { business, home, wa } from '../data/content';
import { services } from '../data/services';
import { brandFaqs, specialistBrands } from '../data/specialist';
import { Faq, SectionHead, ServiceCards, TrustGrid } from '../components/Blocks';

// Uploaded photo ("brand-<slug>" slot) wins over the built-in one.
export const brandPhoto = (b) => (isCustom(`brand-${b.slug}`) ? `brand-${b.slug}` : b.image);
const homeServices = home.services.cards.map((c) => services.find((s) => s.slug === c.slug)).filter(Boolean);

export function BrandSpecialistIndex() {
  useImages();
  const groups = [...new Set(specialistBrands.map((b) => b.group))];
  return (
    <>
      <PageHeader title="Brand Specialist" kicker="German, luxury & sports cars" sub="Specialist service and repair for every brand we cover, with pick-up and drop-off across Dubai." image="banner-silver" crumbs={[{ label: 'Brand Specialist' }]} />
      {groups.map((g, gi) => (
        <section key={g} className={`section ${gi % 2 ? 'section--paper' : 'section--light'}`}>
          <div className="container">
            <SectionHead kicker="Brand Specialist" title={g === 'More' ? 'Luxury & Sports Cars' : g} />
            <div className="brand-grid brand-grid--9">
              {specialistBrands.filter((b) => b.group === g).map((b, i) => (
                <Link key={b.slug} to={`/brand-specialist/${b.slug}`} className="brand-tile brand-tile--photo reveal" style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
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

export function BrandDetail({ brand: b }) {
  useImages();
  const book = () => { prefill.service = ''; prefill.marque = b.group === 'More' ? '' : b.name; };
  const others = specialistBrands.filter((x) => x.slug !== b.slug);
  return (
    <>
      <PageHeader title={`${b.name} Service & Repair`} kicker="Brand Specialist" sub={`${b.name} specialists in Dubai Investment Park — ${business.hours.toLowerCase()}.`} image="banner-black"
        crumbs={[{ label: 'Brand Specialist', to: '/brand-specialist' }, { label: b.name }]} />

      <section className="section section--light">
        <div className="container detail">
          <div className="detail__main">
            <div className="detail__hero reveal">
              <Photo name={brandPhoto(b)} alt={b.name} className="detail__photo" eager />
              <span className="detail__icon detail__icon--text">{b.name.slice(0, 2).toUpperCase()}</span>
            </div>
            <div className="reveal">
              <p className="kicker"><span className="kicker__bar" /> {b.origin}</p>
              <h2 className="detail__h2">{b.name} Specialist in Dubai</h2>
              <p className="lead-text">{b.intro}</p>
              <p className="lead-text">At Hot Pistonz Garage, we specialise in all car repairs, including luxury cars. With experienced technicians, the latest tools and technology, and pick-up and drop-off across Dubai, your {b.group === 'More' ? 'car' : b.name} is in good hands.</p>
            </div>

            <div className="detail__group reveal">
              <h3>{b.group === 'More' ? 'Brands we look after' : `${b.name} models we service`}</h3>
              <ul className="brand-tags brand-tags--tight">{b.models.map((m) => <li key={m}>{m}</li>)}</ul>
            </div>

            <div className="detail__group reveal">
              <h3>Our {b.name} expertise</h3>
              <div className="bcards">
                {b.focus.map(([t, d], i) => (
                  <div key={t} className="bcard"><span className="bcard__num">{String(i + 1).padStart(2, '0')}</span><h4>{t}</h4><p>{d}</p></div>
                ))}
              </div>
            </div>

            <div className="detail__group reveal">
              <h3>Services for your {b.group === 'More' ? 'car' : b.name}</h3>
              <div className="features">
                {services.map((s) => (
                  <Link key={s.slug} to={'/' + s.slug} className="feature feature--link">
                    <span className="feature__mark"><Icon name={s.icon} size={14} /></span>
                    <div><h4>{s.title}</h4><p>{s.short}</p></div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="detail__group reveal">
              <h3>Frequently Asked Questions</h3>
              <Faq items={brandFaqs(b.group === 'More' ? b.name.toLowerCase() : b.name)} />
            </div>
          </div>

          <aside className="detail__side">
            <div className="side-card side-card--dark">
              <h3>Book {b.name} service</h3>
              <p>Pick up &amp; drop off service across Dubai. Detailed quote before any work begins.</p>
              <Link to="/book-service" className="btn btn--accent btn--block" onClick={book}>Enquiry Now <Icon name="arrow" size={18} /></Link>
              <a href={business.phoneHref} className="btn btn--outline-light btn--block"><Icon name="phone" size={18} /> {business.phone}</a>
              <a href={wa(`Hello Hot Pistonz, I need service for my ${b.name}.`)} target="_blank" rel="noreferrer" className="side-card__wa"><Icon name="chat" size={16} /> WhatsApp us</a>
            </div>
            <div className="side-card">
              <h4>Brand Specialist</h4>
              <ul className="side-nav">
                {specialistBrands.map((x) => (
                  <li key={x.slug}><Link to={`/brand-specialist/${x.slug}`} className={x.slug === b.slug ? 'is-active' : ''}><Icon name="chevron-r" size={16} /> {x.name}</Link></li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <SectionHead kicker="Why Choose Us" title={home.why.title} sub={home.why.text} />
          <TrustGrid />
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <SectionHead kicker="Popular services" title={`What we do for ${b.group === 'More' ? b.name.toLowerCase() : b.name}`} />
          <ServiceCards items={homeServices.slice(0, 3)} />
          <ul className="brand-tags reveal" style={{ marginTop: 40 }}>
            {others.map((x) => <li key={x.slug}><Link to={`/brand-specialist/${x.slug}`}>{x.name}</Link></li>)}
          </ul>
        </div>
      </section>
    </>
  );
}
