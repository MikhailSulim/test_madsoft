// import React, { useEffect, useState } from 'react';
import './App.scss';
import data from './../data/questions.json';
import TestForm from '../components/TestForm/TestForm';

function App() {
  // const [data, setData] = useState<Data | null>(null);
  // useEffect(() => {
  //   fetch('/public/data/questions.json')
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       return response.json();
  //     })
  //     .then((data) => {
  //       setData(data);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  return (
    <div className="App">
      <TestForm questions={data.questions} testTime={data.testTime} />
    </div>
  );
}

export default App;
