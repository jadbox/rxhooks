## Install

`npm install rxhooks`

### API

```
function useRx<T, X>(stream: (c: X) => Observable<T>, initialValue: X, onErr?: ((error: any) => void) | undefined, onComplete?: (() => void) | undefined): [T]

useRx is a hook that takes an Observable factory function and returns [currentStreamOutput] for use in your component.
The stream will rerun anytime the initialValue is changed.
The onErr and onComplete parameters are callbacks to handle those stream states
```

```
function useRxState<T, X>(initialValue: X, pipes: OperatorFunction<any, any>, onErr?: ((error: any) => void) | undefined, onComplete?: (() => void) | undefined): [T, (x: X) => void]

useRxState allows adding items to an Rx stream that is created for you.
The stream will rerun anytime the initialValue is changed.
The pipes parameter allows passing in Rx operators to work upon the internal source stream.
The onErr and onComplete parameters are callbacks to handle those stream states
```

### Just Show Me the Code

```javascript
import {useRx, useRxState} from 'rxhooks';

function ExampleUseRxState() {
  const initialVal = 1;
  const [count, signalCount] = useRxState(initialVal, 
    scan( (acc, x) => x+acc, 0) 
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
  const stream = (x) => interval(1000 * x);

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
```
