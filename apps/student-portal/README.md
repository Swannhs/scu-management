# Student Portal

The student portal is a dependency-free single-page application served at `/portal` through Traefik.

It authenticates through `user-service` and uses the gateway for student profile, enrollment, attendance, grades, GPA, and transcript data. Access tokens are kept only in browser session storage.

## Run locally

Start the platform with the canonical Compose file, then open `http://localhost/portal`.

## API routes used

- `POST /v1/auth/login`
- `GET /v1/students/me`
- `GET /v1/sections`
- `POST /v1/enrollments`
- `GET /v1/students/:id/enrollments`
- `GET /v1/attendance/me/summary`
- `GET /v1/grades/me`
- `GET /v1/gpa/me`
- `GET /v1/transcripts/me`

The portal shows an unavailable-data state when a backing service is not running or has no student records yet.
