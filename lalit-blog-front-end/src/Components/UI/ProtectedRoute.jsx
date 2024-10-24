
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children})=>{
    const token = sessionStorage.getItem("token");
    // console.log(token,"sdfjashd")
    if(!token){
        return <Navigate to={'/login'}/>;
    }
    return children
}
export default ProtectedRoute;