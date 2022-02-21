import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchWorkout } from "../../hooks/useFetch";
import Strength from "../../images/stregnth.png";
import Cardio from "../../images/cardio.png";
const View = () => {
  //states
  const [workout, setWorkout] = useState<any>({});
  const id = useParams().id;
  const init = async () => {
    const fetchedWorkout = await fetchWorkout(id);
    setWorkout(fetchedWorkout);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="container mt-5">
      {Object.entries(workout).length > 0 && (
        <div className="row">
          <div className="col-12 col-md-6 offset-md-3">
            <div className="workout-img text-center shadow py-4 mb-4">
              <img
                src={
                  workout.workout.workout_type === "strength"
                    ? Strength
                    : Cardio
                }
                alt="workout logo"
                width={200}
              />
            </div>
            <div className="workout-exercises text-success">
              {workout.exercises.map((exercise: any) => (
                <div className="single-exercise">
                  <div className="types d-flex align-items-center justify-content-between mb-2">
                    <p className="m-0">
                      {workout.workout.workout_type === "strength"
                        ? "Exercise"
                        : "Type"}
                    </p>
                    <p className="m-0">
                      {workout.workout.workout_type === "strength"
                        ? "Sets"
                        : "Distance"}
                    </p>
                    <p className="m-0">
                      {workout.workout.workout_type === "strength"
                        ? "Reps"
                        : "Duration"}
                    </p>
                    <p className="m-0">
                      {workout.workout.workout_type === "strength"
                        ? "Weight (LB)"
                        : "Pace"}
                    </p>
                  </div>
                  <div className="types d-flex align-items-center justify-content-between mb-2">
                    <p className="m-0">{exercise.input - 1}</p>
                    <p className="m-0">{exercise.input - 2}</p>
                    <p className="m-0">{exercise.input - 3}</p>
                    <p className="m-0">{exercise.input - 4}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default View;
