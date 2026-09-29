import { SignIn, useClerk } from "@clerk/react";
import { Navigate } from "react-router-dom";
import useAdmin from "../admin/useAdmin";

function Login() {
  const { isLoaded, isSignedIn, authorized, email } = useAdmin();
  const { signOut } = useClerk();

  if (isLoaded && isSignedIn && authorized) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <>
      <title>Admin Login — Sri Swasthik</title>

      <header className="page-header">
        <h1 className="page-title">Admin login</h1>
        <p className="page-lead">Only the site owner's account can sign in.</p>
      </header>

      <div className="page-body">
        {!isLoaded ? (
          <p className="status-text" role="status">
            Loading…
          </p>
        ) : isSignedIn ? (
          // Signed in to Clerk, but not with the admin address.
          <div className="admin-denied narrow" role="alert">
            <p>
              <strong>{email || "This account"}</strong> isn't authorized to
              manage this site.
            </p>
            <button
              type="button"
              className="button"
              onClick={() => signOut({ redirectUrl: "/login" })}
            >
              Sign out and use another account
            </button>
          </div>
        ) : (
          <SignIn
            routing="path"
            path="/login"
            withSignUp={false}
            fallbackRedirectUrl="/admin"
          />
        )}
      </div>
    </>
  );
}

export default Login;
