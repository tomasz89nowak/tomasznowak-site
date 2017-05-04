import React from 'react';
import withRedux from 'next-redux-wrapper';
import {initStore} from '../store';

import Head from 'next/head';
import AdminContainer from '../Components/AdminContainer';
import {getSkills, postSkill} from '../ducks/skills';

import {Form} from '../Components/Form';

class CreateSkill extends React.Component {
  constructor() {
    super();
    this.formJson = {
      fields: [
        {name: 'name'},
        {name: 'progress'},
      ],
      submitText: 'Wyślij'
    };
  }

  static getInitialProps({store, isServer}) {
    return {};
  }

  componentDidMount() {
    // this.props.dispatch(getSkills());
  }

  render() {
    return (
      <AdminContainer>
        <Head>
          <title>Tomasz Nowak - CMS: create skill</title>
        </Head>
        <div>
          <Form
            data={this.formJson}
            post={postSkill}
            dispatch={this.props.dispatch}
            callback="/admin?tab=skills"
          />
        </div>
      </AdminContainer>
    )
  }
}

function mapState(state){
  return {
    state
  }
}

export default withRedux(initStore, mapState)(CreateSkill);