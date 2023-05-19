import { useEffect, useState } from "react";
//import { toast } from "react-toastify";

//import { HotelId } from "../../App";
//import { useStateContext } from "../../contexts/ContextProvider";
//import useFetchWithAuth from "./useFetchWithAuth";


// Start:: Component
// props parameters
// pInDate
// pInTime

const TimeElapsed = ({pInDate, pInTime}) => {    
    const [timeElapsed, setTimeElapsed] = useState()

    const calculateTimeElapsed = () => {
        let timeElapsed = {}
        const difference = new Date() - new Date(pInDate + " " + pInTime)
    
        if (difference > 0) {
            timeElapsed = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            }
        }
    
        return timeElapsed
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeElapsed(calculateTimeElapsed())
        }, 1000)
    
        return () => clearTimeout(timer)
    })

    return (
        <span style={{color:"#708090"}}> 
            Time elapsed : {timeElapsed && `${timeElapsed.days} : ${timeElapsed.hours} : ${timeElapsed.minutes} : ${timeElapsed.seconds}`}
        </span>
    )
}
// End:: Component


export default TimeElapsed;