interface Exercises {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (arr: Array<number>, target: number): Exercises => {
  const periodLength = arr.length;
  const trainingDays = arr.filter(hour => Number(hour) !== 0).length;
  const average = arr.reduce((prev, next) => (prev + next), 0) / periodLength;
  const success = average >= target;

  let rating: number = 0;
  let ratingDescription: string = '';

  switch (true) {
    case average < target / 2:
      rating = 1;
      ratingDescription = 'bad';
      break;
    
    case average < target:
      rating = 2;
      ratingDescription = 'not too bad but could be better';
      break;

    case average > target:
      rating = 3;
      ratingDescription = 'very good';
      break;
  
    default:
      break;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));