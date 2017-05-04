import React from 'react';
import withRedux from 'next-redux-wrapper';
import {initStore} from '../store';

import Head from 'next/head';
import AdminContainer from '../Components/AdminContainer';
import {getSkill, putSkill} from '../ducks/skills';

import {Form} from '../Components/Form';

class EditSkill extends React.Component {
  constructor() {
    super();
    this.formJson = {
      fields: [
        {name: 'name'},
        {name: 'progress'},
      ],
      submitText: 'Wyślij'
    };
    this.state = {
      result: null
    }
  }

  static getInitialProps({store, isServer}) {
    return {};
  }

  componentDidMount() {
    this.props.dispatch(getSkill(this.props.url.query.id)).then(result => {
      this.setState({result: result.data});
    });
  }

  render() {
    return (
      <AdminContainer>
        <Head>
          <title>Tomasz Nowak - CMS: edit skill</title>
        </Head>
        <div>
          {this.state.result &&
          <Form
            {...this.props}
            data={this.formJson}
            initialData={this.state.result}
            put={putSkill}
            dispatch={this.props.dispatch}
            callback="/admin?tab=skills"
          />
          }
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

export default withRedux(initStore, mapState)(EditSkill);