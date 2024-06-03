import { IAnswerItemProps } from '../../utils/types';
import './AnswerItem.scss';

import React, { useState } from 'react';

const AnswerItem: React.FC<IAnswerItemProps> = ({
  currentQuestion,
  answer,
  type,
  id,
  onChange,
}) => {
  const [isFullAnswer, setIsFullAnswer] = useState(false);

  return (
    <div className="answer">
      <input
        id={id.toString()}
        type={type}
        value={answer}
        name={currentQuestion.toString()}
        onChange={onChange}
      />
      <label htmlFor={id.toString()}>
        {answer.length > 100 ? isFullAnswer ? answer : `${answer.slice(0, 100)} ...` : answer}{' '}
      </label>
      {answer.length > 100 && (
        <button onClick={() => setIsFullAnswer(!isFullAnswer)}>
          {isFullAnswer ? 'Свернуть' : 'Раскрыть'}
        </button>
      )}
    </div>
  );
};

export default AnswerItem;
