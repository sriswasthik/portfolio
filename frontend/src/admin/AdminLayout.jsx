import { ClerkProvider } from "@clerk/react";
import { Outlet, useNavigate } from "react-router-dom";
import { clerkAppearance } from "./clerkAppearance";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Wraps /login and /admin only, so public pages never load Clerk.
function AdminLayout() {
  const navigate = useNavigate();

  if (!PUBLISHABLE_KEY) {
    return (
      <header className="page-header">
        <h1 className="page-title">Admin</h1>
        <p className="page-lead">
          Sign-in isn't configured. Set <code>VITE_CLERK_PUBLISHABLE_KEY</code> and
          rebuild.
        </p>
      </header>
    );
  }

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={clerkAppearance}
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      signInUrl="/login"
      signInFallbackRedirectUrl="/admin"
      afterSignOutUrl="/login"
    >
      <meta name="robots" content="noindex" />
      <Outlet />
    </ClerkProvider>
  );
}

export default AdminLayout;
