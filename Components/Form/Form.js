import React from 'react';
import {Field}  from '../Form';
import Router from 'next/router';


function getInitialState(fields) {
  let obj = {};
  fields.forEach(field => {
    obj[field.name] = field.init || ''
  });
  return obj;
}

function getInitialData(fields, data) {
  if(!data) {
    return undefined;
  }
  let obj = {};
  fields.forEach(field => {
    obj[field.name] = data[field.name]
  });

  return obj;
}

class Form extends React.Component {
  constructor({initialData, data}) {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.getProps = this.getProps.bind(this);
    this.submit = this.submit.bind(this);
    this.composeDataObject = this.composeDataObject.bind(this);
    const initialState = getInitialState(data.fields);
    const initData = getInitialData(data.fields, initialData);
    this.state = initData || initialState;
  }
  static getInitialProps() {
    return {};
  }

  handleChange(newState) {
    this.setState(newState);
  }

  postOrPut = (data) => {
    const {post, put, url: {query = {}}} = this.props;
    if(this.props.initialData) {
      return put(data, query.id);
    } else {
      return post(data);
    }
  };

  composeDataObject() {
    const {sendOnly, formdata} = this.props;
    let data = {};

    if(formdata) {
      return new FormData(this.form);
    }

    if(sendOnly) {
      sendOnly.forEach(attr => {
        data[attr] = this.state[attr];
      });
    } else {
      data = this.state;
    }

    return data;

  }

  submit(e) {
    e.preventDefault();
    const {callback} = this.props;
    const data = this.composeDataObject();
    this.props.dispatch(this.postOrPut(data)).then(({status, error}) =>{
      if(status === 'success') {
        if(callback) {
          if(typeof callback === 'string') {
            Router.push(callback);
          } else {
            callback();
          }
        }
      } else {
        this.setState({'#error#': error});
      }
    });
  }

  getProps(name){
    return {
      name,
      value: this.state[name],
      className: 'form-control',
      error: this.state['#error#'],
      label: name
    }
  }

  renderFields() {
    const {data: {fields}} = this.props;
    return (
      <div>
        {fields.map(field => (
          <Field
            {...this.getProps(field.name)}
            key={field.name}
            type={field.type}
            field={field.field}
            onChange={field.field === 'file' ? undefined : this.handleChange}
          />
        ))}
      </div>
    )
  }

  render() {
    const {data: {submitText}} = this.props;

    return (
      <div className="sm-6 sm-offset-3">
        <div className="panel">
          <div className="panel-body">
            <form className="form" onSubmit={this.submit} ref={form => this.form = form}>
              {this.renderFields()}
              <button type="submit">{submitText || 'Submit'}</button>
            </form>

          </div>
        </div>
      </div>
    )
  }
}

export default Form;