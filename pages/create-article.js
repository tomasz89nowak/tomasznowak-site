import React from 'react';
import withRedux from 'next-redux-wrapper';
import {initStore} from '../store';

import Head from 'next/head';
import AdminContainer from '../Components/AdminContainer';
import ArticleForm from '../Components/Forms/ArticleForm';

class CreateArticle extends React.Component {
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
        <ArticleForm {...this.props} />
      </AdminContainer>
    )
  }
}

function mapState(state){
  return {
    article: state.article.result,
    error: state.article.error ? state.article.error.errors : false
  }
}

export default withRedux(initStore, mapState)(CreateArticle);