import React, { useState } from "react";
import { NavLink , useNavigate } from "react-router-dom";
function Signup() {
  const [inputHandler, setInputHandler] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const history = useNavigate()

  const onChangeInputHandler = (e) => {
    const { name, value } = e.target;

    setInputHandler(() => {
      return { ...inputHandler, [name]: value };
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = inputHandler;

    if (name === "") {
      alert("Enter your Full Name");
    } else if (email === "") {
      alert("Enter your Email");
    } else if (password === "") {
      alert("Enter your Password");
    } else if (confirmPassword === "") {
      alert("Enter your confirm Password");
    } else if (password !== confirmPassword) {
      alert("password & confirm Password does not matched !");
    } else {

      const data = await fetch("http://localhost:8006/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          name , email , password , confirmPassword
        })
      });

      const res =await  data.json()
     
        
      if(res.status === 200){
        setInputHandler({...inputHandler , name:"" , email :"" , password:"" , confirmPassword:""})
            history('/')
      }
    }
  };

  return (
    <div>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Signup</h1>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                onChange={onChangeInputHandler}
                value={inputHandler.name}
                id="name"
                name="name"
                placeholder="Full Name"
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={onChangeInputHandler}
                value={inputHandler.email}
                id="email"
                name="email"
                placeholder="Enter your Email"
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
            <div className="form_input">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                onChange={onChangeInputHandler}
                value={inputHandler.confirmPassword}
                name="confirmPassword"
                placeholder="Confirm Password"
              />
            </div>

            <button className="btn" onClick={onSubmitHandler}>
              Signup
            </button>
            <p>
              Already Have Account ?<NavLink to="/">Login</NavLink>{" "}
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Signup;
