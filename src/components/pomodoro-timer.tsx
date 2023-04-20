import React, { useEffect, useState ,useCallback} from 'react';
import { useInterval } from '../hooks/use-interval'
import { Button } from './button';
import { Timer } from './timer';
import { secondsToTime } from '../utils/seconds-to-time';
const bellStart = require('../sounds/bell-start.mp3')
const bellFinish = require('../sounds/bell-finish.mp3')

const startWorking = new Audio(bellStart)
const stopWorking = new Audio(bellFinish)

interface Props {
  PomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}
export function PomodoroTimer(props: Props): JSX.Element {
   const [mainTime, setMainTime ] = useState(props.PomodoroTime);
   const [timeCounting, setTimeCounting ] = useState(false);
   const [working, setWorking ] = useState(false);
   const [resting, setResting ] = useState(false);
   const [cyclesQtd, setCyclesQtd ] = useState(
    new Array(props.cycles -1 ).fill(true)
   )
   const [completedCycles, setCompletedCycles] = useState(0);
   const [fullWorkingTime, setfullWorkingTime] = useState(0);
   const [numberOfPomodoros, setnumberOfPomodoros] = useState(0);

  useInterval(() => {
    setMainTime(mainTime - 1);
    if(working) setfullWorkingTime(fullWorkingTime + 1);
  }, timeCounting ? 1000 : null,
   );

   useEffect(() => {
    if(working) document.body.classList.add('working');
    if(resting) document.body.classList.remove('working'); 
    if(mainTime > 0) return;
    if(working && cyclesQtd.length > 0){
      configureRest(false);
      cyclesQtd.pop()
    }else if (working && cyclesQtd.length <= 0){
      configureRest(true);
      setCyclesQtd(new Array(props.cycles -1 ).fill(true))
      setCompletedCycles(completedCycles + 1)
    }
    if(working) setnumberOfPomodoros(numberOfPomodoros + 1)
    if(resting) configureWork()
   }, [
    working, 
    resting,
    mainTime,
    cyclesQtd,
    numberOfPomodoros,
    completedCycles,
  ]);

   const configureWork = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.PomodoroTime)
    startWorking.play()
   },[
    setTimeCounting,
    setWorking,
    setResting,
    setMainTime,
    props.PomodoroTime]);

   const configureRest = useCallback((long: boolean) =>{
    setTimeCounting(true);
    setWorking(false);
    setResting(true);
    stopWorking.play()
    if (long){
      setMainTime(props.longRestTime);
     } else {
      setMainTime(props.shortRestTime);
     };
   },[
    setTimeCounting,
    setWorking,
    setResting,
    props.longRestTime,
    props.shortRestTime
  ]);

   
  return(
    <div className='pomodoro'>
      <h1>Você está: {working ? 'Trabalhando' : 'Descansando'}</h1>
      <Timer mainTime={mainTime} />
      <div className="controls">
      <Button text='work' onClick={() => configureWork()}></Button>
      <Button text='rest' onClick={() => configureRest(false)}></Button>
      <Button className={!working && !resting ? 'hidden' : ''} text={timeCounting? 'Pause' : 'Play'} onClick={() => setTimeCounting(!timeCounting)}></Button>
      </div>
      <div className="details">
        <p>Ciclos concluídos: {completedCycles}</p>
        <p>Horas Trabalhadas: {secondsToTime(fullWorkingTime)}</p>
        <p>Pomodoros Concluídos: {numberOfPomodoros}</p>
      </div>
    </div>
  )
}