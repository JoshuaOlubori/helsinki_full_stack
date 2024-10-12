const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  // COMPONENTS

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
          <Part partName={part.name} partExercises={part.exercises} />
        ))}
      </>
    );
  };
  //
  const Total = ({ parts }) => {
    return (
      <p>
        Total of {parts.reduce((sum, part) => sum + part.exercises, 0)}{" "}
        exercises
      </p>
    );
  };

  return (
    <div>
      <Header courseTitle={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
