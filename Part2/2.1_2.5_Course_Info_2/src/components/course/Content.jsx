import { Parts } from "./Parts";
import { ExercisesTotal } from "./ExercisesTotal";

export const Content = ({ courses }) => {
  return (
    <>
      <h2>Courses</h2>
      {courses.map((course) => (
        <div key={'d'+course.id}>
            <h3>{course.name}</h3>
            <Parts parts={course.parts}/>
            <ExercisesTotal parts={course.parts}/>
        </div>
      ))}

    </>
  );
};
