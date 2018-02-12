import { Switch, Route } from 'react-router-dom';

const Main = () => {
  <main>
    <Switch>
      <Route exact path='/' component={NextList} />
      <Route path='/graph' component={Graph} />
      <Route path='/login' component={LogIn} />
    </Switch>
  </main>
}
