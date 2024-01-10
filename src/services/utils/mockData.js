/**
 * You don't need to make any changes to this module
 */

import { faker } from '@faker-js/faker';
import sample from 'lodash.sample';
import { capitalCase } from 'change-case';

import { TASK_STATUS } from '@utils/constants';

export const AVATAR_URLS = [
    'https://gravatar.com/avatar/aa902b27c91cbe8b58bd72560ed7d51e?s=400&d=robohash&r=pg',
    'https://gravatar.com/avatar/924c7c5825b606377bb8d20f8c3b7df2?s=400&d=robohash&r=pg',
    'https://gravatar.com/avatar/76d88c5da052504e3fd04b26bd8edb83?s=400&d=robohash&r=pg',
    'https://gravatar.com/avatar/212b98529411816fa382f29276212f60?s=400&d=robohash&r=pg',
    'https://gravatar.com/avatar/b4c873843ce789bd776cc7c9b34cc660?s=400&d=robohash&r=pg',
    'https://avatars.dicebear.com/v2/male/10d1d34b90d6d36afc6f628632716047.svg',
    'https://avatars.dicebear.com/v2/male/4f12010f8b16ee9ca53b4a4879619143.svg',
    'https://avatars.dicebear.com/v2/male/a2f66e17889395a38d393312751d2817.svg',
    'https://avatars.dicebear.com/v2/female/3e18ab6fbb9974b6c12af4f327231862.svg',
    'https://avatars.dicebear.com/v2/female/346cdd1913dc82b0344bea54842e7d4c.svg',
    'https://avatars.dicebear.com/v2/female/6d3ed31f487bfde4c709b844811b5e63.svg',
    'https://avatars.dicebear.com/v2/gridy/c9a49585be13bb8ef987e4816d968032.svg',
    'https://gravatar.com/avatar/3f15d5d4e68569c76d5be484bbe7bb17?s=400&d=identicon&r=x',
    'https://gravatar.com/avatar/bd2557479c8bd213453f7901059ff2ad?s=400&d=identicon&r=x',
    'https://gravatar.com/avatar/6560935e5744cde873d10908e5a1793c?s=400&d=identicon&r=x'
  ];

const taskStatuses = Object.values(TASK_STATUS);

export function createTask(status) {
  return {
    status: status || sample(taskStatuses),
    avatarUrl: sample(AVATAR_URLS),
    source: faker.name.fullName(),
    title: capitalCase(`${faker.company.bsBuzz()} Task`),
    message: faker.lorem.sentence(),
    taskRef: faker.finance.creditCardNumber('###-###-###-##'),
    dateCreated: faker.date.between('2023-12-01', '2024-01-11').toLocaleDateString(),
    dateCompleted: status === TASK_STATUS.COMPLETE ?
      faker.date.between(status || sample(taskStatuses), Date.now()).toLocaleDateString() : '',
  };
}