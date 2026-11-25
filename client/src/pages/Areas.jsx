import Icon from '../components/Icon';
import PageHeader from '../components/PageHeader';
import { areas, business } from '../data/content';
import { Link } from '../router';
import { slugify } from '../data/specialist';
import { SectionHead } from '../components/Blocks';

export default function Areas() {
  return (
    <>
      <PageHeader
        title="Area We Cover"
        kicker="Free collection & delivery"
        sub="Pick Up & Drop Off Service across Dubai. Choose your area to see how we collect and return your car."
        image="banner-blue"
        crumbs={[{ label: 'Areas We Cover' }]}
      />
      <section className="section section--light">
        <div className="container">
          <SectionHead center kicker="Pick-up & drop-off" title="16 areas across Dubai" sub={`Based in Dubai Investment Park, ${business.hours.toLowerCase()}.`} />
          <div className="area-grid">
            {areas.map((a, i) => (
              <Link to={`/areas-we-cover/${slugify(a)}`} key={a} className="area-card reveal" style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
                <span className="area-card__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="area-card__name">{a}</span>
                <span className="area-card__go"><Icon name="arrow" size={18} /></span>
              </Link>
            ))}
          </div>
          <p className="note">Not on the list? Call <a href={business.phoneHref}>{business.phone}</a> and we'll do our best to help.</p>
        </div>
      </section>
    </>
  );
}
