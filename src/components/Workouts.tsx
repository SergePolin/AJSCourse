import React, { useEffect, useState } from "react";
import { Day, Workout, WorkoutType } from "../types";
// import { fetchDays, fetchWorkouts } from "../services/api";
import ProgressCircle from "./ProgressCircle";
import NewWorkout from "./NewWorkout";
import { fetchWorkouts } from "../services/api";
import "../styles/global.scss";
import { AnimatePresence, motion } from "framer-motion";
import Add from "../assets/add_outline.svg";
import "../styles/Workouts.scss";
import JumpingRope from "../assets/jumping_rope.svg";
import Weights from "../assets/weights.svg";
import Yoga from "../assets/yoga.svg";
import Stretching from "../assets/stretching.svg";
import Cardio from "../assets/cardio.svg";
import Strength from "../assets/strength.svg";
import FullBody from "../assets/full_body.svg";
import Arms from "../assets/arms.svg";
import Legs from "../assets/legs.svg";
import Chest from "../assets/chest.svg";
import ABS from "../assets/abs.svg";
import Back from "../assets/back.svg";


const tagsMap = new Map([
    ["Jumping rope", JumpingRope],
    ["Weights", Weights],
    ["Yoga", Yoga],
    ["Stretching", Stretching],
    ["Cardio", Cardio],
    ["Strength", Strength],
    ["Full body", FullBody],
    ["Arms", Arms],
    ["Legs", Legs],
    ["Chest", Chest],
    ["Abs", ABS],
    ["Back", Back]
  ]);

const Workouts: React.FC = () => {
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [isCreateWorkoutOpen, setIsCreateWorkoutOpen] = useState<boolean>(false);

  const [clickedWorkout, setClickedWorkout] = useState<string>(); //id

  useEffect(() => {
    fetchWorkouts().then((response) => setWorkouts(response.data));
  }, []);

  useEffect(() => {
    console.log(clickedWorkout);
  }, [clickedWorkout])

  const activities = [
    { type: "Stretching", value: 20, color: "#FF6B6B" },
    { type: "Cardio", value: 30, color: "#4ECDC4" },
    { type: "Strength", value: 40, color: "#45B7D1" },
    { type: "Yoga", value: 15, color: "#FFA07A" },
  ];

  const totalHours = activities.reduce(
    (sum, activity) => sum + activity.value,
    0
  );

  return (
    <div className={`div-vertical-48 ${isCreateWorkoutOpen && "align-center"}`}>
        {!isCreateWorkoutOpen && 
        <button type="button" className="button-with-icon pointer" onClick={() => setIsCreateWorkoutOpen(prev => !prev)}>
        <img src={Add} alt="add"/>
        New workout
        </button> }
        <AnimatePresence >
          {isCreateWorkoutOpen && 
            <motion.div
              initial={{ opacity: 0, height: 0, overflow: "hidden"}}
              key="content3"
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0, overflow: "hidden"}}
              transition={{ duration: 0.5 }}
              className="shadow motion-div">
              <NewWorkout isInTraining={false} closeNewWorkout={() => setIsCreateWorkoutOpen(false)}/>
          </motion.div>
        }</AnimatePresence>
        <div className="div-vertical-24">
            <div className="workouts-header">
                <h3>Saved workouts</h3>
            </div>
            <div className="workouts-grid">
                {Array.isArray(workouts) && workouts.map(workout => <div key={workout.id} className={`workout shadow pointer ${clickedWorkout === workout.id ? "chosen-workout" : ""}`} onClick={() => clickedWorkout === workout.id ? setClickedWorkout(null) : setClickedWorkout(workout.id)}>
                    <h4>{workout.title}</h4>
                    {clickedWorkout !== workout.id ?
                    <>{Array.isArray(workout.tags) && workout.tags.length !== 0 && <div className="div-horizontal-16 align-end">
                        {workout.tags.slice(0, 4).map(( tag => <img className="tag-img pointer" key={tag} src={tagsMap.get(tag)} alt={tag}/>))}
                        {workout.tags.length > 4 && <h4>...</h4>}
                    </div>}
                    <h4>Exercises</h4>
                    <table className="div-vertical-8 exercise-table">
                        <tbody>{workout.exercises && workout.exercises.slice(0, 3).map((exercise, index) => 
                            <tr key={`${exercise.title} clicked`}>
                                <td className="td1">{index + 1}.</td>
                                <td className="td2">{exercise.title}</td>
                                <td className="td3">{exercise.repsOrDuration} {exercise.isTimeBased ? "min" : "reps"}</td>
                                {!isNaN(exercise.weight) && <td className="td4">{exercise.weight} kg</td>}
                            </tr>)
                        }
                        {workout.exercises.length > 3 && <tr><h4>...</h4></tr>}
                        </tbody>
                    </table></>
                        :
                        <div className="div-horizontal-20 align-start">

                    {Array.isArray(workout.tags) && workout.tags.length !== 0 && <div className="tags-div">
                        {workout.tags.map(tag => { 
                                return (
                                <div 
                                    key={tag} 
                                    className="tag pointer" 
                                >
                                    <img className="tag-img" src={tagsMap.get(tag)} alt={tag}/>
                                    <span className="tag-title">{tag}</span>
                                </div>
                                );
                            })}
                    </div>}
                    <div className="div-vertical-16"><h4>Exercises</h4>
                    <table className="div-vertical-8 exercise-table">
                        <tbody>{workout.exercises && workout.exercises.map((exercise, index) =>
                            <tr key={exercise.title + index}>
                                <td className="td1">{index + 1}.</td>
                                <td className="td2">{exercise.title}</td>
                                <td className="td3">{exercise.repsOrDuration} {exercise.isTimeBased ? "min" : "reps"}</td>
                                {!isNaN(exercise.weight) && <td className="td4">{exercise.weight} kg</td>}
                            </tr>)
                        }
                        </tbody>
                    </table>
                    </div>
                    </div>}
                    
                </div>)}
            </div>
            
        </div>
    </div>
    // <div className="reports">
    //   {/* <NewWorkout isInTraining={false}/> */}

      
    //   {activities.length > 0 && (
    //     <ProgressCircle
    //       activities={activities}
    //       total={totalHours}
    //       period="Monthly"
    //     />
    //   )}
    //   {/* Other report components */}
    // </div>
  );
};

export default Workouts;
