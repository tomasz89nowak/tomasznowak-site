import React from 'react';
import Link from 'next/link';
import withRedux from 'next-redux-wrapper';
import {initStore} from '../store';
import {STATIC_URL} from '../ENDPOINTS';
import {getArticle} from '../ducks/article';

import Head from 'next/head';

import Header from '../Components/Header';

class Article extends React.Component {
  static getInitialProps() {
    return {};
  }

  componentDidMount() {
    const {url:{query}, article} = this.props;
    if(article && article._id !== query.id){
      this.props.dispatch(getArticle(query.id));
    }
  }

  render() {
    const {url, article, isFetching} = this.props;
    console.log(this.props.article)

    return (
      <div className="container">

        <Head>
          <title>Tomasz Nowak - frontend && javascript developer</title>
          <link href="./static/css/global.css" rel="stylesheet" type="text/css" />
          <link href="./static/css/pages/article.css" rel="stylesheet" type="text/css" />
        </Head>

        <Header url={url.pathname} />
        <Content article={article} isFetching={isFetching} />
      </div>
    )
  }
}

const Content = ({isFetching, article}) => {
  if(isFetching){
    return <div>loading</div>;
  }
  return (
    <div className="panel panel-article">
      <div className="panel-heading">
        <h1>{article.title}</h1>

      </div>
      <div className="panel-body">
      {article.content}
      </div>
    </div>
  )
};

function mapState(state){
  return {
    article: state.article.result || {},
    isFetching: state.article.isFetching
  }
}

export default withRedux(initStore, mapState)(Article);