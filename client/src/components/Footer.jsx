import Icon from './Icon';
import Logo from './Logo';
import { Link } from '../router';
import { business, footerCompany, footerServices, home } from '../data/content';

export default function Footer() {
  return (
    <>
      {/* "Your Car, Our Expertise" band from the live site */}
      <section className="contact-band">
        <div className="container contact-band__inner">
          <div>
            <p className="kicker"><span className="kicker__bar" /> {business.hours}</p>
            <h2>{home.contact.title}</h2>
          </div>
          <div className="contact-band__actions">
            <a href={business.phoneHref} className="contact-band__phone"><Icon name="phone" size={24} /> {business.phone}</a>
            <Link to="/contact-us" className="btn btn--accent">{home.contact.button} <Icon name="arrow" size={18} /></Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer__grid">
          <div>
            <Logo light />
            <p className="footer__about">{business.footerAbout}</p>
            <div className="footer__social">
              <a href={business.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon name="chat" size={18} /></a>
              <a href={business.phoneHref} aria-label="Call"><Icon name="phone" size={18} /></a>
              <a href={`mailto:${business.email}`} aria-label="Email"><Icon name="mail" size={18} /></a>
            </div>
          </div>
          <div>
            <h4>Services</h4>
            <ul>{footerServices.map(([t, to]) => <li key={to}><Link to={to}>{t}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              {footerCompany.map(([t, to]) => <li key={to}><Link to={to}>{t}</Link></li>)}
              <li><Link to="/admin">Staff Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul className="footer__contact">
              <li><Icon name="pin" size={16} /> <a href={business.mapsUrl} target="_blank" rel="noreferrer">{business.address}</a></li>
              <li><Icon name="phone" size={16} /> <a href={business.phoneHref}>{business.phone}</a></li>
              <li><Icon name="mail" size={16} /> <a href={`mailto:${business.email}`}>{business.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="container footer__bottom">
          <span>Copyright © {new Date().getFullYear()} {business.fullName}. All rights reserved.</span>
          <span>Independent service centre. Brand names identify the vehicles we service and belong to their respective owners.</span>
        </div>
      </footer>
      <a className="fab" href={business.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp us">
        <Icon name="chat" size={24} />
      </a>
    </>
  );
}
