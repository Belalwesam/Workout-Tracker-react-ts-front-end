import React from "react";
import { useEffect, useState } from "react";
import { fetchWorkouts } from "../../hooks/useFetch";
import Strength from "../../images/stregnth.png";
import { Link } from "react-router-dom";
import Cardio from "../../images/cardio.png";
const Home = () => {
  const [workouts, setWorkouts] = useState<any>([]);
  const init = async () => {
    const fetchedWorkouts = await fetchWorkouts();
    setWorkouts(fetchedWorkouts);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="container mt-5">
      {workouts.length > 0 ? (
        <div className="row">
          {workouts.map((workout: any) => (
            <div className="col-12 col-md-4 shadow p-4 rounded text-center d-flex align-items-center justify-content-center mb-4">
              <div className="single-workout ">
                <img
                  src={workout.workout_type === "strength" ? Strength : Cardio}
                  alt="workout logo"
                  width={100}
                />
                <div>
                  <div className="badge rounded-pill bg-success p-2 my-3 text-white">
                    {workout.workout_type}
                  </div>
                </div>
                <h5 className="text-success">
                  <Link to={`/view-workout/${workout.id}`}>{workout.workout_name}</Link>
                </h5>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-center">Loading ...</h1>
      )}
    </div>
  );
};
export default Home;
