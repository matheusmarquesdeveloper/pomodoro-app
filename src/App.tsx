import React from 'react';
import './index.css';
import { PomodoroTimer } from './components/pomodoro-timer';

function App(): JSX.Element {
  return (
    <div className="App">
     <PomodoroTimer PomodoroTime={5} shortRestTime={5} longRestTime={5} cycles={4}/>
    </div>
  );
}

export default App;
