import axios from "axios";

//fetching the list of workouts in the index page
export const fetchWorkouts = async () => {
  try {
    const {
      data: { workouts },
    } = await axios.get(`${process.env.REACT_APP_API_URL}/workouts`);
    return workouts.map((workout: any) => workout);
  } catch (error) {
    console.log(error);
  }
};
//fetching specific workout detailes and its exercises
export const fetchWorkout = async (id: any) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/workout/${id}`
    );
    return data
  } catch (error) {
    console.log(error);
  }
};
