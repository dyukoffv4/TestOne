import { SharedArray } from 'k6/data';

const data = new SharedArray('data_1', function () {
    return JSON.parse(open('../data/data_1.json'));
});

export const options = {
    // Какие-то уникальные опции
}

export function setup() {
    console.log('Set Up logger_1');
}

export default function() {
    let result = [];
    for (const key in data[__ITER % data.length]) result.push(`${key}: ${data[__ITER % data.length][key]}`);
    console.log(`from ${__VU} on ${__ITER} get ${result.join(', ')}`);
}

export function teardown() {
    console.log('Tear Down logger_1');
}
