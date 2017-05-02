import React from 'react';

const adaptFileEventToValue = (delegate, preview) =>
  e => {
    const file = e.target.files[0];
    if(file && file.size < 500000 /* 500 KB */){
      // if file is smaller than 500 KB it will be passed blob to component
      readImage(file, preview, {name: file.name, size: file.size});
    } else {
      readImage(null, preview, {name: file.name, size: file.size}); // avoid to make a blob if file is too big
    }
    if(typeof delegate !== 'function') return false;
    return delegate(file)
  };

function readImage (file, preview, fileInfo) {
  // returning blob of image for preview
  if(file === null){
    preview(null, fileInfo)
  }
  var reader = new FileReader();

  reader.addEventListener("load", function () {
    preview(reader.result, fileInfo)
  });

  if(file){
    reader.readAsDataURL(file);
  }
}

export class FileInput extends React.Component {
  constructor(props){
    super();
    this.state = {
      preview: props.value,
      fileInfo: {}
    };
  }

  changePreview = (blob, fileInfo)=>{
    this.setState({preview:blob, fileInfo})
  };

  render() {
    const {field, type, validate, className, error, onChange, label, checkboxLabel, id, name, value = '', ...other} = this.props;
    return (
      <div>
        <label>{label}</label>
        <div>
          {value || this.state.preview !== null ? // preview is null only when file is too big to make blob
            <img src={this.state.preview || value} alt={name} className="file-thumb" />
            :
            <span className="file-thumb">Brak podglądu</span>
          }
          <input
            className="hidden"
            onChange={adaptFileEventToValue(onChange, this.changePreview)}
            type="file"
            name={name}
            id={id || name}
            {...other}
          />
          <label htmlFor={this.props.id || name} className="file-input-label">Wybierz plik</label>
          {this.state.fileInfo && this.state.fileInfo.name &&
          <label htmlFor={this.props.id || name} className="file-input-label">
            {this.state.fileInfo.name}, {(this.state.fileInfo.size / 1024).toFixed(0) + ' KB' || ''}
          </label>
          }
        </div>
      </div>
    )
  }
}
 export default FileInput;