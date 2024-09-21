const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  // COMPONENTS

  const Header = (props) => {
    return <h1>{props.courseTitle}</h1>;
  };
  //
  const Part = (props) => {
    return (
      <div>
        <span>{props.part.name}</span> <span>{props.part.exercises}</span>
      </div>
    );
  };
  //
  const Content = (props) => {
    return (
      <>
        <Part part={props.parts[0]} />
        <Part part={props.parts[1]} />
        <Part part={props.parts[2]} />
      </>
    );
  };
  //
  const Total = (props) => {
    return (
      <p>
        Number of exercises{" "}
        {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
      </p>
    );
  };

  return (
    <div>
      <Header courseTitle={course.name} />
      <Content
        parts={course.parts}
        // // exercises1={exercises1}
        //  part2={part2}
        // // exercises2={exercises2}
        //  part3={part3}
        // // exercises3={exercises3}
      />
      <Total
       parts={course.parts}
      />
    </div>
  );
};

export default App;
