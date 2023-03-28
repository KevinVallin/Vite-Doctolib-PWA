import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../App"
import { createEvent } from "ics"
import { saveAs } from "file-saver"


function MyAppt() {

    const date = useRef()


    const [appointmentsList, setAppointmentsList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [doctorsList, setDoctorsList] = useState([])

    const fetchData = async () => {
        const q = query(collection(db, 'appointments'), where("idPatient", "==", params.idPatient))
        const records = await getDocs(q)
        return records
    }

    const fetchUserData = async () => {
        const q = query(collection(db, 'patients'), where('id', '==', params.idPatient))
        const records = await getDocs(q)
        return records
    }

    const fetchDoctorData = async () => {
        const q = collection(db, 'doctors')
        const records = await getDocs(q)
        return records
    }

    const exportICSAppointment = (i) => {
        createEvent({
            start: [parseInt(appointmentsList[i].date.slice(0, 4)), parseInt(appointmentsList[i].date.slice(5, 7)), parseInt(appointmentsList[i].date.slice(8, 10)), parseInt(appointmentsList[i].date.slice(11, 13)), parseInt(appointmentsList[i].date.slice(14, 16))],
            duration: { hours: 0, minutes: 30 },
            title: `Rendez-vous médical`,
            description: '',
            location: '',
            geo: {},
            categories: [],
            status: 'CONFIRMED',
            busyStatus: 'BUSY',
            organizer: { name: userName, email: userEmail },
            attendees: []
        }, (err, value) => {
            if (err) {
                console.log(err)
            } else {
                const event = new Blob([value], { type: "text/plain;charset=utf-8" })
                saveAs(event, `export-rdv-${appointmentsList[i].date}.ics`)
            }
        })
    }

    useEffect(() => {
        fetchData().then((response) => {
            let tmpList = []
            response.forEach((res) => {
                console.log(JSON.stringify(res.data()))
                tmpList.push(res.data())
            })
            console.log(tmpList)
            setAppointmentsList(tmpList)
        })
        fetchUserData().then((response) => {
            let tmpName = ''
            let tmpEmail = ''
            response.forEach((result) => {
                console.log(JSON.stringify(result.data()))
                tmpName = result.data().name
                tmpEmail = result.data().email
            })
            setUserName(tmpName)
            setUserEmail(tmpEmail)
        })
        fetchDoctorData().then((response) => {
            let tmpList = []
            response.forEach((res) => {
                console.log(JSON.stringify(res.data()))
                tmpList.push(res.data())
            })
            console.log(tmpList)
            setDoctorsList(tmpList)
        })
        setIsLoading(false)
    }, [])

    return (
        <div className="min-h-screen dark:bg-slate-800 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-700 to-orange-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Vos Rendez-vous</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                {!isLoading ? appointmentsList.map((elem, index) => {
                                    return (
                                        <div key={index} name={elem.id} className="appointmentCard" onClick={() => exportICSAppointment(index)} >
                                            <p className="appointmentName" >{elem.date.slice(0, 10)} - {elem.date.slice(11, 16)}</p>
                                        </div>
                                    )
                                }) : <div></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}