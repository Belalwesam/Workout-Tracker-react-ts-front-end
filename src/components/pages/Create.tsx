import { useState, useContext, useEffect } from "react";
import Trash from "../../images/trash-light-green.png";
import { WorkoutsContext } from "../../context/WorkoutsContext";
//interface
interface IExercises {
  exercises: {
    [key: string]: any;
    input_1: string;
    input_2: string;
    input_3: string;
    input_4: string;
  }[];
  info: {
    workout_name: string;
    workout_type: string;
  };
}

//functional component
const Create = () => {
  //context vars and functions
  const { loading, createWorkout, success, fail } = useContext(WorkoutsContext);
  //states
  const [workoutInfo, setWorkoutInfo] = useState<IExercises["info"]>({
    workout_name: "",
    workout_type: "",
  });
  const [empty, setEmpty] = useState<boolean>(false);
  const [exercises, setExercises] = useState<IExercises["exercises"]>([]);
  const [lengthError, setLengthError] = useState(false);
  //handle workout name and type change
  const handleInfoChange = (e: any) => {
    setWorkoutInfo({ ...workoutInfo, [e.target.name]: e.target.value });
    if (e.target.name === "workout_type") {
      if (workoutInfo.workout_name === "") {
        setWorkoutInfo({ ...workoutInfo, workout_type: "" });
        setEmpty(true);
        return;
      }
      if (exercises.length === 0) {
        setExercises([{ input_1: "", input_2: "", input_3: "", input_4: "" }]);
      } else {
        return;
      }
    }
  };
  //handle adding a new exercise row
  const addExerciseRow = (e: any) => {
    e.preventDefault();
    setExercises([
      ...exercises,
      { input_1: "", input_2: "", input_3: "", input_4: "" },
    ]);
  };
  const deleteExerciseRow = (e: any, index: number) => {
    e.preventDefault();
    if (exercises.length === 1) {
      setLengthError(true);
      return;
    }
    //copy the array and then remove element
    let values = [...exercises];
    //this returns the last element removed or replaced
    values.splice(index, 1);
    setExercises(values);
  };
  //handle exercise input change
  const handleExerciseInputChange = (e: any, index: number) => {
    const values = [...exercises];
    values[index][e.target.name] = e.target.value;
    setExercises(values);
  };

  //handle submitting the form (adding a new workout)
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (workoutInfo.workout_name === "" || workoutInfo.workout_type === "") {
      setEmpty(true);
    } else {
      createWorkout({
        workout_name: workoutInfo.workout_name,
        workout_type: workoutInfo.workout_type,
        exercises,
      });
    }
  };
  const reset = () => {
    workoutInfo.workout_name = "";
    workoutInfo.workout_type = "";
    exercises.length = 0;
  };
  useEffect(() => {
    reset();
  }, [success]);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3 bg-light p-4 shadow">
          {empty && (
            <div className="alert alert-danger shadow">
              please fill all the fields
            </div>
          )}
          {success && (
            <div className="alert alert-success shadow">
              Workout Created Successfully.
            </div>
          )}
          {fail && (
            <div className="alert alert-danger shadow">
              Workout couldn't be created Successfully.
            </div>
          )}
          {lengthError && (
            <div className="alert alert-danger shadow">
              A workout must have at least 1 exercise.
            </div>
          )}
          <h3>Workout Tracker</h3>
          <form
            action="#"
            className="text-success"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="form-group">
              <label htmlFor="workout_name">Workout Name</label>
              <input
                value={workoutInfo.workout_name}
                type="text"
                name="workout_name"
                className="form-control"
                onChange={(e) => handleInfoChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="workout_type">Workout Type</label>
              <select
                required
                name="workout_type"
                className="form-control"
                onChange={(e) => handleInfoChange(e)}
                value={workoutInfo.workout_type}
              >
                <option value="">Please select</option>
                <option value="strength">Strength</option>
                <option value="cardio">Cardio</option>
              </select>
            </div>
            {exercises.length > 0
              ? exercises.map((exercise, index) => (
                  <div className="form-group form-grid-container" key={index}>
                    <div className="delete-container">
                      <button onClick={(e) => deleteExerciseRow(e, index)}>
                        <img src={Trash} alt="delete icon" width={15} />
                      </button>
                    </div>
                    <div className="form-grid-item">
                      <label htmlFor="input-1">
                        {workoutInfo.workout_type === "strength"
                          ? "Exercise"
                          : "Type"}
                      </label>
                      {workoutInfo.workout_type === "strength" ? (
                        <input
                          required
                          type="text"
                          name="input_1"
                          className="form-control"
                          onChange={(e) => handleExerciseInputChange(e, index)}
                          value={exercise.input_1}
                        />
                      ) : (
                        <select
                          required
                          name="input_1"
                          onChange={(e) => handleExerciseInputChange(e, index)}
                          className="form-control"
                          value={exercise.input_1}
                        >
                          <option value="">Select</option>
                          <option value="run">Runs</option>
                          <option value="walk">Walk</option>
                        </select>
                      )}
                    </div>
                    <div className="form-grid-item">
                      <label htmlFor="input-2">
                        {workoutInfo.workout_type === "strength"
                          ? "Sets"
                          : "Distance"}
                      </label>
                      <input
                        type="text"
                        required
                        name="input_2"
                        className="form-control"
                        onChange={(e) => handleExerciseInputChange(e, index)}
                        value={exercise.input_2}
                      />
                    </div>
                    <div className="form-grid-item">
                      <label htmlFor="input-3">
                        {workoutInfo.workout_type === "strength"
                          ? "Reps"
                          : "Duration"}
                      </label>
                      <input
                        type="text"
                        required
                        name="input_3"
                        className="form-control"
                        onChange={(e) => handleExerciseInputChange(e, index)}
                        value={exercise.input_3}
                      />
                    </div>
                    <div className="form-grid-item">
                      <label htmlFor="input-4">
                        {workoutInfo.workout_type === "strength"
                          ? "Weight (LB's)"
                          : "Pace"}
                      </label>
                      <input
                        type="text"
                        required
                        name="input_4"
                        className="form-control"
                        onChange={(e) => handleExerciseInputChange(e, index)}
                        value={exercise.input_4}
                      />
                    </div>
                  </div>
                ))
              : ""}
            {exercises.length > 0 ? (
              <div className="form-group">
                <button
                  onClick={(e) => addExerciseRow(e)}
                  className="btn btn-success"
                >
                  Add Exercise
                </button>
              </div>
            ) : (
              ""
            )}
            <div className="form-group">
              <input
                type="submit"
                value={`${loading ? "loading ..." : "Recored Workout"}`}
                className="btn btn-success"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Create;
