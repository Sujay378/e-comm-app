export const appConfig = {
  production: false,
  host: 'localhost:3000',
  protocol: 'http',
  apis: {
    content : {
      global: 'content'
    },
    auth: {
      login: 'auth/login',
      register: 'auth/register',
      e2e: 'encryption/key'
    },
    session: {
      generate: 'session/generate',
      end: 'session/end'
    }
  }
}
