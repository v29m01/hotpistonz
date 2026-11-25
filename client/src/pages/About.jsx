import Icon from '../components/Icon';
import Photo from '../components/Photo';
import PageHeader from '../components/PageHeader';
import { Link } from '../router';
import { about, home } from '../data/content';
import { SectionHead, Testimonials, TrustGrid } from '../components/Blocks';

export default function About() {
  return (
    <>
      <PageHeader title="About Us" kicker="Hot Pistonz Garage" sub={about.title} image="banner-silver" crumbs={[{ label: 'About Us' }]} />

      <section className="section section--light">
        <div className="container split">
          <div className="reveal">
            <p className="kicker"><span className="kicker__bar" /> Who we are</p>
            <h2>{about.title}</h2>
            {about.intro.map((p) => <p key={p} className="lead-text">{p}</p>)}
            <div className="hero__cta">
              <Link to="/our-services" className="btn btn--dark">Our Services <Icon name="arrow" size={18} /></Link>
            </div>
          </div>
          <div className="split__media split__media--right reveal">
            <Photo name="mechanic" alt="Wheel and brake detail" className="split__photo" />
            <Photo name="interior" alt="Car interior" className="split__photo split__photo--small" />
            {about.experienceValue && (
              <div className="badge badge--right"><strong>{about.experienceValue}</strong><span>{about.experienceLabel}</span></div>
            )}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <SectionHead center kicker="Vision · Mission · Value" title={about.vmvTitle} />
          <div className="vmm">
            {about.vmv.map((v, i) => (
              <div key={v.title} className="vmm__card reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="vmm__icon"><Icon name={v.icon} size={28} /></span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
