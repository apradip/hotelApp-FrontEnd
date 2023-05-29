import { useEffect, useState } from "react";

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
            {timeElapsed &&  `${timeElapsed.days > 0 ? timeElapsed.days + " days" : timeElapsed.hours > 0 ? timeElapsed.hours + " hours" : timeElapsed.minutes > 0 ? timeElapsed.minutes + " minutes" : "0 minut"} ago`}
        </span>
    )
}
// End:: Component


export default TimeElapsed;