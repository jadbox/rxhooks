import { Observable, OperatorFunction } from 'rxjs';
export declare function useRx<T, X>(stream: (c: X) => Observable<T>, initialValue: X, onErr?: (error: any) => void, onComplete?: () => void): [T];
export declare function useRxState<T, X>(initialValue: X, pipes: OperatorFunction<any, any>, onErr?: (error: any) => void, onComplete?: () => void): [T, (x: X) => void];
