import { useEffect, useState } from 'react';
import Icon from './Icon';
import Logo from './Logo';
import { Link } from '../router';
import { areas, brandSpecialist, business, nav, wa } from '../data/content';
import { slugify, specialistBrands } from '../data/specialist';
import { services, serviceCategories } from '../data/services';

function ServicesMenu() {
  return (
    <div className="container mega__inner">
      {serviceCategories.slice(1).map((c) => (
        <div key={c} className="mega__col">
          <h5>{c}</h5>
          {services.filter((s) => s.category === c).map((s) => (
            <Link key={s.slug} to={'/' + s.slug} className="mega__link"><Icon name={s.icon} size={18} /> {s.title}</Link>
          ))}
        </div>
      ))}
      <Link to="/our-services" className="mega__all"><span>View all {services.length} services</span> <Icon name="arrow" size={18} /></Link>
    </div>
  );
}

function BrandsMenu() {
  const german = specialistBrands.filter((b) => b.group === 'German Cars');
  const more = specialistBrands.filter((b) => b.group !== 'German Cars');
  return (
    <div className="container mega__inner mega__inner--brands">
      <div className="mega__col mega__col--wide">
        <h5>German Cars</h5>
        <div className="mega__grid">
          {german.map((b) => (
            <Link key={b.slug} to={`/brand-specialist/${b.slug}`} className="mega__link"><Icon name="chevron-r" size={14} /> {b.name}</Link>
          ))}
        </div>
      </div>
      <div className="mega__col mega__col--wide">
        <h5>Luxury &amp; Sports</h5>
        <div className="mega__grid mega__grid--2">
          {more.map((b) => (
            <Link key={b.slug} to={`/brand-specialist/${b.slug}`} className="mega__link"><Icon name="chevron-r" size={14} /> {b.name}</Link>
          ))}
        </div>
      </div>
      <Link to="/brand-specialist" className="mega__all"><span>All brands</span> <Icon name="arrow" size={18} /></Link>
    </div>
  );
}

function AreasMenu() {
  return (
    <div className="container mega__inner mega__inner--areas">
      <div className="mega__col mega__col--wide">
        <h5>Pick-up &amp; drop-off areas</h5>
        <div className="mega__grid mega__grid--4">
          {areas.map((a) => (
            <Link key={a} to={`/areas-we-cover/${slugify(a)}`} className="mega__link"><Icon name="pin" size={14} /> {a}</Link>
          ))}
        </div>
      </div>
      <Link to="/areas-we-cover" className="mega__all"><span>All areas we cover</span> <Icon name="arrow" size={18} /></Link>
    </div>
  );
}

const MENUS = { services: ServicesMenu, brands: BrandsMenu, areas: AreasMenu };

export default function Navbar({ path }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setOpen(false); setMenu(null); }, [path]);

  const isActive = (l) => {
    if (l.menu === 'services') return path === '/our-services' || services.some((s) => '/' + s.slug === path);
    if (l.menu === 'areas') return path.startsWith('/areas-we-cover');
    if (l.menu === 'brands') return path.startsWith('/brand-specialist');
    return l.to === path;
  };

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__top">
        <div className="container nav__top-inner">
          <span><Icon name="clock" size={14} /> {business.hours}</span>
          <span className="nav__top-right">
            <a href={business.phoneHref}><Icon name="phone" size={14} /> {business.phone}</a>
            <a href={`mailto:${business.email}`}><Icon name="mail" size={14} /> {business.email}</a>
          </span>
        </div>
      </div>
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" aria-label={`${business.fullName} home`}><Logo /></Link>

        <nav className="nav__links" aria-label="Main">
          {nav.map((l) => {
            if (!l.menu) return <Link key={l.label} to={l.to} className={isActive(l) ? 'is-active' : ''}>{l.label}</Link>;
            const Menu = MENUS[l.menu];
            const trigger = l.to
              ? <Link to={l.to} className={isActive(l) ? 'is-active' : ''}>{l.label} <Icon name="chevron" size={14} /></Link>
              : <button type="button" className={`nav__btn ${isActive(l) ? 'is-active' : ''}`} onClick={() => setMenu(menu === l.menu ? null : l.menu)}>{l.label} <Icon name="chevron" size={14} /></button>;
            return (
              <div key={l.label} className={`nav__item nav__item--mega ${menu === l.menu ? 'is-open' : ''}`}
                onMouseEnter={() => setMenu(l.menu)} onMouseLeave={() => setMenu(null)}>
                {trigger}
                <div className="mega"><Menu /></div>
              </div>
            );
          })}
        </nav>

        <Link to="/book-service" className="btn btn--accent btn--sm nav__cta">Enquiry Now</Link>
        <button className="nav__toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  );
}
