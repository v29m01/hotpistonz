import { useEffect, useState } from 'react';
import Icon from './Icon';
import { createBooking } from '../api';
import { prefill } from '../router';
import { useMarque } from '../theme';
import { areas, marques, timeSlots } from '../data/content';
import { services } from '../data/services';
import { specialistBrands } from '../data/specialist';

// Every brand on the site: the home marques plus the Brand Specialist list.
const brandOptions = [...new Set([...marques.filter((m) => m.id !== 'all').map((m) => m.name), ...specialistBrands.filter((b) => b.group !== 'More').map((b) => b.name)])].concat('Other');

const today = () => new Date().toISOString().slice(0, 10);

const blank = () => ({
  name: '', phone: '', email: '', marque: prefill.marque || '', model: '',
  service: prefill.service || '', preferredDate: '', timeSlot: timeSlots[0],
  pickup: true, area: prefill.area || areas[0], notes: '',
});

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name';
  if (!/^\+?[0-9\s-]{7,16}$/.test(f.phone.trim())) e.phone = 'Enter a valid phone number';
  if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email';
  if (!f.marque) e.marque = 'Select your marque';
  if (!f.service) e.service = 'Select a service';
  if (!f.preferredDate) e.preferredDate = 'Choose a date';
  return e;
}

export default function BookingForm() {
  const marque = useMarque();
  const [form, setForm] = useState(blank);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverMsg, setServerMsg] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (marque.id !== 'all' && !prefill.marque) setForm((f) => ({ ...f, marque: marque.name }));
  }, [marque]);
  useEffect(() => () => { prefill.service = ''; prefill.marque = ''; prefill.area = ''; }, []);

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus('sending');
    setServerMsg('');
    try {
      const data = await createBooking({ ...form, area: form.pickup ? form.area : '' });
      setResult(data.booking);
      setStatus('done');
      setForm(blank());
    } catch (err) {
      setErrors(err.fields || {});
      setServerMsg(err.message);
      setStatus('error');
    }
  }

  const field = (key, label, input) => (
    <label className={`field ${errors[key] ? 'field--error' : ''}`}>
      <span className="field__label">{label}</span>
      {input}
      {errors[key] && <span className="field__error">{errors[key]}</span>}
    </label>
  );

  if (status === 'done' && result) {
    return (
      <div className="book__card">
        <div className="book__success" role="status">
          <span className="book__tick"><Icon name="check" size={34} stroke={2.2} /></span>
          <h3>Request received</h3>
          <p>
            Thank you, {result.name.split(' ')[0]}. Your reference is <strong>{result.ref}</strong>.
            We'll call you on {result.phone} to confirm your {result.service.toLowerCase()} for{' '}
            {new Date(result.preferredDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}.
          </p>
          <button className="btn btn--ghost" onClick={() => setStatus('idle')}>Book another car</button>
        </div>
      </div>
    );
  }

  return (
    <form className="book__card" onSubmit={onSubmit} noValidate>
      <div className="form-grid">
        {field('name', 'Full name', <input value={form.name} onChange={set('name')} autoComplete="name" placeholder="Your name" />)}
        {field('phone', 'Phone / WhatsApp', <input value={form.phone} onChange={set('phone')} type="tel" autoComplete="tel" placeholder="+971 5X XXX XXXX" />)}
        {field('email', 'Email (optional)', <input value={form.email} onChange={set('email')} type="email" autoComplete="email" placeholder="you@example.com" />)}
        {field('marque', 'Marque', (
          <select value={form.marque} onChange={set('marque')}>
            <option value="">Select…</option>
            {brandOptions.map((n) => <option key={n}>{n}</option>)}
            <option>Other</option>
          </select>
        ))}
        {field('model', 'Model & year', <input value={form.model} onChange={set('model')} placeholder="e.g. 911 Carrera S, 2021" />)}
        {field('service', 'Service', (
          <select value={form.service} onChange={set('service')}>
            <option value="">Select…</option>
            {services.map((s) => <option key={s.slug}>{s.title}</option>)}
            <option>Not sure — need diagnosis</option>
          </select>
        ))}
        {field('preferredDate', 'Preferred date', <input type="date" min={today()} value={form.preferredDate} onChange={set('preferredDate')} />)}
        {field('timeSlot', 'Time slot', (
          <select value={form.timeSlot} onChange={set('timeSlot')}>{timeSlots.map((t) => <option key={t}>{t}</option>)}</select>
        ))}
      </div>
      <label className="toggle">
        <input type="checkbox" checked={form.pickup} onChange={set('pickup')} />
        <span className="toggle__ui" />
        <span>Collect my car (free pick-up &amp; drop-off)</span>
      </label>
      {form.pickup && (
        <div className="form-grid form-grid--1">
          {field('area', 'Pick-up area', <select value={form.area} onChange={set('area')}>{areas.map((a) => <option key={a}>{a}</option>)}</select>)}
        </div>
      )}
      <div className="form-grid form-grid--1">
        {field('notes', 'Anything we should know?', <textarea rows={3} value={form.notes} onChange={set('notes')} placeholder="Warning lights, noises, last service date…" />)}
      </div>
      {serverMsg && <p className="form-alert" role="alert">{serverMsg}</p>}
      <button className="btn btn--accent btn--block" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Submit Request'} {status !== 'sending' && <Icon name="arrow" size={18} />}
      </button>
    </form>
  );
}
