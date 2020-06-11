const User = require('../../models/User');
import React from 'react';

// import './App.css';

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languageKnown: 'English',
      languageLearning: 'English',
      currentLocation: 'U.S.A.',
      // below is Keith's states, pasted
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: ''
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
  }

  render() {
    return (
      <form>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <label>
          Password:
          <input type="text" name="password" />
        </label>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Language known:
        
        <select value={this.state.languageKnown}>
        <option value="English">English</option>
        <option value="Spanish">Spanish</option>
        <option value="Mandarin">Mandarin</option>
        <option value="Hindi">Hindi</option>
        <option value="German">German</option>
        <option value="French">French</option>
      </select>
      </label>
      <label>
        Language I want to learn:

        <select value={this.state.languageLearning}>
        <option value="English">English</option>
        <option value="Spanish">Spanish</option>
        <option value="Mandarin">Mandarin</option>
        <option value="Hindi">Hindi</option>
        <option value="German">German</option>
        <option value="French">French</option>
        </select>
      </label>
      {/* stretch goal: generate a comprehensive list of countries...country region dropdown menu */}
      <label>
        My country of origin:

        <select value={this.state.currentLocation}>
        <option value="U.S.A.">U.S.A.</option>
        <option value="UK">UK</option>
        <option value="India">India</option>
        <option value="China">China</option>
        <option value="Indonesia">Indonesia</option>
        <option value="Pakistan">Pakistan</option>
        <option value="Nigeria">Nigeria</option>
        <option value="Brazil">Brazil</option>
        <option value="Germany">Germany</option>
        <option value="France">France</option>
        </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

// module.exports = {
//   db: 'mongodb://username:password@url:port/db',
//   db_dev: 'mongodb://url:port/db'
// }

//username password, name, language known, language learning, general location (country)
