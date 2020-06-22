import { Lobby, Login } from 'lichessy/components'

const routes = {
  protected: [
    {
      path: '/',
      component: Lobby
    }
  ],
  public: [
    {
      path: '/login',
      component: Login
    }
  ]
}

export default routes
