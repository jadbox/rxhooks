// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import React from 'react'
// import { useFetch } from 'react-hooks-fetch';
import { Observable, fromEvent, OperatorFunction } from 'rxjs'
import { EventEmitter } from 'events'
const { useState, useEffect, useRef } = React
/*
    useRx is a hook that takes an Observable factory function and returns [currentStreamOutput] for use in your component.
    The stream will rerun anytime the initialValue is changed.
    The onErr and onComplete parameters are callbacks to handle those stream states
  */
export function useRx<T, X>(
  stream: (c: X) => Observable<T>,
  initialValue: X,
  onErr?: (error: any) => void,
  onComplete?: () => void
): [T] {
  // Output state
  const [outState, _setOutState] = useState<T | undefined>(undefined)

  useEffect(() => {
    const s = stream(initialValue).subscribe(
      x => _setOutState(x),
      onErr,
      onComplete
    )
    return () => s.unsubscribe()
  }, [initialValue])

  return [outState as T]
}

/*
    useRxState allows adding items to an Rx stream that is created for you.
    The stream will rerun anytime the initialValue is changed.
    The pipes parameter allows passing in Rx operators to work upon the internal source stream.
    The onErr and onComplete parameters are callbacks to handle those stream states
  */
export function useRxState<T, X>(
  initialValue: X,
  pipes: OperatorFunction<any, any>,
  onErr?: (error: any) => void,
  onComplete?: () => void
): [T, (x: X) => void] {
  // input to stream
  const emitterRef = useRef<EventEmitter | null>(null)

  // Output state
  const [state, _setState] = useState<T | undefined>(undefined)

  useEffect(() => {
    emitterRef.current = new EventEmitter()
    var input$ = fromEvent(emitterRef.current, 'event')
    const s = input$.pipe(pipes).subscribe(x => _setState(x))
    emitterRef.current!.emit('event', initialValue)
    return () => s.unsubscribe()
  }, [initialValue])

  const setRx = (x: X) => {
    emitterRef.current!.emit('event', x)
  }
  return [state as T, setRx]
}
