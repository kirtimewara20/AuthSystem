import React, { useState } from "react";
import { NavLink , useNavigate } from "react-router-dom";
import "./mix.css";
function Login() {

   const [inputHandler , setInputHandler] = useState({
    email:"",
    password:"",
   })

   const history = useNavigate();
  
   const onChangeInputHandler = (e) =>{
     const {name , value} = e.target;
 
  setInputHandler(()=>{
    return {
        ...inputHandler , [name] :value
    }
  })
   }

   const onSubmitHandler = async(e) =>{
    e.preventDefault();

    const {email , password} = inputHandler;
    if(email === ""){
        alert("Enter Email")
    }else if(password===''){
        alert("Enter password");
    }else {
        const data = await fetch("http://localhost:8006/login",{
          method:"POST" , 
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            email , password
          })
        })

        const res = await data.json()
        
             if(res.message !== null){
              alert(res.message)
             }

        if(res.status === 200){
            localStorage.setItem("usersDataToken" , res.token)
            history("/dashboard")
        setInputHandler({...inputHandler,email:"" , password:""})  
        }
    }
   }


  return (
    <div>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Login</h1>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={onChangeInputHandler}
                value={inputHandler.email}
                id="email"
                name="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={onChangeInputHandler}
                value={inputHandler.password}
                id="password"
                name="password"
                placeholder="Password"
              />
            </div>

            <button className="btn" onClick={onSubmitHandler}>Login</button>
            <p>Create Account ? <NavLink history='/signup'>Signup</NavLink> </p>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
