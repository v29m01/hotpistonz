import Icon from '../components/Icon';
import Photo from '../components/Photo';
import PageHeader from '../components/PageHeader';
import { Link, prefill } from '../router';
import { business, home, wa } from '../data/content';
import { services } from '../data/services';
import { areaFaqs, areaPages, pickupSteps } from '../data/specialist';
import { Faq, SectionHead, ServiceCards, TrustGrid } from '../components/Blocks';

const homeServices = home.services.cards.map((c) => services.find((s) => s.slug === c.slug)).filter(Boolean);

export default function AreaDetail({ area: a }) {
  const book = () => { prefill.area = a.name; };
  const idx = areaPages.indexOf(a);
  const nearby = [...areaPages.slice(idx + 1), ...areaPages.slice(0, idx)].slice(0, 6);
  return (
    <>
      <PageHeader title={`Car Service in ${a.name}`} kicker="Area We Cover" sub={`Car repair and maintenance for ${a.name}, with pick-up and drop-off — ${business.hours.toLowerCase()}.`} image="banner-blue"
        crumbs={[{ label: 'Area We Cover', to: '/areas-we-cover' }, { label: a.name }]} />

      <section className="section section--light">
        <div className="container detail">
          <div className="detail__main">
            <div className="detail__hero reveal">
              <Photo name="engine" alt={`Car service for ${a.name}`} className="detail__photo" eager />
              <span className="detail__icon"><Icon name="pin" size={30} /></span>
            </div>
            <div className="reveal">
              <p className="kicker"><span className="kicker__bar" /> {a.home ? 'Our home' : 'Pick-up & drop-off'}</p>
              <h2 className="detail__h2">Car Repair &amp; Service in {a.name}</h2>
              <p className="lead-text">{a.note}</p>
              <p className="lead-text">Hot Pistonz Garage is your trusted destination for comprehensive car repair and automotive care. We specialize in all car repairs, including luxury cars, and provide professional services 24/7, even on holidays — from oil changes and tyres to transmission overhauls, electrical repairs, detailing and painting.</p>
            </div>

            <div className="detail__group reveal">
              <h3>{a.home ? 'Drive in or book a pick-up' : `How pick-up & drop-off works in ${a.name}`}</h3>
              <div className="bcards bcards--4">
                {pickupSteps.map(([t, d], i) => (
                  <div key={t} className="bcard"><span className="bcard__num">{String(i + 1).padStart(2, '0')}</span><h4>{t}</h4><p>{d}</p></div>
                ))}
              </div>
            </div>

            <div className="detail__group reveal">
              <h3>Services available in {a.name}</h3>
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
              <Faq items={areaFaqs(a.name)} />
            </div>
          </div>

          <aside className="detail__side">
            <div className="side-card side-card--dark">
              <h3>Book in {a.name}</h3>
              <p>Pick up &amp; drop off service. Detailed quote before any work begins.</p>
              <Link to="/book-service" className="btn btn--accent btn--block" onClick={book}>Enquiry Now <Icon name="arrow" size={18} /></Link>
              <a href={business.phoneHref} className="btn btn--outline-light btn--block"><Icon name="phone" size={18} /> {business.phone}</a>
              <a href={wa(`Hello Hot Pistonz, I'm in ${a.name} and need a car service.`)} target="_blank" rel="noreferrer" className="side-card__wa"><Icon name="chat" size={16} /> WhatsApp us</a>
            </div>
            <div className="side-card">
              <h4>Area We Cover</h4>
              <ul className="side-nav">
                {areaPages.map((x) => (
                  <li key={x.slug}><Link to={`/areas-we-cover/${x.slug}`} className={x.slug === a.slug ? 'is-active' : ''}><Icon name="pin" size={16} /> {x.name}</Link></li>
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
          <SectionHead kicker="Popular services" title={`Most booked in ${a.name}`} />
          <ServiceCards items={homeServices.slice(0, 3)} />
          <SectionHead kicker="Nearby" title="We also cover" />
          <div className="area-grid">
            {nearby.map((x) => (
              <Link key={x.slug} to={`/areas-we-cover/${x.slug}`} className="area-card reveal">
                <span className="area-card__num">{String(areaPages.indexOf(x) + 1).padStart(2, '0')}</span>
                <span className="area-card__name">{x.name}</span>
                <span className="area-card__go"><Icon name="arrow" size={18} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
