import { useEffect } from 'react';
import { useRoute, Link } from './router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageHeader from './components/PageHeader';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Brands from './pages/Brands';
import Areas from './pages/Areas';
import Contact from './pages/Contact';
import Book from './pages/Book';
import Admin from './pages/Admin';
import { BrandDetail, BrandSpecialistIndex } from './pages/BrandSpecialist';
import AreaDetail from './pages/AreaDetail';
import { findArea, findBrand } from './data/specialist';
import useReveal from './hooks/useReveal';
import { findService } from './data/services';
import { business } from './data/content';
import { listImages } from './api';
import { setOverrides } from './imageStore';

const pages = {
  '/': [Home, ''],
  '/about-us': [About, 'About Us'],
  '/our-services': [Services, 'Our Services'],
  '/car-brands': [Brands, 'Car Brands'],
  '/brand-specialist': [BrandSpecialistIndex, 'Brand Specialist'],
  '/areas-we-cover': [Areas, 'Areas We Cover'],
  '/contact-us': [Contact, 'Contact Us'],
  '/book-service': [Book, 'Book a Service'],
};

function NotFound() {
  return (
    <>
      <PageHeader title="Page not found" kicker="404" crumbs={[{ label: '404' }]} />
      <section className="section section--light"><div className="container"><Link to="/" className="btn btn--dark">Back to home</Link></div></section>
    </>
  );
}

export default function App() {
  const path = useRoute();
  useReveal([path]);

  // Load any images uploaded from the dashboard.
  useEffect(() => { listImages().then((d) => setOverrides(d.images || {})).catch(() => {}); }, []);

  const service = findService(path.slice(1));
  const brand = path.startsWith('/brand-specialist/') && findBrand(path.split('/')[2]);
  const area = path.startsWith('/areas-we-cover/') && findArea(path.split('/')[2]);
  const fixed = pages[path];
  const [content, title] = fixed ? [(() => { const P = fixed[0]; return <P />; })(), fixed[1]]
    : service ? [<ServiceDetail service={service} />, service.title]
    : brand ? [<BrandDetail brand={brand} />, `${brand.name} Service & Repair`]
    : area ? [<AreaDetail area={area} />, `Car Service in ${area.name}`]
    : [<NotFound />, 'Not found'];

  useEffect(() => {
    document.title = title ? `${title} | ${business.fullName}` : `${business.fullName} | Luxury & Performance Car Service in Dubai`;
  }, [title]);

  if (path === '/admin') return <Admin />;

  return (
    <>
      <Navbar path={path} />
      <main key={path} className="page">
        {content}
      </main>
      <Footer />
    </>
  );
}
