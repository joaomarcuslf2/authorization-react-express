import React from 'react';
import { Link } from 'react-router';
import R from 'ramda';

const hasProp = R.curry((prop, obj) => obj[prop] || false);
const isTouched = hasProp('touched');
const hasError = hasProp('error');
const isTouchedAndHasError = R.curry((fn1, fn2, obj) => fn1(obj) && fn2(obj))(isTouched, hasError);
const isDisable = (...args) => R.map(a => a.error, args).filter(a => a === true).length > 0;

const RegisterPage = ({ fields: { username, password, email }, registerUser }) => (
  <form className="subtitle has-shadow" onSubmit={registerUser}>
    <label className="label" htmlFor="username">Username:</label>
    <p className="control">
      <input
        className={`input ${isTouchedAndHasError(username) ? 'is-danger' : ''}`}
        type="text"
        placeholder="Type your username"
        {...username}
      />
    </p>
    <label className="label" htmlFor="password">Password:</label>
    <p className="control">
      <input
        className={`input ${isTouchedAndHasError(password) ? 'is-danger' : ''}`}
        type="password"
        placeholder="Type your password"
        {...password}
      />
    </p>
    <label className="label" htmlFor="email">E-mail:</label>
    <p className="control">
      <input
        className={`input ${isTouchedAndHasError(email) ? 'is-danger' : ''}`}
        type="email"
        placeholder="Type your e-mail"
        {...email}
      />
    </p>
    <p className="control">
      <Link to="/login">Already have an account?</Link>
    </p>

    <div className="control is-grouped is-pulled-right">
      <p className="control">
        <button
          type="submit"
          className="button is-primary"
          disabled={isDisable(username, password, email)}
        >
          Submit
        </button>
      </p>
      <p className="control">
        <Link to="/">
          <button className="button is-danger">Cancel</button>
        </Link>
      </p>
    </div>
  </form>
);

RegisterPage.propTypes = {
  fields: React.PropTypes.shape({
    username: React.PropTypes.object,
    password: React.PropTypes.object,
    email: React.PropTypes.object,
  }),
  registerUser: React.PropTypes.func.isRequired,
};

RegisterPage.defaultProps = {
  fields: {
    username: {},
    password: {},
    email: {},
  },
};

export default RegisterPage;
