import Icon from '../components/Icon';
import Photo from '../components/Photo';
import PageHeader from '../components/PageHeader';
import BookingForm from '../components/BookingForm';
import { business } from '../data/content';
import { MarqueStrip } from '../components/Blocks';

export default function Book() {
  return (
    <>
      <PageHeader title="Book a Service" kicker="Service request" sub="Book in under a minute. We confirm by phone or WhatsApp, day or night." image="banner-silver" crumbs={[{ label: 'Book a Service' }]} />
      <MarqueStrip />
      <section className="section section--dark book">
        <Photo name="hero-alt" className="book__bg" />
        <div className="book__shade" aria-hidden="true" />
        <div className="container book__inner">
          <div className="reveal">
            <p className="kicker"><span className="kicker__bar" /> Reserve your slot</p>
            <h2>Tell us about your car.</h2>
            <p className="head__sub">Choose your marque above to personalise the form. A technician will call to confirm and give you a quote. There's nothing to pay to book.</p>
            <ul className="book__perks">
              <li><Icon name="check" size={18} stroke={2} /> No payment needed to book</li>
              <li><Icon name="check" size={18} stroke={2} /> Detailed quote before any work begins</li>
              <li><Icon name="check" size={18} stroke={2} /> Free pick-up &amp; drop-off across 16 areas</li>
              <li><Icon name="check" size={18} stroke={2} /> Help with insurance claims</li>
            </ul>
            <a className="book__call" href={business.phoneHref}>
              <Icon name="phone" size={20} />
              <span><small>Prefer to talk?</small>{business.phone}</span>
            </a>
          </div>
          <div className="reveal"><BookingForm /></div>
        </div>
      </section>
    </>
  );
}
