import React from 'react';

import Head from 'next/head';
import Header from '../Components/Header';
import {Loader} from '../utilities';

import {checkAuth} from '../ducks/auth';

class AdminContainer extends React.Component {
  constructor(){
    super();
    this.state = {};
  }
  static getInitialProps({store, isServer}) {
    return {};
  }

  componentDidMount() {
    const loggedIn = checkAuth();
    this.setState({loggedIn});
  }

  render() {
    if(this.state.loggedIn){
      return (
        <div className="container">

          <Head>
            <title>Tomasz Nowak - CMS</title>
            <link href="./static/css/global.css" rel="stylesheet" type="text/css" />
            <link href="./static/css/admin.css" rel="stylesheet" type="text/css" />
          </Head>

          <Header url={null} />

          <div className="content">
            {this.props.children}
          </div>

        </div>
      )
    } else {
      return <Loader/>
    }
  }
}

export default AdminContainer;