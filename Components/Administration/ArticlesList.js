import React from 'react';
import {getDate} from '../../utilities';
import Link from 'next/link';

import {deleteArticle} from '../../ducks/articles';

class ArticlesList extends React.Component {
  static getInitialProps() {
    return {};
  }

  delArticle = (id) => {
    this.props.dispatch(deleteArticle(id));
  };

  render() {
    const {articles = []} = this.props;
    return (
      <div className="admin__articles-list">
        <Link href="/create-article"><a className="btn-primary form-group">Utwórz nowy</a></Link>
        {articles.map(article => {
          return (
            <Article
              key={article._id}
              article={article}
              delArticle={this.delArticle}
            />
          )
        })}
      </div>
    )
  }
}

const Article = ({article, delArticle}) => {

  function del() {
    delArticle(article._id);
  }

  return (
    <div className="panel">
      <div className="admin__article">
        <b>{article.title}</b>
        <small>Utworzono: {getDate(article.createdAt)}</small>
        <small>Zaktualizowano: {getDate(article.updatedAt)}</small>
      </div>
      <div className="panel-footer text-right">
        <Link href={`/edit-article?id=${article._id}`}><a className="btn-primary">Edytuj</a></Link>
        <button className="btn-secondary" onClick={del}>Usuń</button>
      </div>
    </div>
  )
};

export default ArticlesList;