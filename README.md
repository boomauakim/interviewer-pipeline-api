# Interviewer Pipeline Management APIs

API for Managing the Interviewer's State in the Pipeline.

## Requirements

1. Docker
2. Docker Compose

## Running the app

```bash
# docker compose
$ docker compose up

# docker compose (background process)
$ docker compose up -d
```

## Swagger

You can access Swagger using the URL `http://127.0.0.1:3000/docs`.

## Login Credentials

Use the details provided below to log in (`/v1/auth/login`) and obtain an access token.

| Email              |   Password   |
| ------------------ | :----------: |
| tony@avenger.team  | xacTUDleveNO |
| roger@avenger.team | 2zfTnUYV599H |

## Rate Limiting

The rate limit set is `10 Requests per 10 Seconds`.

## Test

1. Install Dependencies.

```bash
# npm
$ npm install

# pnpm
$ pnpm install
```

2. Running the unittests.

```bash
# npm
$ npm run test

# pnpm
$ pnpm run test
```
