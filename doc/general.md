# General info

## Request

All requests body should follow the interface:

```
interface RequestBody<T> {
  data: T,
}
```

## Response

All response body should follow one of the following interfaces:

- success response:

```
interface ResponseBodySuccess<T> {
  data: T,
}
```

- response with an error:

```
interface ResponseBodyError<E> {
  error: {
    code: number,
    message: string,
    data?: E,
  }
}
```

## Failed request

If there is no response in 10000ms - the request is cancelled and user is informed about it. Run the process to auto-check if backend is available. When backend is alive - inform user about it.
