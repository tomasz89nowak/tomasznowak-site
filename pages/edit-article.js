import React from 'react';
import withRedux from 'next-redux-wrapper';
import {initStore} from '../store';

import Head from 'next/head';
import AdminContainer from '../Components/AdminContainer';
import ArticleForm from '../Components/Forms/ArticleForm';
import {getArticle} from '../ducks/article';

import {STATIC_URL} from '../ENDPOINTS';

class CreateArticle extends React.Component {
  constructor() {
    super();
  }

  static getInitialProps({store, isServer}) {
    return {};
  }

  componentDidMount() {
    this.props.dispatch(getArticle(this.props.url.query.id));
  }

  render() {
    const {article, isFetching} = this.props;
    return (
      <AdminContainer>
        <Head>
          <title>Tomasz Nowak - CMS: edit article</title>
        </Head>
        {article &&
        !isFetching &&
        <ArticleForm {...this.props} initialData={{...article, image: article.image ? STATIC_URL + article.image.path : null}} />}
      </AdminContainer>
    )
  }
}

function mapState(state){
  return {
    article: state.article.result,
    isFetching: state.article.isFetching,
    error: state.article.error ? state.article.error.errors : false
  }
}

export default withRedux(initStore, mapState)(CreateArticle);