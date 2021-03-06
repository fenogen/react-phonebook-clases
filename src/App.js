import React, { Suspense, lazy } from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import route from './routes/routes';
import PrivateRoute from './routes/PrivateRoute';
import PublickRoute from './routes/PublickRoute';

import { getAllContacts} from './api/operation-register';
import { selAuthorization} from './redux/phonebook/selectors';

import AppBar from './components/AppBar/AppBar';

import './App.css';

const HomePage = lazy(() =>
  import('./pages/Home/HomePage.js' /*webpackChunkName: "HomePage"*/),
);
const LoginPage = lazy(() =>
  import('./pages/Login/LoginPage' /*webpackChunkName: "LoginPage"*/),
);
const RegisterPage = lazy(() =>
  import('./pages/Register/RegisterPage' /*webpackChunkName: "RegisterPage"*/),
);
const ContactsPage = lazy(() =>
  import('./pages/Contacts/ContactsPage' /*webpackChunkName: "ContactsPage"*/),
);

class App extends React.Component {
  
  componentDidMount() {
    if (this.props.isAuthorized) {
      this.props.disGetAllContacts();
    }
  }

    componentDidUpdate() {
    if (this.props.isAuthorized) {
      this.props.disGetAllContacts();
    }
  }

  render() {
    return (
      <div className="App">
        <Suspense
          fallback={
            <h3 style={{marginTop: 200, color: '#ff6b6b'}}>Loading...</h3>
          }
        >
          <AppBar />
          <Switch>
            <PublickRoute
              exact
              path={route.home}
              component={HomePage}
              redirectTo={route.contacts}
              restricted
            />
            <PublickRoute
              path={route.register}
              component={RegisterPage}
              redirectTo={route.contacts}
              restricted
            />
            <PublickRoute
              path={route.login}
              component={LoginPage}
              redirectTo={route.contacts}
              restricted
            />
            <PrivateRoute
              path={route.contacts}
              component={ContactsPage}
              redirectTo={route.home} 
              />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthorized: selAuthorization(state),
})

const mapDispatchToProps = dispatch => ({
  disGetAllContacts: () => dispatch(getAllContacts()),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
