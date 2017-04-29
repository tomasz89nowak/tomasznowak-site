import React from 'react';
import Link from 'next/link';
import withRedux from 'next-redux-wrapper';
import {initStore} from '../store';

import LinkedIn from 'react-icons/lib/ti/social-linkedin-circular';
import Twitter from 'react-icons/lib/ti/social-twitter-circular';
import Github from 'react-icons/lib/ti/social-github-circular';
import Facebook from 'react-icons/lib/ti/social-facebook-circular';

import Head from 'next/head';

import Header from '../Components/Header';

import {getArticles} from '../ducks/articles';
import {getAbout} from '../ducks/about';

import {getDate} from '../utilities';

class Index extends React.Component {
  static getInitialProps({store, isServer}){
    return {};
  }

  componentDidMount(){
    this.props.dispatch(getArticles());
    this.props.dispatch(getAbout());
  }

  render(){
    const {about, articles} = this.props;

    return (
      <div className="container">

        <Head>
          <title>Tomasz Nowak - frontend && javascript developer</title>
          <link href="./static/css/global.css" rel="stylesheet" type="text/css" />
          <link href="./static/css/pages/index.css" rel="stylesheet" type="text/css" />
        </Head>

        <Header activeBtn={1} />
        <div className="text-center">
          <h1 className="font-ss">{about.name}</h1>
          <h2>{about.title}</h2>
          <p>Where you can find me?</p>
          {about.linkedin &&
            <Link href={about.linkedin}>
              <a target="_blank">
                <LinkedIn className="svg-icon linkedin-icon" />
              </a>
            </Link>
          }
          {about.twitter &&
            <Link href={about.twitter}>
              <a target="_blank">
                <Twitter className="svg-icon twitter-icon"/>
              </a>
            </Link>
          }
          {about.github &&
            <Link href={about.github}>
              <a target="_blank">
                <Github className="svg-icon github-icon"/>
              </a>
            </Link>
          }
          {about.facebook &&
            <Link href={about.facebook}>
              <a target="_blank">
                <Facebook className="svg-icon facebook-icon"/>
              </a>
            </Link>
          }
        </div>

        <Articles articles={articles} />
      </div>
    )
  }
}

function Articles({articles}){
  return (
    <article>
      {articles.map(article =>
        <div key={article._id} className="panel panel-article md-6 md-offset-3 sm-10 sm-offset-1">
          <div className="panel-body">
            <Link href={{pathname: '/article', query: {id: article._id}}}><h2><a>{article.title}</a></h2></Link>
            <small>{getDate(article.createdAt, 'humanize')}</small>
            <p>{article.content}</p>
          </div>
        </div>
      )}
    </article>
  )
}



function mapState(state){
  return {
    articles: state.articles.result || [],
    about: state.about.result || {}
  }
}

export default withRedux(initStore, mapState)(Index);