const { clerkClient, getAuth } = require("@clerk/express");

// Only this address may edit content. The check runs on the server: the
// admin UI hides itself for other accounts, but that is not what protects data.
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "sriswasthik006@gmail.com").toLowerCase();

// Clerk user lookups are cached briefly so each save doesn't hit their API.
const CACHE_MS = 5 * 60 * 1000;
const verdicts = new Map();

async function isAdmin(userId) {
  const cached = verdicts.get(userId);
  if (cached && cached.expires > Date.now()) return cached.ok;

  const user = await clerkClient.users.getUser(userId);
  // The address must be verified, or anyone could add it unverified to their account.
  const ok = user.emailAddresses.some(
    (e) =>
      e.emailAddress.toLowerCase() === ADMIN_EMAIL &&
      e.verification?.status === "verified"
  );

  verdicts.set(userId, { ok, expires: Date.now() + CACHE_MS });
  return ok;
}

async function requireAdmin(req, res, next) {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Sign in required" });

  try {
    if (!(await isAdmin(userId))) {
      return res.status(403).json({ error: "This account is not authorized" });
    }
    next();
  } catch (err) {
    console.error("Admin check failed:", err);
    res.status(500).json({ error: "Could not verify account" });
  }
}

module.exports = { requireAdmin };
