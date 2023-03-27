import { DocumentData, Firestore, QuerySnapshot } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useAuthState } from '~/components/contexts/UserContext';
import { SignInButton } from '~/components/domain/auth/SignInButton';
import { SignOutButton } from '~/components/domain/auth/SignOutButton';
import { Head } from '~/components/shared/Head';
import { useFirestore } from '~/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';


function Rma() {

    const { state } = useAuthState();
    const firestore = useFirestore();
    const [isOpen, setIsOpen] = useState(true);
    const completeButtonRef = useRef(null);
    const [events, setEvents] = useState<[] | null>(null)
  
    useEffect(() => {
        if (state.state === 'SIGNED_IN') {
          console.log("test")
          getDocs(collection(firestore, 'event')).then((qs) => {
            const evts: Event[] = []
            const [events, setEvents] = useState<Event[] | null>(null);
            qs.forEach(res => evts.push(res.data() as Event))
            setEvents(evts);
            console.log(JSON.stringify(evts))
          }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log("$error")
            navigator.vibrate([
              100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100,
            ]);
          })
    
        }
    
      }, [])

      
    return (
        < >
            <div className="min-h-screen dark:bg-slate-800 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-700 to-orange-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold">Welcome to Doctolib</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                    </div>
                                    <div className="relative">
                                    </div>
                                    <div className="relative">
                                        {state.state === 'UNKNOWN' ? null : state.state === 'SIGNED_OUT' ? <SignInButton /> : <SignOutButton />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Rma;