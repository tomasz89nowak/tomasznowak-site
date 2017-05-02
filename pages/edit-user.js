import React from 'react';
import withRedux from 'next-redux-wrapper';
import {initStore} from '../store';

import Head from 'next/head';
import AdminContainer from '../Components/AdminContainer';
import UserForm from '../Components/Forms/UserForm';
import {getUser} from '../ducks/user';

import {STATIC_URL} from '../ENDPOINTS';

class CreateUser extends React.Component {
  constructor() {
    super();
  }

  static getInitialProps({store, isServer}) {
    return {};
  }

  componentDidMount() {
    this.props.dispatch(getUser(this.props.url.query.id));
  }

  render() {
    const {user, isFetching} = this.props;
    return (
      <AdminContainer>
        <Head>
          <title>Tomasz Nowak - CMS: edit user</title>
        </Head>
        {user &&
        !isFetching &&
        <UserForm {...this.props} initialData={{...user, avatar: user.avatar ? STATIC_URL + user.avatar.path : null}} />}
      </AdminContainer>
    )
  }
}

function mapState(state){
  return {
    user: state.user.result,
    isFetching: state.user.isFetching,
    error: state.user.error ? state.user.error.errors : false
  }
}

export default withRedux(initStore, mapState)(CreateUser);