import Photo from './Photo';
import Icon from './Icon';
import { Link } from '../router';

// Banner at the top of every inner page, with breadcrumb.
export default function PageHeader({ title, kicker, sub, image = 'banner-black', crumbs = [] }) {
  return (
    <section className="page-head">
      <Photo name={image} eager className="page-head__bg" />
      <div className="page-head__shade" aria-hidden="true" />
      <div className="container page-head__inner">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label}>
              <Icon name="chevron-r" size={12} />
              {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </span>
          ))}
        </nav>
        {kicker && <p className="kicker"><span className="kicker__bar" /> {kicker}</p>}
        <h1>{title}</h1>
        {sub && <p className="page-head__sub">{sub}</p>}
      </div>
    </section>
  );
}
