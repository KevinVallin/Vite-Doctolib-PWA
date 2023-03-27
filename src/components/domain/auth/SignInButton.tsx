import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useAuth } from "~/lib/firebase";

export const SignInButton = () => {
  const handleClick = async () => {
    const provider = new GoogleAuthProvider();
    const auth = useAuth();
    // @see https://firebase.google.com/docs/auth/web/google-signin
    auth.languageCode = "ja";

    await signInWithRedirect(auth, provider)
  };

  return (
    <button
      onClick={handleClick}
      type="button"

      className="btn normal-case min-w-60 bg-gradient-to-br from-cyan-700 to-orange-500 "
    >
      Sign In With Google
    </button>
  );
};
