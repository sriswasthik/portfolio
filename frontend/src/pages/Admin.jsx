import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth, useClerk } from "@clerk/react";
import useAdmin from "../admin/useAdmin";
import { SECTIONS, SECTION_KEYS, cleanItems } from "../admin/sections";
import { useContentStore } from "../content/context";
import { saveSection } from "../lib/api";

// Stable keys so inputs keep focus when items are added, removed or moved.
let nextKey = 0;
const withKeys = (items) => items.map((item) => ({ ...item, _key: nextKey++ }));

function Admin() {
  const { isLoaded, isSignedIn, authorized, email } = useAdmin();
  const { signOut } = useClerk();
  const { status, reload } = useContentStore();

  if (!isLoaded) {
    return (
      <p className="page-header status-text" role="status">
        Loading…
      </p>
    );
  }
  // /login explains what's wrong when the account isn't the admin's.
  if (!isSignedIn || !authorized) return <Navigate to="/login" replace />;

  return (
    <>
      <title>Admin — Sri Swasthik</title>

      <header className="page-header page-header--row">
        <div>
          <h1 className="page-title">Admin</h1>
          <p className="page-lead admin-user">{email}</p>
        </div>
        <div className="admin-actions">
          <Link to="/" className="quiet-link">
            view site →
          </Link>
          <button
            type="button"
            className="button"
            onClick={() => signOut({ redirectUrl: "/login" })}
          >
            Sign out
          </button>
        </div>
      </header>

      {status === "ready" ? (
        <Editor />
      ) : status === "error" ? (
        <div className="page-body" role="alert">
          <p className="status-text">
            Couldn't load the saved content, so editing is paused to avoid
            overwriting it.
          </p>
          <button type="button" className="button" onClick={reload}>
            Try again
          </button>
        </div>
      ) : (
        <p className="status-text" role="status">
          Loading content… the API can take up to a minute to wake up.
        </p>
      )}
    </>
  );
}

