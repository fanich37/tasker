import { TaskStatus, TaskType } from 'enums';

const USERS_MOCK: User[] = [
  {
    id: 'd67db9a9-c755-44f7-8e95-4da5510adc3e',
    login: 'john',
    password: '123',
    avatar: null,
    name: null,
    question: 'What is your favourite weather season?',
    answer: 'winter',
  },
  {
    id: 'bf3339ab-af15-428a-ad7f-154a38a01d95',
    login: 'steve',
    password: '321',
    avatar: null,
    name: null,
    question: null,
    answer: null,
  },
];

const TASKS_MOCK: Task[] = [
  {
    id: '4c29ae82-97b1-4a4c-8416-86ea52d51311',
    title: 'Create new task',
    type: TaskType.Analisys,
    status: TaskStatus.ToDo,
    plannedDateStart: new Date().toISOString(),
    plannedDateEnd: new Date().toISOString(),
    actualDateStart: null,
    actualDateEnd: null,
    userId: 'd67db9a9-c755-44f7-8e95-4da5510adc3e',
  },
];

export const MOCK_DB = {
  user: USERS_MOCK,
  tasks: TASKS_MOCK,
};
