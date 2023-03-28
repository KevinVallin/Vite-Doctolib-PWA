<<<<<<< HEAD
=======
import { Dialog } from '@headlessui/react';
>>>>>>> 317c1b4bd696ea0737aa4329fe73dfed59d050f9
import { DocumentData, Firestore, QuerySnapshot } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useAuthState } from '~/components/contexts/UserContext';
import { SignInButton } from '~/components/domain/auth/SignInButton';
import { SignOutButton } from '~/components/domain/auth/SignOutButton';
import { Head } from '~/components/shared/Head';
import { useFirestore } from '~/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
<<<<<<< HEAD
import { Navigate, useNavigate } from 'react-router-dom';
import { Router } from "~/components/router/Router";
=======
>>>>>>> 317c1b4bd696ea0737aa4329fe73dfed59d050f9

function Index() {

  const { state } = useAuthState();
  const firestore = useFirestore();
  const [isOpen, setIsOpen] = useState(true);
  const completeButtonRef = useRef(null);
<<<<<<< HEAD
  const [events, setEvents] = useState<[] | null>(null)
  const navigate = useNavigate();

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
=======
  const [events , setEvents] = useState<[] | null>(null)

  useEffect(() => {
    if (state.state === 'SIGNED_IN'){
      console.log("test")
      getDocs(collection(firestore, 'event')).then((qs) => {
        const evts = []
        qs.forEach(res => evts.push(res.data()))
        setEvents(evts);
      })

    } 

  },[])
>>>>>>> 317c1b4bd696ea0737aa4329fe73dfed59d050f9

  return (
    <>
      <Head title="TOP PAGE" />
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
                    {state.state === 'SIGNED_IN' && <p className="relative">{state.currentUser.uid}</p>}
                  </div>
                  <div className="relative">
                    <button className="relative btn normal-case min-w-60 bg-gradient-to-br from-cyan-700 to-orange-500" onClick={() => navigate("/myappt")}>Mes rendez-vous</button>
                  </div>
                  <div className="relative">
                    <button className="relative btn normal-case min-w-60 bg-gradient-to-br from-cyan-700 to-orange-500" onClick={() => navigate("/rma")}> Prendre un rendez-vous </button>
                  </div>
                </div>
              </div>
            </div>
<<<<<<< HEAD
          </div>
        </div>
      </div>
      <div className="hero min-h-screen dark:bg-slate-800 dark:text-white">

        <div className="mt-4 grid gap-2">
          <h1>Welcome to Doctolib </h1>
          {state.state === 'UNKNOWN' ? null : state.state === 'SIGNED_OUT' ? <SignInButton /> : <SignOutButton />}
          {state.state === 'SIGNED_IN' && <p>{state.currentUser.uid}</p>}
          <button onClick={() => setIsOpen(true)}>Display Dialog</button>
        </div>
        {events && events.map(event =>
          <p className='m-8' key={event}>
            {JSON.stringify(event)}
          </p>)}
=======
            {events && events.map(event => <p className='m-8' key={event.uid}>
              {JSON.stringify(event)}
            </p>) }
>>>>>>> 317c1b4bd696ea0737aa4329fe73dfed59d050f9
      </div>
    </>
  );
}

export default Index;
