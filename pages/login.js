import React from 'react';
import withRedux from 'next-redux-wrapper';
import {initStore} from '../store';
import {Field} from '../Components/Form';
import {login, setToken} from '../ducks/auth';
import Head from 'next/head';
import {handleError} from '../utilities';

import Header from '../Components/Header';

import Router from 'next/router'

class Login extends React.Component {
  constructor(){
    super();
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email:'',
      password: ''
    };
  }
  static getInitialProps() {
    return {};
  }

  submit(e) {
    e.preventDefault();
    const data = {user:this.state};
    this.props.dispatch(login(data)).then(resp => {
      if(resp.status === 'success') {
        setToken(resp.status, resp.data);
        Router.push('/admin');
      }
    });
  }

  handleChange(newState) {
    this.setState(newState);
  }

  getProps(name){
    return {
      name,
      onChange: this.handleChange,
      value: this.state[name],
      className: 'form-control',
      error: this.props.error
    }
  }

  render() {
    const {url, error} = this.props;

    return (
      <div className="container">

        <Head>
          <title>Tomasz Nowak - frontend && javascript developer</title>
          <link href="./static/css/global.css" rel="stylesheet" type="text/css" />
          <link href="./static/css/pages/about.css" rel="stylesheet" type="text/css" />
        </Head>
        <Header url={url.pathname} />

        <div className="sm-6">
          <div className="panel">
            <div className="panel-body">
              <form className="form" onSubmit={this.submit} ref={form => this.form = form}>
                {handleError(error, 'credentials')}
                <Field {...this.getProps('email')} />
                <Field {...this.getProps('password')} type="password" />
                <button type="submit">submit</button>
              </form>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapState(state){
  return {
    auth: state.auth.result,
    error:state.auth.error ? state.auth.error.error : null
  }
}

export default withRedux(initStore, mapState)(Login);