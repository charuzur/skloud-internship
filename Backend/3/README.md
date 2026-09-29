    # Extend the Task API

    ## Task 1 Implement Registration
    POST /users

    ## Requirements
    name
    email
    password

    ## Task 2 Registration

    POST /sessions

    - Successful authentication should issue an access token.

    ## Task 3 Protected endpoint

    GET /me

    - It must require authentication and return the authenticated user.

    ## Task 4 Protect task routes

    Require authentication for:

    GET    /tasks
    POST   /tasks
    PATCH  /tasks/:id
    DELETE /tasks/:id

    ## Task 5 Ownership

    A user must not be able to update or delete another user's task.
    Current access-token authentication accepts the token through the bearer Authorization header, and auth middleware can reject missing, invalid, or expired credentials before protected handlers run.
