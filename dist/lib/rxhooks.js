"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
var react_1 = require("react");
var rxjs_1 = require("rxjs");
var events_1 = require("events");
var useState = react_1.default.useState, useEffect = react_1.default.useEffect, useRef = react_1.default.useRef;
/*
    useRx is a hook that takes an Observable factory function and returns [currentStreamOutput] for use in your component.
    The stream will rerun anytime the initialValue is changed.
    The onErr and onComplete parameters are callbacks to handle those stream states
  */
function useRx(stream, initialValue, onErr, onComplete) {
    // Output state
    var _a = useState(undefined), outState = _a[0], _setOutState = _a[1];
    useEffect(function () {
        var s = stream(initialValue).subscribe(function (x) { return _setOutState(x); }, onErr, onComplete);
        return function () { return s.unsubscribe(); };
    }, [initialValue]);
    return [outState];
}
exports.useRx = useRx;
/*
    useRxState allows adding items to an Rx stream that is created for you.
    The stream will rerun anytime the initialValue is changed.
    The pipes parameter allows passing in Rx operators to work upon the internal source stream.
    The onErr and onComplete parameters are callbacks to handle those stream states
  */
function useRxState(initialValue, pipes, onErr, onComplete) {
    // input to stream
    var emitterRef = useRef(null);
    // Output state
    var _a = useState(undefined), state = _a[0], _setState = _a[1];
    useEffect(function () {
        emitterRef.current = new events_1.EventEmitter();
        var input$ = rxjs_1.fromEvent(emitterRef.current, 'event');
        var s = input$.pipe(pipes).subscribe(function (x) { return _setState(x); });
        emitterRef.current.emit('event', initialValue);
        return function () { return s.unsubscribe(); };
    }, [initialValue]);
    var setRx = function (x) {
        emitterRef.current.emit('event', x);
    };
    return [state, setRx];
}
exports.useRxState = useRxState;
//# sourceMappingURL=rxhooks.js.map