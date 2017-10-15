import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/from";
import {Observer} from "rxjs/Observer";

let numbers = [1, 5, 10];
let source = Observable.from(numbers);

source.subscribe(
    value => console.log(`value: ${value}`),
    e => console.log(`error: ${e}`),
    () => console.log('complete')
);

