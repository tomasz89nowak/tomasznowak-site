import React from 'react';
import {Field}  from '../Form';
import Router from 'next/router';

import {postUser, putUser} from '../../ducks/user';


class UserForm extends React.Component {
  constructor({initialData}) {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.getProps = this.getProps.bind(this);
    this.submit = this.submit.bind(this);
    const initialState = {
      username: '',
      email: '',
      password: '',
      avatar: null
    };
    this.state = initialData || initialState;
  }
  static getInitialProps() {
    return {};
  }

  handleChange(newState) {
    this.setState(newState);
  }

  postOrPut = (data) => {
    if(this.props.initialData) {
      return putUser(data, this.props.url.query.id);
    } else {
      return postUser(data);
    }
  };

  submit(e) {
    e.preventDefault();
      const data = {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      };
    this.props.dispatch(this.postOrPut(data)).then(({status}) =>{
      if(status === 'success') {
        Router.push('/admin?tab=users');
      }
    });
  }

  getProps(name){
    return {
      name,
      onChange: this.handleChange,
      value: this.state[name],
      className: 'form-control',
      error: this.props.error,
      label: name
    }
  }

  render() {
    return (
        <div className="sm-6 sm-offset-3">
          <div className="panel">
            <div className="panel-body">
              <form className="form" onSubmit={this.submit} ref={form => this.form = form}>
                <Field {...this.getProps('username')} />
                <Field {...this.getProps('email')} />
                <Field {...this.getProps('password')} type="password" />
                <Field {...this.getProps('avatar')} field="file" onChange={undefined} />
                <button type="submit">submit</button>
              </form>

            </div>
          </div>
        </div>
    )
  }
}

export default UserForm;