import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  static getInitialProps(){
    return {};
  }
  state = {};

  handleChange = ({target}) => {
    const name = target.name;
    const type = target.type;
    const checked = target.checked;
    let newState;
    switch (type) {
      case 'checkbox':
        newState = {[name]: checked};
        break;
      case 'select-multiple':
        let values = [...target.options].filter(option => option.selected).map(option => {
          if(isNaN(option.value) === true){
            return option.value;
          } else {
            return parseFloat(option.value);
          }
        });
        newState = {[name]: values};
        break;
      default:
        newState = {[name]: target.value};
        break;
    }
    this.setState(()=>newState, ()=>{
      if(this.props.onChange){
        this.props.onChange(this.state, newState);
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  render(){
    return (
      <form action="#" onChange={this.handleChange} onSubmit={this.handleSubmit}>
        {this.props.children}
      </form>
    )
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func
};

export default Form;