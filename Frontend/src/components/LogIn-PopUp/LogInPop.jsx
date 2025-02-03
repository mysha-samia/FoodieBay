import React, { useEffect,useState,useContext } from "react";
import "./LogInPop.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
const LogInPop = ({ setshowLogin }) => {
  const {url,setToken} = useContext(StoreContext);
  const [currState, setcurrState] = useState("LogIn");
  //states to svae the user name and data
  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  });
  const onChangeHandler =(event)=>{
    const name = event.target.name;
    const value =event.target.value;
    setData(data=>({
      ...data,[name]:value
    }))
  }
  const logIn =async(event)=>{
   event.preventDefault();
   let newUrl = url;
   if(currState==="LogIn"){
    newUrl = newUrl+"/api/user/login";
   }
   else
   {
    newUrl = newUrl+"/api/user/register";
   }
   const response = await axios.post(newUrl,data);
   if(response.data.success){
    setToken(response.data.token);
    localStorage.setItem("token",response.data.token);
    setshowLogin(false);
   }
   else{
    alert(response.data?.message || "Login failed!");
   }
  }
  
  useEffect(()=>{
  console.log(data);
  },[data])

  return (
    <div className="login-popup">
      <form onSubmit={logIn} className="login-popup-container">
        <div className="Login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setshowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-input">
        {currState === "LogIn" ? (
          <></>
        ) : (
          <>
            <label htmlFor="user-name">User Name</label>
            <input
              type="text"
              placeholder="Your Name"
              id="user-name"
              name="name"
              onChange={onChangeHandler}
              value={data.name}

              required
            />
          </>
        )}

        <label htmlFor="email">Email</label>
        <input
          type="email" 
          placeholder="Your Email"  
          name="email"
          onChange={onChangeHandler}
          value={data.email} 
          id="email" required />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Your Password"
          id="password"
          name="password"
          onChange={onChangeHandler}
          value={data.password}
          required
        />
        </div>
        <button type="submit">
          {currState === "SignUp" ? "Create New Account" : "LogIn"}
        </button>
        <div className="login-popup-conditions">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Agree Terms & Conditions
          </label>
        </div>
        {currState === "LogIn" ? (
          <p>
            create a new account? <span onClick={()=>setcurrState('SignUp')}>Click Here</span>
          </p>
        ) : (
          <p>
            Already Have an account? <span onClick={()=>setcurrState('LogIn')}>LogIn</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LogInPop;
