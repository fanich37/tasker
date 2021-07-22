type ErrorCode = number;
type ErrorMessage = string;
type UUID = string;
type Login = string;
type Password = string;
type Question = string;
type Answer = string;
type Name = string;
type DateTimeISOString = string;
type TaskTitle = string;
type Token = string;

interface RequestBody<T> {
  data: T;
}

interface ResponseBodyError<E> {
  error: {
    code: ErrorCode;
    message: ErrorMessage;
    data?: E;
  };
}

interface ResponseBodySuccess<T> {
  data: T;
}

type ApiResponse<T, E> = ResponseBodySuccess<T> & ResponseBodyError<E>;

type User = {
  id: UUID;
  login: Login;
  password: Password;
  avatar: URL['href'] | null;
  name: Name | null;
  question: Question | null;
  answer: Answer | null;
};

type Task = {
  id: UUID;
  title: TaskTitle;
  type: TaskType;
  status: TaskStatus;
  plannedDateStart: DateTimeISOString;
  plannedDateEnd: DateTimeISOString;
  actualDateStart: DateTimeISOString | null;
  actualDateEnd: DateTimeISOString | null;
  userId: User['id'];
};

type TaskSearchParams = {
  taskId?: Task['id'];
  title?: Task['title'];
  type?: Task['type'];
  status?: Task['status'];
  plannedDateStartFrom?: Task['plannedDateStart'];
  plannedDateStartTo?: Task['plannedDateStart'];
  plannedDateEndFrom?: Task['plannedDateEnd'];
  plannedDateEndTo?: Task['plannedDateEnd'];
  actualDateStartFrom?: Task['actualDateStart'];
  actualDateStartTo?: Task['actualDateStart'];
  actualDateEndFrom?: Task['actualDateEnd'];
  actualDateEndTo?: Task['actualDateEnd'];
  userId?: Task['userId'];
};
