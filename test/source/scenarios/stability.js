import * as cloakroom_1 from '../scripts/cloakroom_1.js';
import * as cloakroom_2 from '../scripts/cloakroom_2.js';

function scenario_from_options(s_name, s_options, start_time = '0s') {
    return Object.assign(s_options,
        {
            executor: 'constant-arrival-rate',
            preAllocatedVUs: 2,
            duration: '1m',
            rate: 1,
            exec: s_name,
            startTime: start_time
        }
    );
}

// ---
// Суммация сценариев

export const options = {
    scenarios: {
        scenario_1: scenario_from_options('script_1', cloakroom_1.options),
        scenario_2: scenario_from_options('script_2', cloakroom_2.options, '1m')
    }
}

// ---
// Общая инициализация

export function setup() {
    return {
        data_1: cloakroom_1.setup ? cloakroom_1.setup() : null,
        data_2: cloakroom_2.setup ? cloakroom_2.setup() : null
    };
}

// ---
// Проброс скриптов

export function script_1(data) {
    cloakroom_1.default(data.data_1);
}

export function script_2(data) {
    cloakroom_2.default(data.data_2);
}

// ---
// Общее завершение

export function teardown(data) {
    if (cloakroom_1.teardown) cloakroom_1.teardown(data.data_1);
    if (cloakroom_2.teardown) cloakroom_2.teardown(data.data_2);
}
