import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/delay";

let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button, 'click');


let load = (url: string) => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        console.log(xhr.responseText);
        let movies = JSON.parse(xhr.responseText);
        movies.forEach(m => {
            let div = document.createElement("div");
            div.innerText = m.title;
            output.appendChild(div);
        })
    });
    xhr.open("GET", url);
    xhr.send();
};


click.subscribe(
    event => load('movies.json'),
    e => console.log(`error: ${e}`),
    () => console.log('complete')
);

