import { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import { Link } from '../router';
import ImageManager from '../components/ImageManager';
import { listBookings, updateBookingStatus } from '../api';

const STATUSES = ['new', 'confirmed', 'in-progress', 'completed', 'cancelled'];

function readKey() {
  try { return sessionStorage.getItem('hp_admin_key') || ''; } catch { return ''; }
}
function saveKey(k) {
  try { sessionStorage.setItem('hp_admin_key', k); } catch { /* ignore */ }
}

// Simple bookings dashboard at /admin, protected by the ADMIN_KEY in server/.env
export default function Admin() {
  const [key, setKey] = useState(readKey);
  const [input, setInput] = useState('');
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('images');

  useEffect(() => {
    if (!key) return;
    setLoading(true);
    listBookings(key)
      .then((d) => { setBookings(d.bookings); setError(''); })
      .catch((e) => { setError(e.message); setKey(''); saveKey(''); })
      .finally(() => setLoading(false));
  }, [key]);

  async function changeStatus(id, status) {
    const prev = bookings;
    setBookings((b) => b.map((x) => (x._id === id ? { ...x, status } : x)));
    try { await updateBookingStatus(id, status, key); } catch (e) { setBookings(prev); setError(e.message); }
  }

  if (!key) {
    return (
      <div className="admin admin--login">
        <form className="card admin__login" onSubmit={(e) => { e.preventDefault(); saveKey(input); setKey(input); }}>
          <Logo />
          <h2>Workshop dashboard</h2>
          <label className="field">
            <span className="field__label">Admin key</span>
            <input type="password" value={input} onChange={(e) => setInput(e.target.value)} />
          </label>
          {error && <p className="form-alert">{error}</p>}
          <button className="btn btn--accent btn--block">Sign in</button>
          <Link to="/" className="admin__back">← Back to site</Link>
        </form>
      </div>
    );
  }

  const counts = STATUSES.map((s) => ({ s, n: bookings.filter((b) => b.status === s).length }));

  return (
    <div className="admin">
      <header className="admin__bar">
        <Logo />
        <div>
          <Link to="/" className="btn btn--ghost btn--sm">View site</Link>
          <button className="btn btn--ghost btn--sm" onClick={() => { saveKey(''); setKey(''); }}>Sign out</button>
        </div>
      </header>
      <div className="container">
        <div className="admin__tabs" role="tablist">
          {[['images', 'Images'], ['bookings', `Bookings (${bookings.length})`]].map(([id, label]) => (
            <button key={id} role="tab" aria-selected={tab === id} className={`tab ${tab === id ? 'tab--active' : ''}`} onClick={() => setTab(id)}>{label}</button>
          ))}
        </div>
        {tab === 'images' ? (
          <>
            <h2>Site images</h2>
            <ImageManager adminKey={key} />
          </>
        ) : (
        <>
        <h2>Bookings</h2>
        <div className="admin__counts">
          {counts.map(({ s, n }) => (
            <div key={s} className="card admin__count"><span>{n}</span><small>{s}</small></div>
          ))}
        </div>
        {error && <p className="form-alert">{error}</p>}
        {loading ? <p>Loading…</p> : (
          <div className="card admin__table-wrap">
            <table className="admin__table">
              <thead>
                <tr><th>Ref</th><th>Customer</th><th>Car</th><th>Service</th><th>Date</th><th>Pick-up</th><th>Status</th></tr>
              </thead>
              <tbody>
                {bookings.length === 0 && <tr><td colSpan={7}>No bookings yet.</td></tr>}
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td><code>{b.ref}</code></td>
                    <td><strong>{b.name}</strong><br /><small>{b.phone}</small></td>
                    <td>{b.marque}<br /><small>{b.model}</small></td>
                    <td>{b.service}</td>
                    <td>{new Date(b.preferredDate).toLocaleDateString('en-GB')}<br /><small>{b.timeSlot}</small></td>
                    <td>{b.pickup ? b.area : '—'}</td>
                    <td>
                      <select className={`status status--${b.status}`} value={b.status} onChange={(e) => changeStatus(b._id, e.target.value)}>
                        {STATUSES.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </>
        )}
      </div>
    </div>
  );
}