function Editor() {
  const { content, setSection } = useContentStore();
  const { getToken } = useAuth();

  const [tab, setTab] = useState(SECTION_KEYS[0]);
  // One draft per tab, so switching tabs keeps unsaved edits.
  const [drafts, setDrafts] = useState(() =>
    Object.fromEntries(SECTION_KEYS.map((key) => [key, withKeys(content[key])]))
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null); // { tone: "error" | "ok", text }

  const isDirty = (key) =>
    JSON.stringify(cleanItems(key, drafts[key])) !==
    JSON.stringify(cleanItems(key, content[key]));
  const anyDirty = SECTION_KEYS.some(isDirty);

  useEffect(() => {
    if (!anyDirty) return;
    const warn = (e) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [anyDirty]);

  const config = SECTIONS[tab];
  const items = drafts[tab];
  const dirty = isDirty(tab);

  const setItems = (update) => {
    setDrafts((prev) => ({ ...prev, [tab]: update(prev[tab]) }));
    setMessage(null);
  };

  const updateItem = (index, key, value) =>
    setItems((list) => list.map((item, i) => (i === index ? { ...item, [key]: value } : item)));

  const move = (index, delta) =>
    setItems((list) => {
      const next = [...list];
      const [item] = next.splice(index, 1);
      next.splice(index + delta, 0, item);
      return next;
    });

  const remove = (index) => setItems((list) => list.filter((_, i) => i !== index));

  const add = () => setItems((list) => [...list, ...withKeys([config.blank])]);

  const discard = () => {
    setDrafts((prev) => ({ ...prev, [tab]: withKeys(content[tab]) }));
    setMessage(null);
  };

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const token = await getToken();
      const saved = await saveSection(tab, cleanItems(tab, items), token);
      setSection(tab, saved);
      setDrafts((prev) => ({ ...prev, [tab]: withKeys(saved) }));
      setMessage({ tone: "ok", text: "Saved. The site now shows these changes." });
    } catch (err) {
      setMessage({ tone: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-body">
      <div className="admin-tabs" role="tablist" aria-label="Content">
        {SECTION_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            id={`tab-${key}`}
            aria-selected={tab === key}
            aria-controls="admin-panel"
            className="admin-tabs__tab"
            onClick={() => {
              setTab(key);
              setMessage(null);
            }}
          >
            {SECTIONS[key].label}
            {isDirty(key) && (
              <span className="admin-tabs__dot" aria-label="(unsaved)" />
            )}
          </button>
        ))}
      </div>

      <div id="admin-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
        {items.length === 0 && (
          <p className="status-text">
            No {config.noun}s yet.
          </p>
        )}

        <ol className="plain-list admin-list">
          {items.map((item, index) => (
            <li key={item._key} className="admin-item">
              <div className="admin-item__top">
                <h2 className="admin-item__title">
                  <span className="admin-item__index">{index + 1}</span>
                  {config.heading(item) || `New ${config.noun}`}
                </h2>
                <div className="admin-item__controls">
                  <button
                    type="button"
                    className="button button--icon"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    aria-label={`Move ${config.noun} ${index + 1} up`}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="button button--icon"
                    onClick={() => move(index, 1)}
                    disabled={index === items.length - 1}
                    aria-label={`Move ${config.noun} ${index + 1} down`}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick={() => remove(index)}
                  >
                    Remove<span className="visually-hidden"> {config.noun} {index + 1}</span>
                  </button>
                </div>
              </div>

              {config.preview && item.src && (
                <img
                  src={item.thumb || item.src}
                  alt=""
                  className="admin-item__preview"
                  loading="lazy"
                />
              )}

              <div className="form">
                {config.fields.map((field) => (
                  <Field
                    key={field.key}
                    id={`${tab}-${item._key}-${field.key}`}
                    field={field}
                    value={item[field.key]}
                    onChange={(value) => updateItem(index, field.key, value)}
                  />
                ))}
              </div>
            </li>
          ))}
        </ol>

        <button type="button" className="button admin-add" onClick={add}>
          + Add {config.noun}
        </button>
      </div>

      <div className="admin-savebar">
        <p
          className={`status-text${message?.tone === "error" ? " status-text--error" : ""}`}
          role="status"
        >
          {message?.text ?? (dirty ? "Unsaved changes" : "All changes saved")}
        </p>
        <div className="admin-actions">
          <button type="button" className="button" onClick={discard} disabled={!dirty || saving}>
            Discard
          </button>
          <button
            type="button"
            className="button button--primary"
            onClick={save}
            disabled={!dirty || saving}
          >
            {saving ? "Saving…" : `Save ${config.label}`}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ id, field, value, onChange }) {
  const hintId = field.hint ? `${id}-hint` : undefined;
  const label = (
    <label htmlFor={id} className="field__label">
      {field.label}
      {field.required && <span aria-hidden="true"> *</span>}
    </label>
  );
  const hint = field.hint && (
    <p id={hintId} className="field__hint">
      {field.hint}
    </p>
  );

  if (field.type === "links") {
    return <LinksField id={id} label={field.label} value={value ?? []} onChange={onChange} />;
  }

  if (field.type === "textarea") {
    return (
      <div className="field">
        {label}
        <textarea
          id={id}
          className="field__input"
          rows={4}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={hintId}
        />
        {hint}
      </div>
    );
  }

  // Lists are edited as comma-separated text. Only leading spaces are
  // stripped while typing so "Tailwind CSS" can still be typed; the rest
  // is tidied up on save.
  const isList = field.type === "list";
  const text = isList ? (value ?? []).join(", ") : (value ?? "");

  return (
    <div className="field">
      {label}
      <input
        id={id}
        type={field.type === "url" ? "url" : "text"}
        inputMode={field.inputMode}
        className="field__input"
        value={text}
        required={field.required}
        onChange={(e) =>
          onChange(
            isList
              ? e.target.value.split(",").map((part) => part.replace(/^\s+/, ""))
              : e.target.value
          )
        }
        aria-describedby={hintId}
      />
      {hint}
    </div>
  );
}

function LinksField({ id, label, value, onChange }) {
  const update = (index, key, next) =>
    onChange(value.map((link, i) => (i === index ? { ...link, [key]: next } : link)));

  return (
    <fieldset className="field admin-links">
      <legend className="field__label">{label}</legend>

      {value.map((link, index) => (
        <div key={index} className="admin-links__row">
          <input
            aria-label={`Link ${index + 1} label`}
            placeholder="Label"
            className="field__input"
            value={link.label}
            onChange={(e) => update(index, "label", e.target.value)}
          />
          <input
            id={index === 0 ? id : undefined}
            type="url"
            aria-label={`Link ${index + 1} URL`}
            placeholder="https://…"
            className="field__input"
            value={link.href}
            onChange={(e) => update(index, "href", e.target.value)}
          />
          <button
            type="button"
            className="button button--icon"
            onClick={() => onChange(value.filter((_, i) => i !== index))}
            aria-label={`Remove link ${index + 1}`}
          >
            ×
          </button>
        </div>
      ))}

      <button
        type="button"
        className="quiet-link admin-links__add"
        onClick={() => onChange([...value, { label: "", href: "" }])}
      >
        + add link
      </button>
    </fieldset>
  );
}

export default Admin;
