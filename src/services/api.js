/**
 * You don't need to make any changes to this module
 */

import { createTask } from './utils/mockData';
import { sleep } from './utils/helpers';
import { TASK_STATUS } from '@utils/constants';

export async function getTask() {
    await sleep();
    return createTask(TASK_STATUS.IN_PROGRESS);
}

export async function getTasks(count = 10) {
    await sleep();
    return Array(count).fill().map((_, i) => createTask(i < 3 ? TASK_STATUS.COMPLETE : TASK_STATUS.IN_PROGRESS));
}