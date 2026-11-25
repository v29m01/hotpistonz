import { useRef, useState } from 'react';
import Icon from './Icon';
import { uploadImage, resetImage } from '../api';
import { imageUrl, isCustom, setOverride, clearOverride, useImages } from '../imageStore';
import { imageGroups } from '../data/imageSlots';

const ACCEPT_IMG = 'image/jpeg,image/png,image/webp,image/avif';
const ACCEPT_VIDEO = 'video/mp4,video/webm';

function SlotCard({ slot, adminKey }) {
  useImages();
  const input = useRef(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [msg, setMsg] = useState(null);
  const custom = isCustom(slot.name);

  async function send(file) {
    if (!file) return;
    setBusy(true); setMsg(null);
    try {
      const { url } = await uploadImage(slot.name, file, adminKey);
      setOverride(slot.name, url);
      setMsg({ ok: true, text: 'Uploaded. Live on the site now.' });
    } catch (e) {
      setMsg({ ok: false, text: e.message });
    } finally {
      setBusy(false);
      if (input.current) input.current.value = '';
    }
  }

  async function reset() {
    setBusy(true); setMsg(null);
    try { await resetImage(slot.name, adminKey); clearOverride(slot.name); setMsg({ ok: true, text: 'Back to the default image.' }); }
    catch (e) { setMsg({ ok: false, text: e.message }); }
    finally { setBusy(false); }
  }

  return (
    <div
      className={`slot ${slot.wide ? 'slot--wide' : ''} ${drag ? 'is-drag' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); send(e.dataTransfer.files[0]); }}
    >
      <button type="button" className="slot__preview" onClick={() => input.current?.click()} disabled={busy} aria-label={`Upload image for ${slot.label}`}>
        {!imageUrl(slot.name) ? (
          <span className="slot__empty"><Icon name={slot.kind === 'video' ? 'play' : 'upload'} size={30} /> Nothing uploaded yet</span>
        ) : slot.kind === 'video' ? (
          <video src={imageUrl(slot.name)} muted loop autoPlay playsInline />
        ) : (
          <img src={isCustom(slot.name) || !slot.fallback ? imageUrl(slot.name) : imageUrl(slot.fallback)} alt="" className={slot.kind === 'logo' ? 'slot__logo' : ''} />
        )}
        <span className="slot__overlay">
          <Icon name="upload" size={26} />
          <span>{busy ? 'Uploading…' : `Click or drop ${slot.kind === 'video' ? 'a video' : 'an image'}`}</span>
        </span>
        {custom && <span className="slot__badge">Uploaded</span>}
      </button>
      <div className="slot__body">
        <strong>{slot.label}</strong>
        <small>{slot.where}</small>
        <small className="slot__size">{slot.kind ? slot.size : `Best size: ${slot.size}px · JPG/PNG/WebP · max 8 MB`}</small>
        {msg && <p className={msg.ok ? 'slot__ok' : 'slot__err'}>{msg.text}</p>}
        <div className="slot__actions">
          <button type="button" className="btn btn--accent btn--sm" onClick={() => input.current?.click()} disabled={busy}>
            <Icon name="upload" size={16} /> Upload
          </button>
          {custom && (
            <button type="button" className="btn btn--ghost btn--sm" onClick={reset} disabled={busy}>Reset</button>
          )}
        </div>
      </div>
      <input ref={input} type="file" accept={slot.kind === 'video' ? ACCEPT_VIDEO : ACCEPT_IMG} hidden onChange={(e) => send(e.target.files[0])} />
    </div>
  );
}

export default function ImageManager({ adminKey }) {
  return (
    <div className="images">
      <p className="images__intro">
        Upload your logo, a banner video, or a photo for any slot. It replaces that item everywhere on the site, immediately.
        Click a card or drag a file onto it. Use <strong>Reset</strong> to go back to the default.
      </p>
      {imageGroups.map((g) => (
        <section key={g.title} className="images__group">
          <h3>{g.title}</h3>
          <div className="slots">
            {g.slots.map((s) => <SlotCard key={s.name} slot={s} adminKey={adminKey} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
