# Auth0 Session Storage

## Running application

1. Install dependencies

```
$ npm install
```

2. Create an account configure account on Auth0

**Configure Callback URLs:**

A callback URL is a URL in your application where Auth0 redirects the user after they have authenticated.
The value for this example should be: http://localhost:3000/callback

**Configure Logout URLs:**

A logout URL is a URL in your application that Auth0 can return to after the user has been logged out of the authorization server. This is specified in the returnTo query parameter.
The value for this example should be: http://localhost:3000

3. Create the `.env` file

Once you have an account on Auth0 you can get the credentials.

![Auth0 settings](public/img/auth0-settings.png)

```
AUTH0_CLIENT_ID=
AUTH0_DOMAIN=
AUTH0_CLIENT_SECRET=
AUTH0_CALLBACK_URL=
```

4. Start Redis Docker container

```
$ npm run redis:start
```

5. Start application

```
$ npm start
```
