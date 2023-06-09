import { ExerciseDataStructure } from "../../store/features/exercises/types";
import ExerciseDetailStyled from "./ExerciseDetailStyled";

interface DetailProps {
  exercise: ExerciseDataStructure;
}

const ExerciseDetail = ({ exercise }: DetailProps): JSX.Element => {
  return (
    <ExerciseDetailStyled className="detail">
      <img
        src={exercise.image.toString()}
        alt={exercise.name}
        className="detail__image"
      />

      <div className="details-container">
        <div className="details-container__heading heading">
          <h1 className="heading__title">{exercise.name}</h1>
          <span className="heading__duration">{exercise.duration}</span>
        </div>
        <span className="details-container__line"></span>
        <div className="details-container__details details">
          <span className="details__value">{exercise.type}</span>
          <span className="details__value">{exercise.equipment}</span>
        </div>
        <span className="details-container__line"></span>

        <div className="details-container__details">
          <div>
            <span className="details__title">Difficulty: </span>
            <span className="details__value">{exercise.difficulty}</span>
          </div>
          <div>
            <span className="details__value">{exercise.muscles}</span>
          </div>
        </div>

        <span className="details-container__line"></span>
        <div className="details-container__details">
          <div>
            <span className="details__title">Sets: </span>
            <span className="details__value"> {exercise.sets}</span>
          </div>
          <div>
            <span className="details__title">Reps: </span>
            <span className="details__value"> {exercise.reps}</span>
          </div>
          <div>
            <span className="details__title">Rest: </span>
            <span className="details__value"> {exercise.rest}</span>
          </div>
        </div>
        <span className="details-container__line"></span>
        <span className="details__value">{exercise.description}</span>
      </div>
    </ExerciseDetailStyled>
  );
};

export default ExerciseDetail;
