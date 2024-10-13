const Header = ({ courseTitle }) => {
  return <h1>{courseTitle}</h1>;
};
//
const Part = ({ partName, partExercises }) => {
  return (
    <div>
      <span>{partName}</span> <span>{partExercises}</span>
    </div>
  );
};
//
const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part
          key={part.name}
          partName={part.name}
          partExercises={part.exercises}
        />
      ))}
    </>
  );
};
//
const Total = ({ parts }) => {
  return (
    <b>
      Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
    </b>
  );
};

const CourseItem = ({ course }) => {
  return (
    <div>
      <Header courseTitle={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <CourseItem key={course.id} course={course} />
      ))}
    </>
  );
};

export default Course;
