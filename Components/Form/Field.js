import React from 'react';
import PropTypes from 'prop-types';
import {handleError} from '../../utilities';
import FileInput from './FileInput';

class Field extends React.Component {
  static getInitialProps() {
    return {};
  }
  constructor(props){
    super(props);
    this.handleValidate = this.handleValidate.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.state = {
      error:undefined,
      [props.name]:''
    };
  }

  getError(validate, target){
    const toArray = value => Array.isArray(value) ? value : [ value ];
    const validators = toArray(validate);
    for(let i = 0; i < validators.length; i++) {
      const error = validators[i](target.value);
      if(error){
        return error;
      }
    }

    return undefined;
  }

  handleValidate({target}){
    if(this.props.validate){
      const error = this.getError(this.props.validate, target);
      return {error};
    }
  }

  handleChangeInput({target}){
    const isCheckbox = target.type === 'checkbox';
    const error = this.handleValidate({target});
    const newState = {[target.name]: isCheckbox ? target.checked : target.value};
    this.setState(()=>error, ()=>this.props.onChange(newState));
  }

  handleChangeSelect({target}){
    if(!this.props.multiple){
      this.handleChangeInput({target});
      return;
    }
    let values = [...target.options].filter(option => option.selected).map(option => {
      if(isNaN(option.value) === true){
        return option.value;
      } else {
        return parseFloat(option.value);
      }
    });
    const error = this.handleValidate({target});
    const newState = {[target.name]: values};
    this.setState(()=>error, ()=>this.props.onChange(newState));
  }

  insertField(){
    // validate and onChange attributes are not used, but cannot be passed to input
    const {field = 'input', type = 'text', validate, error, onChange, label, checkboxLabel, ...other} = this.props;
    switch(field) {
      case 'input':
        return (
          <div>
            {label && <label>{label}</label>}
            <input onChange={this.handleChangeInput} type={type} {...other} />
            {checkboxLabel && <label>{checkboxLabel}</label>}
          </div>
        );
      case 'textarea':
        return (
          <div>
            {label && <label>{label}</label>}
            <textarea onChange={this.handleChangeInput} {...other} />
          </div>
        );
      case 'select':
        return (
          <div>
            {label && <label>{label}</label>}
            <select onChange={this.handleChangeSelect} {...other}>{this.props.children}</select>
          </div>
        );
      case 'file':
        return (
          <FileInput {...this.props} />
        )
    }
  }

  render() {
    return (
      <div>
        {this.insertField()}
        {handleError(this.props.error, this.props.name)}
        <span className="error-front">{this.state.error}</span>
      </div>
    )
  }
}



Field.propTypes = {
  field: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  validate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array
  ])
};

export default Field;