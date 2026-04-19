import axiosInstance from "../config/axiosInstance.js";
import { logout } from "../store/slice/authslice.js"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Logout() {
  const navigate = useNavigate()
   const dispatch = useDispatch();
   const logoutHandler = async ()=>{
    const response = await axiosInstance.post("/api/v1/user/logout");
    console.log("logout ...")
    
        dispatch(logout());
        localStorage.removeItem("auth")
       localStorage.removeItem("user")

       navigate("/login")
    

  }

  return (
    <div>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default Logout
