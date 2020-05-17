import React from 'react';
import { Switch } from 'react-router-dom';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import AuthPage from './pages/auth/auth.component';
import HomePage from './pages/home/home.component';
import AdminPage from './pages/admin/admin.component';
import PrivateRoute from './routers/private-route';
import PublicRoute from './routers/public-route'
import './App.css';

class App extends React.Component {
  render () {
    return (
      <React.Fragment>
      <Header />
        <Switch>
          <PrivateRoute path="/" component={HomePage} exact={true} />
          <PublicRoute path="/signin" component={AuthPage} componentProps={{pageType: 'sign-in'}} />
          <PublicRoute path="/signup" component={AuthPage} componentProps={{pageType: 'sign-up'}} />
          <PublicRoute path="/forgotpassword" component={AuthPage} componentProps={{pageType: 'forgot-password'}} />
          <PrivateRoute path="/admin" component={AdminPage} />
        </Switch>
      <Footer />
      </React.Fragment>
    );
  }
}

export default App;
