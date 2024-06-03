import { IData } from '../../utils/types';
import AnswerItem from '../AnswerItem/AnswerItem';
import './TestForm.scss';

import React, { useEffect, useState } from 'react';

const TestForm: React.FC<IData> = (data) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(
    Number(localStorage.getItem('currentQuestion')) || 0
  );
  const [isTestComplete, setIsTestComplete] = useState<boolean>(
    JSON.parse(localStorage.getItem('testCompleted') || 'false') || false
  );
  const [isTestStarted, setIsTestStarted] = useState<boolean>(
    JSON.parse(localStorage.getItem('isTestStarted') || 'false') || false
  );
  const [timeLeft, setTimeLeft] = useState<number>(
    Number(localStorage.getItem('timeLeft')) || data.testTime
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [testResult, setTestResult] = useState<boolean[]>(
    JSON.parse(localStorage.getItem('testResult') || '[]') || []
  );

  useEffect(() => {}, []);

  const handleSubmit = () => {
    currentQuestion === data.questions.length - 1
      ? setIsTestComplete(true)
      : setCurrentQuestion((prev) => prev + 1);
    const buttons = document.querySelectorAll(
      'input[type="radio"]:checked, input[type="checkbox"]:checked'
    );
    const result = Array.from(buttons).map((item) => Number(item.id));

    setTestResult((prevTestResult) => {
      return [
        ...prevTestResult,
        JSON.stringify(result) ===
          JSON.stringify(data.questions[currentQuestion].correctAnswers),
      ];
    });
  };

  useEffect(() => {
    localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
    localStorage.setItem('timeLeft', JSON.stringify(timeLeft));
    localStorage.setItem('isTestStarted', JSON.stringify(isTestStarted));
    localStorage.setItem('testResult', JSON.stringify([...testResult]));
    localStorage.setItem('testCompleted', JSON.stringify(isTestComplete));
  }, [currentQuestion, isTestComplete, isTestStarted, testResult, timeLeft]);

  const handleCheckboxChange = () => {
    const buttons = document.querySelectorAll(
      'input[type="radio"]:checked, input[type="checkbox"]:checked'
    );
    setIsButtonDisabled(Boolean(buttons.length));
  };

  const handleStartTest = () => {
    setIsTestStarted(true);
  };

  const handleResetTest = () => {
    setCurrentQuestion(0);
    setTimeLeft(data.testTime);
    setIsTestStarted(false);
    setIsTestComplete(false);
    setTestResult([]);
  };

  useEffect(() => {
    handleCheckboxChange();
  }, [currentQuestion]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isTestStarted && !isTestComplete) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft > 0) {
            return prevTimeLeft - 1;
          } else {
            clearInterval(intervalId);
            setIsTestComplete(true);
            return prevTimeLeft;
          }
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isTestStarted, isTestComplete]);

  return (
    <div className="test">
      <div className="test__title">
        <h2 className="test__title-text">Тестирование</h2>
        <div className="test__title-buttons">
          {isTestStarted ? (
            <p>
              Осталось:{' '}
              {Math.floor(timeLeft / 60)
                .toString()
                .padStart(2, '0')}
              :{(timeLeft % 60).toString().padStart(2, '0')}
            </p>
          ) : (
            <button
              className="test__btn test__btn_start"
              onClick={handleStartTest}
            >
              Начать
            </button>
          )}
          <button
            className="test__btn test__btn_reset"
            onClick={handleResetTest}
          >
            Сбросить тест
          </button>
        </div>
      </div>
      <div className="test__container">
        {!isTestComplete && (
          <div className="test__progress">
            {Array(data.questions.length)
              .fill(null)
              .map((_, idx) => (
                <div
                  key={idx}
                  className={`test__progress-item ${
                    idx === currentQuestion
                      ? 'test__progress-item_current'
                      : idx < currentQuestion
                      ? 'test__progress-item_done'
                      : ''
                  }`}
                />
              ))}
          </div>
        )}
        {isTestComplete ? (
          <>
            <p className="test__complete">
              {timeLeft > 0
                ? `Тест выполнен за ${Math.floor(
                    (data.testTime - timeLeft) / 60
                  )
                    .toString()
                    .padStart(2, '0')} : ${((data.testTime - timeLeft) % 60)
                    .toString()
                    .padStart(2, '0')}`
                : 'К сожалению, вы не уложились в отведённое время'}
            </p>
            <p className="test__complete">{`Правильных ответов: ${testResult.reduce(
              (sum, item) => sum + +item,
              0
            )} из ${data.questions.length}`}</p>
          </>
        ) : (
          <fieldset className="test__question">
            <legend className="test__question-title">
              {data.questions[currentQuestion].question}
            </legend>
            {data.questions[currentQuestion].answers.map((answer, idx) => (
              <AnswerItem
                id={idx}
                key={`${currentQuestion} ${idx}}`}
                currentQuestion={currentQuestion}
                answer={answer}
                type={
                  data.questions[currentQuestion].correctAnswers.length > 1
                    ? 'checkbox'
                    : 'radio'
                }
                onChange={handleCheckboxChange}
              />
            ))}

            <button
              className="test__btn test__btn_submit"
              type="button"
              onClick={handleSubmit}
              disabled={!isTestStarted || !isButtonDisabled}
            >
              Ответить
            </button>
          </fieldset>
        )}
      </div>
    </div>
  );
};

export default TestForm;
