import { calculateExercises } from './exerciseCalculator';

const hours = [3, 0, 2, 4.5, 0, 3, 1];
const target = 2;

const result = calculateExercises(hours, target);
console.log(result);