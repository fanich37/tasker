import { v4 as uuid } from 'uuid';
import { TaskStatus } from 'enums';
import { parseToken } from 'utils/parse-token';
import { MOCK_DB } from './mock-data';

class ResponseBodyError<E> implements ResponseBodyError<E> {
  error: {
    code: ErrorCode;
    message: ErrorMessage;
    data?: E;
  };

  constructor(code: ErrorCode, message: ErrorMessage, data?: E) {
    this.error = {
      code,
      message,
      data,
    };
  }

  get body() {
    return JSON.parse(JSON.stringify(this));
  }
}

class MockServer {
  static async delay(isOk: boolean = true) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        const message = isOk ? 'Ok' : 'Internal server error';

        (isOk ? res : rej)(message);
      }, Math.random() * 1000);
    });
  }

  public async loginUser(
    body: RequestBody<Pick<User, 'login' | 'password'>>,
    isOk: boolean = true
  ) {
    const { login, password } = body.data;

    try {
      await MockServer.delay(isOk);

      if (!login || !password) {
        return new ResponseBodyError(400, 'Bad request', {
          login: login ? undefined : 'Login is required',
          password: password ? undefined : 'Password is required',
        }).body;
      }

      const user = MOCK_DB.user.find((user) => user.login === login);

      if (!user) {
        return new ResponseBodyError(400, 'Bad request', {
          login: `There is no user with login "${login}"`,
        }).body;
      }

      if (user.password !== password) {
        return new ResponseBodyError(400, 'Bad request', {
          password: 'Password is not valid',
        }).body;
      }

      const { password: _, ...rest } = user;
      const token = JSON.stringify({ session: uuid(), user: rest });
      return { data: { token } };
    } catch (error) {
      throw new Error(`[MockServer][loginUser]. Error: ${error.message}.`);
    }
  }

  public async createUser(
    body: RequestBody<Pick<User, 'login' | 'password'>>,
    isOk: boolean = true
  ) {
    const { login, password } = body.data;

    try {
      await MockServer.delay(isOk);

      if (!login || !password) {
        return new ResponseBodyError(400, 'Bad request', {
          login: login ? undefined : 'Login is required',
          password: password ? undefined : 'Password is required',
        }).body;
      }

      const isUserAlreadyExist = MOCK_DB.user.some(
        (user) => user.login === login
      );

      if (isUserAlreadyExist) {
        return new ResponseBodyError(400, 'Bad request', {
          login: `Login "${login}" is not available`,
        }).body;
      }

      MOCK_DB.user.push({
        id: uuid(),
        login,
        password,
        name: null,
        avatar: null,
        question: null,
        answer: null,
      });

      return { data: {} };
    } catch (error) {
      throw new Error(`[MockServer][createUser]. Error: ${error.message}.`);
    }
  }

  public async requestSecretQuestion(
    body: RequestBody<Pick<User, 'login'>>,
    isOk: boolean = true
  ) {
    const { login } = body.data;

    try {
      await MockServer.delay(isOk);

      if (!login) {
        return new ResponseBodyError(400, 'Bad request', {
          login: 'Login is required',
        }).body;
      }

      const user = MOCK_DB.user.find((user) => user.login === login);

      if (!user) {
        return new ResponseBodyError(400, 'Bad request', {
          login: `There is no user with login "${login}"`,
        }).body;
      }

      if (!user.question) {
        return new ResponseBodyError(400, 'Bad request', {
          login: `User with login "${login}" does not have secret question`,
        }).body;
      }

      return { data: { question: user.question } };
    } catch (error) {
      throw new Error(
        `[MockServer][requestSecretQuestion]. Error: ${error.message}.`
      );
    }
  }

  public async restorePassword(
    body: RequestBody<Pick<User, 'login' | 'answer' | 'password'>>,
    isOk: boolean = true
  ) {
    const { login, answer, password } = body.data;

    try {
      await MockServer.delay(isOk);

      if (!login || !password || !answer) {
        return new ResponseBodyError(400, 'Bad request', {
          login: login ? undefined : 'Login is required',
          answer: answer ? undefined : 'Answer is required',
          password: password ? undefined : 'Password is required',
        }).body;
      }

      const user = MOCK_DB.user.find((user) => user.login === login);

      if (!user || (user && user.answer !== answer)) {
        return new ResponseBodyError(400, 'Bad request', {
          login: user ? undefined : `There is no user with login "${login}"`,
          answer:
            user && user.answer !== answer
              ? 'The answer you provided do not match'
              : undefined,
        }).body;
      }

      user.password = password;

      return { data: { status: 'ok' } };
    } catch (error) {
      throw new Error(
        `[MockServer][restorePassword]. Error: ${error.message}.`
      );
    }
  }

  public async editUser(
    body: RequestBody<Exclude<User, 'id' | 'password' | 'login'>>,
    headers: { token?: Token } = {},
    isOk: boolean = true
  ) {
    const {
      avatar = null,
      question = null,
      answer = null,
      name = null,
    } = body.data;
    const { token } = headers;

    try {
      await MockServer.delay(isOk);

      if (!token) {
        return new ResponseBodyError(401, 'Unauthorized').body;
      }

      const { id } = parseToken(token);
      const user = MOCK_DB.user.find((user) => user.id === id);

      if (!user) {
        return new ResponseBodyError(401, 'Unauthorized').body;
      }

      user.avatar = avatar;
      user.question = question;
      user.answer = answer;
      user.name = name;

      const { password, ...rest } = user;

      return { data: { ...rest } };
    } catch (error) {
      throw new Error(`[MockServer][editUser]. Error: ${error.message}.`);
    }
  }

  public async createTask(
    body: RequestBody<
      Exclude<Task, 'id' | 'userId' | 'actualDateStart' | 'actualDateEnd'>
    >,
    headers: { token?: Token } = {},
    isOk: boolean = true
  ) {
    const { title, type, plannedDateStart, plannedDateEnd } = body.data;
    const { token } = headers;

    try {
      await MockServer.delay(isOk);

      if (!token) {
        return new ResponseBodyError(401, 'Unauthorized').body;
      }

      const { id } = parseToken(token);
      const user = MOCK_DB.user.find((user) => user.id === id);

      if (!user) {
        return new ResponseBodyError(401, 'Unauthorized').body;
      }

      if (!title || !type || !plannedDateStart || !plannedDateEnd) {
        return new ResponseBodyError(400, 'Bad request', {
          title: title ? undefined : 'Task title is required',
          type: type ? undefined : 'Task type is required',
          plannedDateStart: plannedDateStart
            ? undefined
            : 'Planned date start is required',
          plannedDateEnd: plannedDateEnd
            ? undefined
            : 'Planned date end is required',
        });
      }

      const task = {
        id: uuid(),
        title,
        type,
        status: TaskStatus.ToDo,
        plannedDateStart,
        plannedDateEnd,
        actualDateStart: null,
        actualDateEnd: null,
        userId: user.id,
      };

      MOCK_DB.tasks.push(task);

      return { data: { taskId: task.id } };
    } catch (error) {
      throw new Error(`[MockServer][createTask]. Error: ${error.message}.`);
    }
  }

  public async editTask(
    body: RequestBody<
      Exclude<Task, 'userId' | 'actualDateStart' | 'actualDateEnd'>
    >,
    headers: { token?: Token } = {},
    isOk: boolean = true
  ) {
    const {
      id,
      title,
      status,
      type,
      plannedDateStart,
      plannedDateEnd,
      actualDateStart,
      actualDateEnd,
    } = body.data;
    const { token } = headers;

    try {
      await MockServer.delay(isOk);

      if (!token) {
        return new ResponseBodyError(401, 'Unauthorized').body;
      }

      const { id: userId } = parseToken(token);
      const user = MOCK_DB.user.find((user) => user.id === userId);

      if (!user) {
        return new ResponseBodyError(401, 'Unauthorized').body;
      }

      if (!title || !type || !plannedDateStart || !plannedDateEnd) {
        return new ResponseBodyError(400, 'Bad request', {
          title: title ? undefined : 'Task title is required',
          type: type ? undefined : 'Task type is required',
          plannedDateStart: plannedDateStart
            ? undefined
            : 'Planned date start is required',
          plannedDateEnd: plannedDateEnd
            ? undefined
            : 'Planned date end is required',
        });
      }

      const task = MOCK_DB.tasks.find((task) => task.id === id);

      if (!task) {
        return new ResponseBodyError(404, 'Not found');
      }

      task.title = title;
      task.status = status;
      task.type = type;
      task.plannedDateStart = plannedDateStart;
      task.plannedDateEnd = plannedDateEnd;
      task.actualDateStart = actualDateStart;
      task.actualDateEnd = actualDateEnd;

      return { data: { ...task } };
    } catch (error) {
      throw new Error(`[MockServer][createTask]. Error: ${error.message}.`);
    }
  }

  public async getTasks(
    params: TaskSearchParams = {},
    headers: { token?: Token } = {},
    isOk: boolean = true
  ) {
    const { taskId, title, status, type, userId } = params;
    const { token } = headers;

    try {
      await MockServer.delay(isOk);

      if (!token) {
        return new ResponseBodyError(401, 'Unauthorized').body;
      }

      const { id: authorizedUserId } = parseToken(token);
      const user = MOCK_DB.user.find((user) => user.id === authorizedUserId);

      if (!user) {
        return new ResponseBodyError(401, 'Unauthorized').body;
      }

      const tasks = MOCK_DB.tasks.filter((task) => {
        if (taskId && task.id === taskId) {
          return true;
        }

        let byUserId = !userId;
        let byTitle = !title;
        let byType = !type;
        let byStatus = !status;

        if (userId) {
          byUserId = task.userId === userId;
        }

        if (title) {
          byTitle = task.title.toLowerCase().includes(title.toLowerCase());
        }

        if (type) {
          byType = task.type === type;
        }

        if (status) {
          byStatus = task.status === status;
        }

        return byUserId && byTitle && byType && byStatus;
      });

      return { data: tasks };
    } catch (error) {
      throw new Error(`[MockServer][getTasks]. Error: ${error.message}.`);
    }
  }
}

export const api = new MockServer();
