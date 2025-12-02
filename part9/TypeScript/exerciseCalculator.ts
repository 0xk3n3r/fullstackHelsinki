interface ExerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: 1 | 2 | 3
  ratingDescription: string
  target: number
  average: number
}


export const calculateExercises = (dailyHours: number[], target: number): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hour => hour > 0).length;
  const totalHours = dailyHours.reduce((sum, hour) => sum + hour, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating: 1 | 2 | 3;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'excellent work, target achieved!';
  } else if (average >= target * 0.7) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'you need to put in more effort';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}