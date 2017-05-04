import React from 'react';
import withRedux from 'next-redux-wrapper';
import {initStore} from '../store';

import Head from 'next/head';
import AdminContainer from '../Components/AdminContainer';
import {getAbout, putAbout} from '../ducks/about';

import {STATIC_URL} from '../ENDPOINTS';
import {Form} from '../Components/Form';

class EditAbout extends React.Component {
  constructor() {
    super();
    this.formJson = {
      fields: [
        {name: 'name'},
        {name: 'title'},
        {name: 'image', field: 'file'},
        {name: 'linkedin'},
        {name: 'facebook'},
        {name: 'twitter'},
        {name: 'github'}
      ],
      submitText: 'Wyślij'
    }
  }

  static getInitialProps({store, isServer}) {
    return {};
  }

  componentDidMount() {
    this.props.dispatch(getAbout());
  }

  render() {
    const {about, isFetching, error} = this.props;
    return (
      <AdminContainer>
        <Head>
          <title>Tomasz Nowak - CMS: edit user</title>
        </Head>
        {about &&
        <div>
          <Form
            data={this.formJson}
            error={error}
            put={putAbout}
            dispatch={this.props.dispatch}
            initialData={about}
            callback="/admin?tab=about"
            formdata
          />
        </div>
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