import { useState } from 'react';
import Icon from '../components/Icon';
import PageHeader from '../components/PageHeader';
import { sendMessage } from '../api';
import { business, contactPage } from '../data/content';

const blank = { name: '', company: '', phone: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(blank);
  const [state, setState] = useState({ status: 'idle', msg: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.message || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setState({ status: 'error', msg: 'Please fill in your name, a valid email and a message.' });
      return;
    }
    setState({ status: 'sending', msg: '' });
    try {
      await sendMessage(form);
      setState({ status: 'done', msg: "Thank you. Your message has been sent and we'll get back to you shortly." });
      setForm(blank);
    } catch (err) {
      setState({ status: 'error', msg: err.message });
    }
  }

  const items = [
    { icon: 'phone', label: 'Phone Number', value: business.phone, href: business.phoneHref },
    { icon: 'mail', label: 'Email Address', value: business.email, href: `mailto:${business.email}` },
    { icon: 'pin', label: 'Address', value: business.address, href: business.mapsUrl, ext: true },
    { icon: 'chat', label: 'WhatsApp', value: 'WhatsApp us', href: business.whatsapp, ext: true },
  ];
  const input = (k, label, props = {}) => (
    <label className="field"><span className="field__label">{label}</span><input value={form[k]} onChange={set(k)} {...props} /></label>
  );

  return (
    <>
      <PageHeader title={contactPage.title} kicker={business.hours} sub={contactPage.sub} image="banner-black" crumbs={[{ label: 'Contact Us' }]} />

      <section className="section section--light">
        <div className="container contact">
          <div className="reveal">
            <p className="kicker"><span className="kicker__bar" /> {contactPage.infoTitle}</p>
            <h2>{contactPage.sub}</h2>
            <p className="lead-text">{contactPage.infoText}</p>
            <ul className="contact__list">
              {items.map((it) => (
                <li key={it.label}>
                  <span className="contact__icon"><Icon name={it.icon} size={20} /></span>
                  <span>
                    <small>{it.label}</small>
                    <a href={it.href} target={it.ext ? '_blank' : undefined} rel="noreferrer">{it.value}</a>
                  </span>
                </li>
              ))}
            </ul>
            <a className="map" href={business.mapsUrl} target="_blank" rel="noreferrer">
              <span className="map__pin"><Icon name="pin" size={22} /></span>
              <span className="map__label">{business.fullName}<small>{business.addressShort}</small></span>
              <span className="map__cta">Open in Google Maps <Icon name="arrow" size={16} /></span>
            </a>
          </div>

          <form className="contact__form reveal" onSubmit={onSubmit} noValidate>
            <h3>{contactPage.formTitle}</h3>
            <div className="form-grid">
              {input('name', 'Name', { autoComplete: 'name' })}
              {input('company', 'Company', { autoComplete: 'organization' })}
              {input('phone', 'Phone', { type: 'tel', autoComplete: 'tel' })}
              {input('email', 'Email', { type: 'email', autoComplete: 'email' })}
            </div>
            <div className="form-grid form-grid--1">
              {input('subject', 'Subject')}
              <label className="field"><span className="field__label">Message</span><textarea rows={5} value={form.message} onChange={set('message')} /></label>
            </div>
            {state.msg && <p className={state.status === 'done' ? 'form-ok' : 'form-alert'} role="status">{state.msg}</p>}
            <button className="btn btn--dark btn--block" disabled={state.status === 'sending'}>
              {state.status === 'sending' ? 'Sending…' : 'Send Message'} <Icon name="arrow" size={18} />
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
