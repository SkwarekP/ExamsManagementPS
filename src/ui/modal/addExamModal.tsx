import classes from './addExamModal.module.scss';
import { IModal } from './modal';
import starIcon from '../atoms/icons/star.svg';
import filledStarIcon from '../atoms/icons/filledStar.svg';
import crossIcon from '../atoms/icons/cross.png';
import undoArrowIcon from '../atoms/icons/undo-arrow.png';
import React, { useEffect, useState } from 'react';
import { Button } from '../atoms/buttons/button';
import { Tooltip } from '../atoms/tooltip/tooltip';
import { addNewExamToDB, addNewExamToKeywords } from '../../redux/thunks';
import { INewExamData } from '../../types';
import { Dispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { examsListActions } from '../../redux/slices/examSlice';

export interface IAnswers {
  answerId: number;
  answer: string | undefined;
  isCorrect: boolean;
}

export type QuestionsAmount = 5 | 15 | 30 | 45 | 60;
export type AnswersAmount = 2 | 3 | 4;
export type ExamTime = 'No time limit' | 5 | 10 | 15 | 20 | 25 | 30 | 45 | 60;

interface IsValidAnswers {
  isValid: boolean;
  message: string;
}

const stars: number[] = [1, 2, 3, 4, 5];

export const AddExamModal = ({ onConfirm, onClose }: IModal) => {
  const dispatch: Dispatch = useDispatch();

  const [examAnswers, setExamAnswers] = useState<IAnswers[]>([
    { answerId: 1, answer: undefined, isCorrect: false },
    { answerId: 2, answer: undefined, isCorrect: false },
    { answerId: 3, answer: undefined, isCorrect: false },
    { answerId: 4, answer: undefined, isCorrect: false },
  ]);

  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<INewExamData>({
    questions: [],
    questionsCounter: 0,
    examType: undefined,
    answersAmount: 4,
    category: undefined,
    difficultyLevel: undefined,
    examTime: 'No time limit',
    questionsAmount: 5,
  });

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<string | undefined>(
    ''
  );
  const [isValidationOk, setIsValidationOk] = useState<IsValidAnswers>({
    isValid: true,
    message: '',
  });
  const [isSuccess, setIsSuccess] = useState({
    isUpdated: false,
    isAdded: false,
    message: '',
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const eachAnswerHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const update = examAnswers.map((item) => {
      if (item.answerId.toString() === event.target.id) {
        return { ...item, answer: event.target.value };
      }
      return { ...item };
    });
    setExamAnswers(update);
  };

  const chooseAnswersAmountHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setExamAnswers(
      Array.from({ length: +event.target.value }, (_, index) => ({
        answerId: index + 1,
        answer: '',
        isCorrect: false,
      }))
    );
  };

  useEffect(() => {
    if (
      questionsAndAnswers.questionsCounter ===
      questionsAndAnswers.questionsAmount
    ) {
      addNewExamToDB(questionsAndAnswers)
        .then((res) => {
          addNewExamToKeywords(res.data.examType!).then(() =>
            dispatch(
              examsListActions.addKeywordToTheEndOfTheList(res.data.examType!)
            )
          );
        })
        .catch((err) => console.log(err.response.data))
        //error handling to implement
        .finally(() => onConfirm());
    }
    // eslint-disable-next-line
  }, [
    questionsAndAnswers.questionsCounter,
    questionsAndAnswers.questionsAmount,
    onConfirm,
  ]);

  const confirmGeneralOptionsHandler = () => {
    if (isDisabled) return;

    if (
      questionsAndAnswers.examType &&
      questionsAndAnswers.difficultyLevel &&
      questionsAndAnswers.category &&
      questionsAndAnswers.category !== ''
    )
      setIsDisabled(true);
  };

  const nextQuestionHandler = () => {
    const indexToUpdate = questionsAndAnswers.questions.findIndex(
      (item) => item.id === questionsAndAnswers.questionsCounter + 1
    );

    if (!isDisabled) return;

    if (isSuccess.isAdded || isSuccess.isUpdated) return;

    const correctAnswer_ = examAnswers.find((item) => {
      if (item.isCorrect) return item.answer;
      else return undefined;
    });

    const areFieldNotEmpties = examAnswers.every(
      (a) => a.answer !== '' && a.answer
    );

    if (
      correctAnswer_ &&
      currentQuestion &&
      currentQuestion !== '' &&
      areFieldNotEmpties
    ) {
      if (indexToUpdate === questionsAndAnswers.questionsCounter) {
        const updateQuestion = questionsAndAnswers.questions.map(
          (item, index) => {
            if (index === indexToUpdate) {
              return {
                ...item,
                options: examAnswers,
                question: currentQuestion,
                correctAnswer: correctAnswer_.answer,
              };
            }
            return { ...item };
          }
        );
        setQuestionsAndAnswers({
          ...questionsAndAnswers,
          questionsCounter: questionsAndAnswers.questionsCounter + 1,
          questions: updateQuestion,
        });

        setCurrentQuestion(
          questionsAndAnswers?.questions[
            questionsAndAnswers.questionsCounter + 1
          ]?.question
            ? questionsAndAnswers?.questions[
                questionsAndAnswers.questionsCounter + 1
              ]?.question
            : ''
        );
        setExamAnswers(
          questionsAndAnswers?.questions[
            questionsAndAnswers.questionsCounter + 1
          ]?.options
            ? questionsAndAnswers?.questions[
                questionsAndAnswers.questionsCounter + 1
              ]?.options
            : Array.from(
                {
                  length:
                    questionsAndAnswers.questions[
                      questionsAndAnswers.questionsCounter
                    ].options.length,
                },
                (_, index) => ({
                  answerId: index + 1,
                  answer: '',
                  isCorrect: false,
                })
              )
        );

        setIsSuccess({
          ...isSuccess,
          isAdded: true,
          message: 'Question has been updated successfully!',
        });

        return;
      } else {
        setQuestionsAndAnswers({
          ...questionsAndAnswers,
          questionsCounter: questionsAndAnswers.questionsCounter + 1,
          questions: [
            ...questionsAndAnswers.questions,
            {
              id: questionsAndAnswers.questions.length + 1,
              question: currentQuestion,
              correctAnswer: correctAnswer_.answer,
              options: examAnswers,
            },
          ],
        });
        setIsSuccess({
          ...isSuccess,
          isAdded: true,
          message: 'Question has been added successfully!',
        });
      }

      setExamAnswers(
        Array.from({ length: examAnswers.length }, (_, index) => ({
          answerId: index + 1,
          answer: '',
          isCorrect: false,
        }))
      );
      setCurrentQuestion('');
    } else
      setIsValidationOk({
        isValid: false,
        message:
          !correctAnswer_ &&
          currentQuestion &&
          currentQuestion !== '' &&
          areFieldNotEmpties
            ? 'Choose correct answer!'
            : 'Fields must not be empty!',
      });
  };

  const previousQuestionHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (
      !isDisabled ||
      questionsAndAnswers.questionsCounter === 0 ||
      isSuccess.isAdded ||
      isSuccess.isUpdated
    )
      return;

    setQuestionsAndAnswers({
      ...questionsAndAnswers,
      questionsCounter: questionsAndAnswers.questionsCounter - 1,
      questions: [...questionsAndAnswers.questions],
    });
    setCurrentQuestion(
      questionsAndAnswers.questions[questionsAndAnswers.questionsCounter - 1]
        .question
    );
    setExamAnswers(
      questionsAndAnswers.questions[questionsAndAnswers.questionsCounter - 1]
        .options
    );
  };

  useEffect(() => {
    const showErrorTooltipCooldown = setTimeout(() => {
      setIsValidationOk({ ...isValidationOk, isValid: true });
      if (isSuccess.isAdded) setIsSuccess({ ...isSuccess, isAdded: false });
      if (isSuccess.isUpdated) setIsSuccess({ ...isSuccess, isUpdated: false });
    }, 1000);

    return () => clearTimeout(showErrorTooltipCooldown);
    // eslint-disable-next-line
  }, [isValidationOk.isValid, isSuccess.isAdded, isSuccess.isUpdated]);

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.close__modal}>
          <button onClick={onClose}>
            <img src={crossIcon} alt="crossIcon" />
          </button>
        </div>
        <div className={classes.topHeader__wrapper}>
          <div className={classes.row}>
            <div className={classes.row__item}>
              <div>
                <label>Test name</label>
              </div>
              <input
                type="text"
                maxLength={26}
                onChange={(event) =>
                  setQuestionsAndAnswers({
                    ...questionsAndAnswers,
                    examType: event.target.value,
                  })
                }
                disabled={isDisabled}
                className={`${isDisabled ? classes.input__disabled : undefined} ${classes.input__test_name}`}
              />
            </div>
            <div className={classes.row__item}>
              <div>
                <label>Category</label>
              </div>
              <input
                type="text"
                className={isDisabled ? classes.input__disabled : undefined}
                disabled={isDisabled}
                maxLength={18}
                list="categories"
                onChange={(event) =>
                  setQuestionsAndAnswers({
                    ...questionsAndAnswers,
                    category: event.target.value,
                  })
                }
              />
              <datalist id="categories">
                <option>programming</option>
                <option>language</option>
                <option>geography</option>
                <option>chemistry</option>
              </datalist>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.row__item}>
              <div>
                <label>Difficulty level</label>
              </div>
              <div className={classes.stars__wrapper}>
                {stars.map((item, index) =>
                  !questionsAndAnswers.difficultyLevel ? (
                    <img
                      key={item}
                      id={item.toString()}
                      onClick={(event: any) =>
                        setQuestionsAndAnswers({
                          ...questionsAndAnswers,
                          difficultyLevel: +event.target.id,
                        })
                      }
                      src={starIcon}
                      alt="starIcon"
                    />
                  ) : (
                    item <= questionsAndAnswers.difficultyLevel && (
                      <img key={item} src={filledStarIcon} alt="filledStar" />
                    )
                  )
                )}
                {questionsAndAnswers.difficultyLevel && !isDisabled && (
                  <button
                    onClick={() =>
                      setQuestionsAndAnswers({
                        ...questionsAndAnswers,
                        difficultyLevel: undefined,
                      })
                    }
                  >
                    <img src={undoArrowIcon} alt="undoArrowIcon" />
                  </button>
                )}
              </div>
            </div>
            <div className={classes.row__item}>
              <div>
                <label>Questions amount</label>
              </div>
              <select
                onChange={(event) =>
                  setQuestionsAndAnswers({
                    ...questionsAndAnswers,
                    questionsAmount: +event.target.value as QuestionsAmount,
                  })
                }
                disabled={isDisabled}
                className={isDisabled ? classes.input__disabled : undefined}
              >
                <option>5</option>
                <option>15</option>
                <option>30</option>
                <option>45</option>
              </select>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.row__item}>
              <div>
                <label>Answers amount</label>
              </div>
              <select
                onChange={(event) => chooseAnswersAmountHandler(event)}
                disabled={isDisabled}
                className={isDisabled ? classes.input__disabled : undefined}
              >
                <option>4</option>
                <option>3</option>
                <option>2</option>
              </select>
            </div>
            <div className={classes.row}>
              <div className={classes.row__item}>
                <div>
                  <label>Exam time</label>
                </div>
                <select
                  onChange={(event) =>
                    setQuestionsAndAnswers({
                      ...questionsAndAnswers,
                      examTime: +event.target.value as ExamTime,
                    })
                  }
                  disabled={isDisabled}
                  className={isDisabled ? classes.input__disabled : undefined}
                >
                  <option defaultValue="No time limit">No time limit</option>
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                  <option>25</option>
                  <option>30</option>
                  <option>45</option>
                  <option>60</option>
                </select>
              </div>
            </div>
          </div>
          <div className={classes.confirm__btn__wrapper}>
            <Button
              disabled={
                !questionsAndAnswers.examType ||
                !questionsAndAnswers.difficultyLevel ||
                !questionsAndAnswers.category ||
                isDisabled
              }
              onClick={confirmGeneralOptionsHandler}
            >
              Confirm
            </Button>
          </div>
        </div>
        <div className={classes.add__question__panel}>
          <div className={classes.question__content}>
            <input
              type="text"
              placeholder="Question..."
              disabled={!isDisabled}
              value={currentQuestion}
              onChange={(event) => setCurrentQuestion(event.target.value)}
            />
          </div>
          <div className={classes.questions__amount}>
            <span>
              {questionsAndAnswers.questionsCounter + 1}/
              {questionsAndAnswers.questionsAmount}
            </span>
          </div>
          {examAnswers.map((item, idx) => (
            <div className={classes.add__answer} key={item.answerId}>
              <div className={classes.select__answer}>
                <input
                  type="text"
                  id={(idx + 1).toString()}
                  placeholder={`Answer... #${idx + 1}`}
                  className={!isDisabled ? classes.border__gray : undefined}
                  disabled={!isDisabled}
                  onChange={(event) => eachAnswerHandler(event)}
                  value={examAnswers[idx].answer}
                />
              </div>
              <div className={classes.delete__and__selectCorrect}>
                <label htmlFor={`a-${item.answerId}`}>
                  <input
                    type="radio"
                    id={(idx + 1).toString()}
                    disabled={!isDisabled}
                    onChange={(event) => {
                      const update = examAnswers.map((item) => {
                        if (+event.target.id === item.answerId) {
                          return { ...item, isCorrect: true };
                        }
                        return { ...item, isCorrect: false };
                      });
                      setExamAnswers(update);
                    }}
                    checked={examAnswers[idx].isCorrect}
                    name="correctAnswer"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
        <div className={`${classes.next__question__wrapper}`}>
          <Button
            disabled={!isDisabled}
            onClick={(event) => previousQuestionHandler(event)}
          >
            Previous
          </Button>
          <Button
            disabled={!isDisabled}
            onClick={nextQuestionHandler}
            className={
              questionsAndAnswers.questionsCounter + 1 ===
                questionsAndAnswers.questionsAmount &&
              examAnswers.find((item) => {
                if (item.isCorrect) return item.answer;
                else return undefined;
              }) &&
              currentQuestion &&
              currentQuestion !== '' &&
              examAnswers.every((a) => a.answer !== '' && a.answer)
                ? classes.add__exam__btn
                : undefined
            }
          >
            {questionsAndAnswers.questionsCounter + 1 ===
            questionsAndAnswers.questionsAmount
              ? 'Add exam'
              : 'Add question'}
          </Button>
        </div>
      </div>
      {!isValidationOk.isValid && (
        <Tooltip isWarning message={isValidationOk.message} />
      )}
      {(isSuccess.isAdded || isSuccess.isUpdated) && (
        <Tooltip message={isSuccess.message} isSuccess />
      )}
    </>
  );
};
