import * as logger_1 from '../scripts/logger_1.js';
import * as logger_2 from '../scripts/logger_2.js';

function scenario_from_options(scr_name, scr_options = {}, start_time = '0s') {
    return Object.assign(scr_options,
        {
            executor: 'ramping-arrival-rate',
            preAllocatedVUs: 2,
            stages: [
                { target: 2, duration: '1m' },
                { target: 0, duration: '0m' }
            ],
            exec: scr_name,
            startTime: start_time
        }
    );
}

// ---
// Суммация сценариев

export const options = {
    scenarios: {
        scenario_logger_1: scenario_from_options('scr_logger_1', logger_1.options),
        scenario_logger_2: scenario_from_options('scr_logger_2', logger_2.options, '1m')
    }
}

// ---
// Общая инициализация

export function setup() {
    return {
        dt_logger_1: logger_1.setup ? logger_1.setup() : null,
        dt_logger_2: logger_2.setup ? logger_2.setup() : null
    };
}

// ---
// Проброс скриптов

export function scr_logger_1(data) {
    logger_1.default(data.dt_logger_1);
}

export function scr_logger_2(data) {
    logger_2.default(data.dt_logger_2);
}

// ---
// Общее завершение

export function teardown(data) {
    if (logger_1.teardown) logger_1.teardown(data.dt_logger_1);
    if (logger_2.teardown) logger_2.teardown(data.dt_logger_2);
}
