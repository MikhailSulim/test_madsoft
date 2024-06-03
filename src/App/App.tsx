import React, { useEffect, useState } from 'react';
import './App.scss';
import TestForm from '../components/TestForm/TestForm';
import { IData } from '../utils/types';

function App() {
  const [data, setData] = useState<IData | null>(null);
  useEffect(() => {
    fetch('data/questions.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      {data ? (
        <TestForm questions={data.questions} testTime={data.testTime} />
      ) : (
        'Идёт загрузка...'
      )}
    </div>
  );
}

export default App;
