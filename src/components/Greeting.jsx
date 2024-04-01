import { useLocation } from "react-router-dom";

const Greeting = () => {
     const location = useLocation();
     const username = location.state?.username;
     const name = username;

     const getcurrenttime = (() => {
          var Time = new Date();
          return (Time.getHours());
     })

     const getgreeting = (() => {
          var time = getcurrenttime();
          var greeting = "";
          if ((time > 4) && (time < 12))
               greeting = "Morning";
          else if ((time >= 12) && (time < 16))
               greeting = "Afternoon";
          else if((time >= 16)&&(time < 20))
               greeting = "Evening";
          else
               greeting = "Night";

          return("Good "+greeting)
     })

     return (
          <div className="greeting">
               {getgreeting()} {name}
          </div>
     )
}

export default Greeting
