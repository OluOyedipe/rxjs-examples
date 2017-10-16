import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/retry";

let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button, 'click');


let load = (url: string) => {
    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();


        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.statusText);
            }

        });
        xhr.open("GET", url);
        xhr.send();
    }).retry(3);

};

let renderMovies = (movies) => {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    })
};


click.flatMap(event => load("moviess.json"))
    .subscribe(
    renderMovies,
    e => console.log(`error: ${e}`),
    () => console.log('complete')
);

