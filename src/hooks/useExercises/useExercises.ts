import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import endpoints from "../../routes/types";
import {
  deleteExerciseActionCreator,
  loadExerciseByIdActionCreator,
  loadExercisesActionCreator,
} from "../../store/features/exercises/exercisesSlice";
import {
  ExercisesData,
  ExerciseDataStructure,
  ExerciseCreateStructure,
} from "../../store/features/exercises/types";
import {
  displayModalActionCreator,
  setIsLoadingActionCreator,
  unSetIsLoadingActionCreator,
} from "../../store/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import formData from "./formData";

const apiUrl = process.env.REACT_APP_URL_API!;
const exercisesEndpoint = "/exercises";
const userExercisesEndpoint = "/my-exercises";

const useExercises = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);
  const navigationTo = useNavigate();

  const getExercises = useCallback(async () => {
    try {
      dispatch(setIsLoadingActionCreator());
      const response = await fetch(`${apiUrl}${exercisesEndpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json;" },
      });

      const { exercises } = (await response.json()) as ExercisesData;

      dispatch(unSetIsLoadingActionCreator());
      dispatch(loadExercisesActionCreator(exercises));
    } catch (error) {
      dispatch(unSetIsLoadingActionCreator());
      dispatch(
        displayModalActionCreator({
          isError: true,
          modal: (error as Error).message,
        })
      );
    }
  }, [dispatch]);

  const getUserExercises = useCallback(async () => {
    try {
      dispatch(setIsLoadingActionCreator());

      const response = await fetch(
        `${apiUrl}${exercisesEndpoint}${userExercisesEndpoint}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("We couldn't your retrieve exercises");
      }

      const { exercises } = (await response.json()) as ExercisesData;

      dispatch(unSetIsLoadingActionCreator());
      dispatch(loadExercisesActionCreator(exercises));
    } catch (error) {
      dispatch(unSetIsLoadingActionCreator());
      dispatch(
        displayModalActionCreator({
          isError: true,
          modal: "We couldn't retrieve your exercises",
        })
      );
    }
  }, [dispatch, token]);

  const deleteExercise = useCallback(
    async (exercise: ExerciseDataStructure) => {
      try {
        dispatch(setIsLoadingActionCreator());

        const response = await fetch(
          `${apiUrl}/exercises/delete/${exercise.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("The exercise couldn't be deleted");
        }

        dispatch(unSetIsLoadingActionCreator());
        dispatch(deleteExerciseActionCreator(exercise));
        dispatch(
          displayModalActionCreator({
            modal: "Exercise deleted successfully",
            isError: false,
          })
        );
      } catch (error) {
        dispatch(unSetIsLoadingActionCreator());
        dispatch(
          displayModalActionCreator({
            isError: true,
            modal: "The exercise couldn't be deleted",
          })
        );
      }
    },
    [dispatch, token]
  );

  const createExercise = useCallback(
    async (exercise: ExerciseCreateStructure) => {
      try {
        dispatch(setIsLoadingActionCreator());

        const data = formData(exercise);
        const response = await fetch(`${apiUrl}/exercises/create`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        });

        if (!response.ok) {
          throw new Error("The exercise couldn't be created.");
        }

        dispatch(unSetIsLoadingActionCreator());
        dispatch(
          displayModalActionCreator({
            modal: "Exercise successfully created",
            isError: false,
          })
        );
        navigationTo(endpoints.myExercises);
      } catch (error: unknown) {
        dispatch(unSetIsLoadingActionCreator());
        dispatch(
          displayModalActionCreator({
            modal: "Could not create the exercise. Try again.",
            isError: true,
          })
        );
        dispatch(unSetIsLoadingActionCreator());
      }
    },
    [dispatch, navigationTo, token]
  );

  const findExerciseById = useCallback(
    async (idExercise: string) => {
      try {
        dispatch(setIsLoadingActionCreator());
        const response = await fetch(
          `${apiUrl}/exercises/detail/${idExercise}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "We could not retrieve the exercise requested. Try later"
          );
        }

        const { exercise } = (await response.json()) as ExercisesData;

        dispatch(unSetIsLoadingActionCreator());
        dispatch(loadExerciseByIdActionCreator(exercise));
      } catch (error) {
        dispatch(unSetIsLoadingActionCreator());
        dispatch(
          displayModalActionCreator({
            modal: "Could not display the exercise selected",
            isError: true,
          })
        );
      }
    },
    [dispatch, token]
  );

  return {
    getExercises,
    getUserExercises,
    deleteExercise,
    createExercise,
    findExerciseById,
  };
};

export default useExercises;
