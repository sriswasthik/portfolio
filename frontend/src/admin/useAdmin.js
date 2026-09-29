import { useUser } from "@clerk/react";
import { ADMIN_EMAIL } from "../lib/api";

// The API makes the same check before accepting any change; this one only
// decides what the admin pages show.
export default function useAdmin() {
  const { isLoaded, isSignedIn, user } = useUser();

  const authorized = Boolean(
    user?.emailAddresses.some(
      (e) =>
        e.emailAddress.toLowerCase() === ADMIN_EMAIL &&
        e.verification?.status === "verified"
    )
  );

  return {
    isLoaded,
    isSignedIn,
    authorized,
    email: user?.primaryEmailAddress?.emailAddress ?? "",
  };
}
