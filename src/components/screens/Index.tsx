import { Dialog } from '@headlessui/react';
import { useRef, useState } from 'react';
import { useAuthState } from '~/components/contexts/UserContext';
import { SignInButton } from '~/components/domain/auth/SignInButton';
import { SignOutButton } from '~/components/domain/auth/SignOutButton';
import { Head } from '~/components/shared/Head';
import { useFirestore } from '~/lib/firebase';

function Index() {
  const { state } = useAuthState();
  const firestore = useFirestore();
  const [isOpen, setIsOpen] = useState(true);
  const completeButtonRef = useRef(null);

  return (
    <>
      <Head title="TOP PAGE" />
      <div className="hero min-h-screen">
            <div className="mt-4 grid gap-2">
              {state.state === 'UNKNOWN' ? null : state.state === 'SIGNED_OUT' ? <SignInButton /> : <SignOutButton />}
              {state.state === 'SIGNED_IN' && <p>{state.currentUser.uid}</p> }
              <button onClick={() => setIsOpen(true)}>Display Dialog</button>
            </div>
            {/* {state.state === 'SIGNED_IN' && firestore.} */}
      </div>
    </>
  );
}

export default Index;
