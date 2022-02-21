import { useState, createContext } from "react";
import axios from "axios";
export const WorkoutsContext = createContext({} as any);
//interfaces
interface IPayload {
  workout_name: string;
  workout_type: string;
  exercises: {
    input_1: string;
    input_2: string;
    input_3: string;
    input_4: string;
  }[];
}
const WorkoutsContextProvider = (props: any) => {
  //state
  const [success, setSuccess] = useState<boolean>(false);
  const [fail, setFail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  //functions
  const createWorkout = (payload: IPayload) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/store`,
        {
          workout_name: payload.workout_name,
          workout_type: payload.workout_type,
          exercises: payload.exercises,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => setSuccess(true))
      .catch((error) => setFail(true))
      .finally(() => setLoading(false));
  };
  const value = {
    loading,
    success,
    fail,
    createWorkout,
  };
  return (
    <WorkoutsContext.Provider value={value}>
      {props.children}
    </WorkoutsContext.Provider>
  );
};
export default WorkoutsContextProvider;
