import React from 'react';
import type {  CoursePart, CoursePartSpecial } from './CoursePart';

interface PartProps {
  part: CoursePart;
}

const Part: React.FC<PartProps> = ({ part }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Description: {part.description}</p>
        </div>
      );
    case 'group':
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Group project count: {part.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Description: {part.description}</p>
          <p>Background material: {part.backgroundMaterial}</p>
        </div>
      );
    case 'special':
      const sp = part as CoursePartSpecial;
      return (
        <div>
          <h3>{sp.name}</h3>
          <p>Exercises: {sp.exerciseCount}</p>
          <p>Description: {sp.description}</p>
          <p>Requirements: {sp.requirements.join(', ')}</p>
        </div>
      );
    default:
      return null; 
  }
};

export default Part;
