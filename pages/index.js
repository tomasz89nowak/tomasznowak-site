import React from 'react';
import Link from 'next/link';
import withRedux from 'next-redux-wrapper';
import {initStore} from '../store';

import LinkedIn from 'react-icons/lib/ti/social-linkedin-circular';
import Twitter from 'react-icons/lib/ti/social-twitter-circular';
import Github from 'react-icons/lib/ti/social-github-circular';
import Facebook from 'react-icons/lib/ti/social-facebook-circular';

import Head from 'next/head';

import {getNotes} from '../ducks/articles';

class Index extends React.Component {
  static getInitialProps({store, isServer}){
    console.log(store)
    return {asd:'asd', isServer};
  }
  componentDidMount(){
    this.props.dispatch(getNotes());
  }
  render(){
    console.log(this.props.articles)
    return (
      <div>
        <Head>
          <title>Tomasz Nowak - frontend && javascript developer</title>
          <link href="./static/css/global.css" rel="stylesheet" type="text/css" />
          <link href="./static/css/pages/index.css" rel="stylesheet" type="text/css" />
        </Head>
        <div className="text-center">
          <h1 className="font-ss">Tomasz Nowak</h1>
          <p>Where you can find me?</p>
          <LinkedIn className="svg-icon linkedin-icon" />
          <Twitter className="svg-icon" />
          <Github className="svg-icon" />
          <Facebook className="svg-icon" />
        </div>

        {this.props.articles.map(article =>
          <div>{article.title}</div>)}

        <Link href="/asd"><a>aasd</a></Link>
      </div>
    )
  }
}

function mapState(state){
  return {
    articles: state.articles.result || []
  }
}

export default withRedux(initStore, mapState)(Index);