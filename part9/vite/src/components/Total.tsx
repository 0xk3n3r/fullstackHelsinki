import React from 'react';

type TotalProps = {
  totalExercises: number;
};

const Total: React.FC<TotalProps> = ({ totalExercises }) => (
  <p>Number of exercises {totalExercises}</p>
);

export default Total;
