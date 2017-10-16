import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/delay";

let circle = document.getElementById('circle');

let source = Observable.fromEvent(document, 'mousemove')
    .map((e: MouseEvent) => {
        return {
            x: e.clientX,
            y: e.clientY
        }
    }).filter(value => value.x < 500).delay(300);

    // .map(n => n * 2).filter(n => n > 4);


let onNext = (value) => {
    circle.style.left = value.x + 'px';
    circle.style.top = value.y + 'px';
    console.log({top: window.getComputedStyle(circle)['top'], left: window.getComputedStyle(circle)['left']});
};

source.subscribe(
    onNext,
    e => console.log(`error: ${e}`),
    () => console.log('complete')
);

