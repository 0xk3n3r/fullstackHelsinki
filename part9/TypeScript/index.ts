import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
})

app.get('/bmi', (req, res) => {
    if (!('height' in req.query && 'weight' in req.query)){
        res.status(400).send({
            error: "malformatted parameters"
        });
    }

    const { height, weight } = req.query;
    if (isNaN(Number(height)) || isNaN(Number(weight))) {
        res.status(400).send({
            error: "malformatted parameters"
        });
    }

    res.send({
        height,
        weight,
        bmi: calculateBmi(Number(height), Number(weight))
    });
});

app.post('/exercises', (req, res) => {
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((hour) => typeof hour === 'number') ||
    typeof target !== 'number'
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = calculateExercises(daily_exercises, target);
  return res.json(result);
})

const PORT = 3011

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})