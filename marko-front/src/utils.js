
import { useSelector } from "react-redux" ;

// this is a custom hook 
export const  IsLoggedIn = () => {
       const  loggedin   = useSelector ( state => state.auth.loggedin )  ;
       return loggedin ;
}



// export isLoggedIn ;