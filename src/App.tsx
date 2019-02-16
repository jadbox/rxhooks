import React, { Component, useState, useEffect, useRef, useCallback, useReducer } from 'react';
import './App.css';
// import { useFetch } from 'react-hooks-fetch';
import { scan } from 'rxjs/operators';
import { interval, Observable, fromEvent, OperatorFunction } from 'rxjs';
import { EventEmitter } from 'events';

import {useRx, useRxState} from 'rxhooks';

function ExampleUseRxState() {
  const initialValue:number = 1;
  const [count, signalCount] = useRxState(initialValue, 
    scan( (acc, x)=>x+acc, 0) 
  );

  const onClick = () => {
    signalCount(1);
  }
  
  return <>
    <button onClick={onClick}>Add 1</button>
    <p>count {count}</p>
  </>
}

function ExampleUseRx() {
  const stream = (x:number) => interval(1000 * x);

  const [speed, setSpeed] = useState(1);
  const [count] = useRx( stream, speed );
  
  return <>
    <button onClick={() => setSpeed(speed+1)}>Make slower via initialValue change</button>
    <p>speed {speed}{' '}|{' '}count {count}</p>
  </>
}

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ExampleUseRx/>
          <br/>
          <ExampleUseRxState/>
        </header>
      </div>
    );
  }
}

export default App;