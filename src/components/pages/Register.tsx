import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

//interface
interface IState {
  email: string;
  password: string;
  password_confirmation: string;
}
const Register = () => {
  //context vars and functions
  const { loading, register, error } = useContext(AuthContext);
  //state
  const [inputs, setInputs] = useState<IState>({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [inputsError, setInputsError] = useState<boolean>(false);
  const handleInputChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      inputs.email === "" ||
      inputs.password === "" ||
      inputs.password_confirmation === ""
    ) {
      setInputsError(true);
    } else {
      register(inputs);
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
              coudn't process , please try again.
            </div>
          )}
          <div className="card">
            <div className="card-header">Register</div>
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
                  <label htmlFor="password">Password Confirmation</label>
                  <input
                    type="password"
                    name="password_confirmation"
                    className="form-control"
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value={`${loading ? "Loading ..." : "Register"}`}
                    className="btn btn-success"
                  />
                </div>
                <div className="form-group">
                  <p className="m-0">
                    already have an account ? <a href="/">Login</a>
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

export default Register;
