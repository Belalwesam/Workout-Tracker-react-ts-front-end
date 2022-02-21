import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
//interface
interface IInputs {
  email: string;
  password: string;
}
const Login = () => {
  //context vars and function importing
  const { laoding, login, error } = useContext(AuthContext);

  //states
  const [inputs, setInputs] = useState<IInputs>({ email: "", password: "" });
  const [inputsError, setInputsError] = useState<boolean>(false);

  //my defined functions
  //handle input change
  const handleInputChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  //handle form submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (inputs.email === "" || inputs.password === "") {
      setInputsError(true);
      return;
    } else {
      login(inputs);
    }
  };
  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
          {inputsError && (
            <div className="alert alert-danger">please fill all the fields</div>
          )}
          {error && (
            <div className="alert alert-danger">
              couldn't complete , please try again.
            </div>
          )}
          <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body">
              <form action="#" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                  <label htmlFor="e-mail">E-mail</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Login"
                    className="btn btn-success"
                  />
                </div>
                <div className="form-group">
                  <p className="m-0">
                    don't have an account ? <a href="/">Register</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
