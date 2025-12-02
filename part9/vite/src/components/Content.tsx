import React from 'react';
import type {  CoursePart } from './CoursePart';
import Part from './Part';

type ContentProps = {
  parts: CoursePart[];
};

const Content: React.FC<ContentProps> = ({ parts }) => (
  <>
    {parts.map((part, index) => (
      <Part key={index} part={part} />
    ))}
  </>
);

export default Content;
