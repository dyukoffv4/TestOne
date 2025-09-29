import http from 'k6/http';
import { group, check } from 'k6';

const saveForm = (message) => `message=${message}`;
const loadPath = (title) => `http://slim-3.local/load/${title}`;
const savePath = (title) => `http://slim-3.local/save/${title}`;
const saveItem = (vu, id) => { return { title: `title-${vu}-${id}`, message: `message-${vu}-${id}` }; }

var json_data = [saveItem(__VU, 0), saveItem(__VU, 1), saveItem(__VU, 2)];
var counter = 3;

export const options = {
    // Какие-то уникальные опции
};

export function setup() {
    console.log('Set Up cloakroom_2');

    return {
        params: {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }
    };
}

export default function(data) {
    if (__ITER === 0) {
        for (let item in json_data) http.post(savePath(item.title), saveForm(item.message), data.params);
    }

    if (Math.random() < 0.5 || json_data.length == 1) {
        group('Create message', function () {
            const item = saveItem(__VU, counter++);
            json_data.push(item);
            const result = http.post(savePath(item.title), saveForm(item.message), data.params);
            check(result, {
                'Code check': (r) => r.status === 200
            });
        });
    }
    else {
        group('Get message', function () {
            const item = json_data.shift();
            const result = http.get(loadPath(item.title), data.params);
            check(result, {
                'Code check': (r) => r.status === 200,
                'Body check': (r) => r.body === item.message
            });
        });
    }
}

export function teardown(data) {
    console.log('Tear Down cloakroom_2');
}
