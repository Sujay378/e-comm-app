export const config = {
  production: false,
  host: 'localhost:3000',
  protocol: 'http',
  apis: {
    content : {
      global: 'content'
    },
    auth: {
      login: 'auth/login',
      register: 'auth/register'
    }
  }
}
