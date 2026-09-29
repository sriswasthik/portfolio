import { useCallback, useEffect, useMemo, useState } from "react";
import { ContentContext, DEFAULT_CONTENT } from "./context";
import { fetchContent } from "../lib/api";

// The last response is kept so repeat visits render saved content straight
// away instead of waiting on the API (which can take a while to wake up).
const CACHE_KEY = "site-content";

function readCache() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || {};
  } catch {
    return {};
  }
}

function writeCache(content) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(content));
  } catch {
    // Storage unavailable; the next visit just fetches again.
  }
}

// Only sections the API actually has override the defaults.
function merge(saved) {
  const next = { ...DEFAULT_CONTENT };
  for (const key of Object.keys(DEFAULT_CONTENT)) {
    if (Array.isArray(saved?.[key])) next[key] = saved[key];
  }
  return next;
}

function ContentProvider({ children }) {
  const [content, setContent] = useState(() => merge(readCache()));
  // "ready" once the API has answered; the admin panel waits for it so
  // edits never start from stale or default content.
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetchContent(controller.signal)
      .then((saved) => {
        writeCache(saved);
        setContent(merge(saved));
        setStatus("ready");
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.warn(err);
        setStatus("error");
      });
    return () => controller.abort();
  }, [attempt]);

  const reload = useCallback(() => {
    setStatus("loading");
    setAttempt((n) => n + 1);
  }, []);

  const setSection = useCallback((section, items) => {
    setContent((prev) => ({ ...prev, [section]: items }));
    const cached = readCache();
    writeCache({ ...cached, [section]: items });
  }, []);

  const value = useMemo(
    () => ({ content, status, reload, setSection }),
    [content, status, reload, setSection]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export default ContentProvider;
