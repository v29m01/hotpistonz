import Icon from '../components/Icon';
import PageHeader from '../components/PageHeader';
import { Link } from '../router';
import { brandSpecialist, carBrands, marques, wa } from '../data/content';
import Photo from '../components/Photo';
import { slugify } from '../data/specialist';
import { MarqueStrip, SectionHead } from '../components/Blocks';

const photoOf = (name) => { const m = marques.find((x) => x.name === name); return m ? `hero-${m.id}` : 'hero'; };

export default function Brands() {
  return (
    <>
      <PageHeader title={carBrands.title} kicker="Brand Specialist" sub={carBrands.sub} image="banner-yellow" crumbs={[{ label: 'Car Brands' }]} />
      <MarqueStrip />

      <section className="section section--light">
        <div className="container">
          <SectionHead center kicker="Car Brands" title={carBrands.sub} />
          <div className="brand-grid brand-grid--9">
            {carBrands.brands.map((b, i) => (
              <a key={b} href={wa(`Hello Hot Pistonz, I need service for my ${b}.`)} target="_blank" rel="noreferrer"
                className="brand-tile brand-tile--photo reveal" style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                <Photo name={photoOf(b)} alt={b} className="brand-tile__photo" />
                <span className="brand-tile__name">{b}</span>
                <span className="brand-tile__go">Book via WhatsApp <Icon name="arrow" size={14} /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <SectionHead kicker="Brand Specialist" title="German Cars" sub="Our specialist expertise, alongside luxury and sports cars." />
          <ul className="brand-tags reveal">
            {brandSpecialist.german.map((b) => <li key={b}><Link to={`/brand-specialist/${slugify(b)}`}>{b}</Link></li>)}
            {brandSpecialist.other.map((b) => <li key={b} className="is-alt"><Link to={`/brand-specialist/${slugify(b)}`}>{b}</Link></li>)}
          </ul>
          <div className="hero__cta reveal">
            <Link to="/book-service" className="btn btn--dark">Enquiry Now <Icon name="arrow" size={18} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
