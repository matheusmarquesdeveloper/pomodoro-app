import React from 'react';
import './index.css';
import { PomodoroTimer } from './components/pomodoro-timer';

function App(): JSX.Element {
  return (
    <div className="App">
     <PomodoroTimer PomodoroTime={1800} shortRestTime={300} longRestTime={900} cycles={4}/>
    </div>
  );
}

export default App;
