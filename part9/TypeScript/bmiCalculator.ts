const args = process.argv.slice(2)
const height = parseFloat(args[0])
const weight = parseFloat(args[1])

export const calculateBmi = (height: number, weight: number) => {
    const h = height / 100
    const bmi = weight / (h*h)
    if (bmi >= 18.5 && bmi < 24.9) {
        return 'Normal range'
        } else if (bmi < 18.5) {
        return 'Underweight'
        } else if (bmi >= 25 && bmi < 29.9) {
        return 'Overweight'
        } else if (bmi >= 30) {
        return 'Obese'
        } else {
        return 'Out of range'
        }
}

if (isNaN(height) || isNaN(weight)) {
    console.log('Please provide valid height and weight.');
} else {
    const result = calculateBmi(height, weight);
    console.log(`BMI Category: ${result}`);
}