import React, { Component } from 'react';
import './App.css';
// API
import BaseAPI from './api/BaseAPI';
// Components
import LoginForm from './components/LoginForm';

class App extends Component {
  state = {
    username: '',
    password: '',
  }

  onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const token = await BaseAPI.onLogin(username, password);
      const user = await BaseAPI.onGetUserInfo(token.accessToken);
      console.log(user);
    } catch (error) {
      console.log('Catch Error {LOGIN}', error);
    }
  }

  render() {
    return (
      <div className="container">
        <header className="App-header">
          <h1 className="App-title">Example App Using Formik | Axios | Reactstrap </h1>
        </header>
        <LoginForm 
          username={this.state.username} 
          password={this.state.password}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

export default App;
