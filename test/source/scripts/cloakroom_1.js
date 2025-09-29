import http from 'k6/http';
import { group, check } from 'k6';
import { SharedArray } from 'k6/data';

const json_data = new SharedArray('data_1', function () {
    return JSON.parse(open('../data/data_1.json'));
});

const loadPath = (title, password) => `http://slim-3.local/cloakroom/load/${title}?password=${password}`;
const savePath = (title, message, password) => `http://slim-3.local/cloakroom/save/${title}?message=${message}&password=${password}`;

export const options = {
    // Какие-то уникальные опции
};

export function setup() {
    console.log('Set Up cloakroom_1');

    return {
        params: {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    };
}

export default function(data) {
    const item = json_data[(__ITER + __VU) % json_data.length];

    group('Create message', function () {
        const result = http.post(savePath(item.title, item.message, item.password), '', data.params);
        check(result, {
            'Code check': (r) => r.status === 200
        });
    });

    if (Math.random() < 0.1) {
        group('Wrong password', function () {
            const result = http.get(loadPath(item.title, item.password + '123'), data.params);
            check(result, {
                'Code check': (r) => r.status === 403
            });
        });
    }

    group('Get message', function () {
        const result = http.get(loadPath(item.title, item.password), data.params);
        check(result, {
            'Code check': (r) => r.status === 200,
            'Body check': (r) => r.body === item.message
        });
    });

    if (Math.random() < 0.1) {
        group('Missed message', function () {
            const result = http.get(loadPath(item.title, item.password), data.params);
            check(result, {
                'Code check': (r) => r.status === 404
            });
        });
    }
}

export function teardown(data) {
    console.log('Tear Down cloakroom_1');
}
