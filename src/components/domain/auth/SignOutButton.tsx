import { useAuth } from "~/lib/firebase";

type Props = {};

export const SignOutButton = (props: Props) => {
  const handleClick = () => {
    const auth = useAuth();
    auth.signOut();
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="btn normal-case bg-gradient-to-br from-cyan-700 to-orange-500"
    >
      Sign Out
    </button>
  );
};
