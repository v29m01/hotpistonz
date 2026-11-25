import PageHeader from '../components/PageHeader';
import { servicesPage } from '../data/content';
import { services, serviceCategories } from '../data/services';
import { MarqueStrip, SectionHead, ServiceCards, ServiceTiles } from '../components/Blocks';

export default function Services() {
  return (
    <>
      <PageHeader title={servicesPage.title} kicker="Hot Pistonz Garage" sub={servicesPage.sub} image="banner-red" crumbs={[{ label: 'Our Services' }]} />
      <MarqueStrip />

      <section className="section section--light">
        <div className="container">
          <SectionHead center kicker="What we do" title={servicesPage.sub} />
          <ServiceTiles />
        </div>
      </section>

      {serviceCategories.slice(1).map((cat, i) => (
        <section key={cat} className={`section ${i % 2 ? 'section--light' : 'section--paper'}`}>
          <div className="container">
            <SectionHead kicker={`0${i + 1}`} title={cat} />
            <ServiceCards items={services.filter((s) => s.category === cat)} />
          </div>
        </section>
      ))}
    </>
  );
}
