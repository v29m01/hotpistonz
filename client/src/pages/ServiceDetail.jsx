import Icon from '../components/Icon';
import Photo from '../components/Photo';
import PageHeader from '../components/PageHeader';
import { Link, prefill } from '../router';
import { business } from '../data/content';
import { services } from '../data/services';
import { Faq, SectionHead, ServiceCards } from '../components/Blocks';

function Group({ g, index }) {
  if (g.style === 'cards') {
    return (
      <div className="detail__group reveal">
        <h3>{g.title}</h3>
        <div className="bcards">
          {g.items.map(([t, d], i) => (
            <div key={t} className="bcard">
              <span className="bcard__num">{String(i + 1).padStart(2, '0')}</span>
              <h4>{t}</h4>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="detail__group reveal">
      <h3><span className="detail__idx">{String(index + 1).padStart(2, '0')}</span>{g.title}</h3>
      <div className="features">
        {g.items.map(([t, d]) => (
          <div key={t} className="feature">
            <span className="feature__mark"><Icon name="check" size={14} stroke={2.6} /></span>
            <div><h4>{t}</h4><p>{d}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServiceDetail({ service: s }) {
  const related = services.filter((x) => x.category === s.category && x.slug !== s.slug).slice(0, 3);
  const more = related.length < 3 ? services.filter((x) => x.slug !== s.slug && !related.includes(x)).slice(0, 3 - related.length) : [];
  const book = () => { prefill.service = s.title; };

  return (
    <>
      <PageHeader
        title={s.title}
        kicker={s.category}
        sub={s.short}
        image={s.slug === 'auto-fleet-service-and-maintenance' ? 'banner-blue' : 'banner-black'}
        crumbs={[{ label: 'Our Services', to: '/our-services' }, { label: s.title }]}
      />

      <section className="section section--light">
        <div className="container detail">
          <div className="detail__main">
            <div className="detail__hero reveal">
              <Photo name={s.image} alt={s.title} className="detail__photo" eager />
              <span className="detail__icon"><Icon name={s.icon} size={30} /></span>
            </div>
            <div className="reveal">
              <p className="kicker"><span className="kicker__bar" /> Overview</p>
              <h2 className="detail__h2">{s.fullTitle || s.title}</h2>
              {s.intro.map((p) => <p key={p} className="lead-text">{p}</p>)}
            </div>

            {s.sectionsTitle && <h2 className="detail__subhead reveal">{s.sectionsTitle}</h2>}
            {s.sections.map((g, i) => <Group key={g.title} g={g} index={i} />)}

            {s.sections2 && <h2 className="detail__subhead reveal">{s.sections2Title}</h2>}
            {s.sections2?.map((g, i) => <Group key={g.title} g={g} index={i} />)}

            {s.problems && <Group g={{ ...s.problems, style: 'cards' }} />}

            {s.closing && (
              <div className="detail__closing reveal">
                <Icon name="shield" size={32} />
                <div><h3>{s.closing.title}</h3><p>{s.closing.text}</p></div>
              </div>
            )}

            {s.why && (
              <div className="detail__why reveal">
                <h3>{s.why.title}</h3>
                <div className="why-grid">
                  {s.why.items.map(([t, d]) => (
                    <div key={t} className="why-grid__item">
                      <span className="why-grid__icon"><Icon name="check" size={18} stroke={2.4} /></span>
                      <h4>{t}</h4>
                      <p>{d}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {s.faqs.length > 0 && (
              <div className="detail__group reveal">
                <h3>Frequently Asked Questions</h3>
                <Faq items={s.faqs} />
              </div>
            )}
          </div>

          <aside className="detail__side">
            <div className="side-card side-card--dark">
              <h3>Book {s.title}</h3>
              <p>Pick up &amp; drop off service across Dubai. Detailed quote before any work begins.</p>
              <Link to="/book-service" className="btn btn--accent btn--block" onClick={book}>Enquiry Now <Icon name="arrow" size={18} /></Link>
              <a href={business.phoneHref} className="btn btn--outline-light btn--block"><Icon name="phone" size={18} /> {business.phone}</a>
              <a href={business.whatsapp} target="_blank" rel="noreferrer" className="side-card__wa"><Icon name="chat" size={16} /> WhatsApp us</a>
            </div>
            <div className="side-card">
              <h4>Our Services</h4>
              <ul className="side-nav">
                {services.map((x) => (
                  <li key={x.slug}>
                    <Link to={'/' + x.slug} className={x.slug === s.slug ? 'is-active' : ''}><Icon name={x.icon} size={16} /> {x.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <SectionHead kicker="You may also need" title="Related services" />
          <ServiceCards items={[...related, ...more]} />
        </div>
      </section>
    </>
  );
}
