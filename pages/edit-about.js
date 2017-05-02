import React from 'react';
import withRedux from 'next-redux-wrapper';
import {initStore} from '../store';

import Head from 'next/head';
import AdminContainer from '../Components/AdminContainer';
import {getAbout} from '../ducks/about';

import {STATIC_URL} from '../ENDPOINTS';

class EditAbout extends React.Component {
  constructor() {
    super();
  }

  static getInitialProps({store, isServer}) {
    return {};
  }

  componentDidMount() {
    this.props.dispatch(getAbout());
  }

  render() {
    const {about, isFetching} = this.props;
    return (
      <AdminContainer>
        <Head>
          <title>Tomasz Nowak - CMS: edit user</title>
        </Head>
        {about && !isFetching &&
        <div>tutaj formularz</div>
        }
      </AdminContainer>
    )
  }
}

function mapState(state){
  return {
    about: state.about.result,
    isFetching: state.about.isFetching,
    error: state.about.error ? state.about.error.errors : false
  }
}

export default withRedux(initStore, mapState)(EditAbout);