import React from 'react';
import {Field}  from '../Form';
import Router from 'next/router';
import {postArticle, putArticle} from '../../ducks/article';


class ArticleForm extends React.Component {
  constructor({initialData}) {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.getProps = this.getProps.bind(this);
    this.submit = this.submit.bind(this);
    const initialState = {
      title: '',
      content: '',
      description: '',
      published: false,
      image: null
    };
    this.state = initialData || initialState;
  }
  static getInitialProps() {
    return {};
  }

  handleChange(newState) {
    this.setState(newState);
  }

  postOrPut = (formData) => {
    if(this.props.initialData) {
      return putArticle(formData, this.props.url.query.id);
    } else {
      return postArticle(formData);
    }
  };

  submit(e) {
    e.preventDefault();
    const formData = new FormData(this.form);
    formData.append('content', this.state.content);
    this.props.dispatch(this.postOrPut(formData)).then(({status}) =>{
      if(status === 'success') {
        Router.push('/admin?tab=articles');
      }
    });
  }

  getProps(name){
    return {
      name,
      onChange: this.handleChange,
      value: this.state[name],
      className: 'form-control',
      error: this.props.error,
      label: name
    }
  }

  render() {
    return (
        <div className="sm-6 sm-offset-3">
          <div className="panel">
            <div className="panel-body">
              <form className="form" onSubmit={this.submit} ref={form => this.form = form}>
                <Field {...this.getProps('title')} />
                <Field {...this.getProps('description')} />
                <Field {...this.getProps('content')} />
                <Field {...this.getProps('published')} type="checkbox" label="" checkboxLabel="Published" />
                <Field {...this.getProps('image')} field="file" onChange={undefined} />
                <button type="submit">submit</button>
              </form>

            </div>
          </div>
        </div>
    )
  }
}

export default ArticleForm;