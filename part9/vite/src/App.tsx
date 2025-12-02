import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';
import type {  CoursePart } from './components/CoursePart';

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is a basic course",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Advanced concepts",
    backgroundMaterial: "https://background.com",
    kind: "background"
  },
  {
        name: "Backend development",
        exerciseCount: 21,
        description: "Typing the backend",
        requirements: ["nodejs", "jest"],
        kind: "special"
      }
];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
