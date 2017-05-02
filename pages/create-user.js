import React from 'react';
import withRedux from 'next-redux-wrapper';
import {initStore} from '../store';

import Head from 'next/head';
import AdminContainer from '../Components/AdminContainer';
import UserForm from '../Components/Forms/UserForm';

class CreateUser extends React.Component {
  constructor() {
    super();
  }

  static getInitialProps({store, isServer}) {
    return {};
  }

  render() {
    return (
      <AdminContainer>
        <Head>
          <title>Tomasz Nowak - CMS: create article</title>
        </Head>
        <UserForm {...this.props} />
      </AdminContainer>
    )
  }
}

function mapState(state){
  return {
    article: state.user.result,
    error: state.user.error ? state.user.error.errors : false
  }
}

export default withRedux(initStore, mapState)(CreateUser);