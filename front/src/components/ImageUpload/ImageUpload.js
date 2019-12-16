import React, { Component } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import './ImageUpload.css';

const uploadButton = (
  <div className="Upload-Button">
    <Icon type="plus" />
    Upload
  </div>
);

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: uploadButton,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    // eslint-disable-next-line react/no-string-refs
    this.refs.imageUploader.click();
  };

  handleChange = event => {
    const { setFieldValue } = this.props;
    if (event.target.files[0]) {
      this.setState({
        content: (
          <img
            id="Image-Preview"
            src={URL.createObjectURL(event.target.files[0])}
            alt="preview"
          />
        ),
      });
    } else {
      this.setState({
        content: uploadButton,
      });
    }
    setFieldValue(event.target.files[0]);
  };

  render() {
    const { content } = this.state;
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className="ImageUpload"
        id="ImageUpload"
        onClick={this.handleClick}
        onKeyDown={this.handleClick}
        stype={{ padding: '1rem' }}
      >
        {content}
        <input
          id="imageUpload"
          type="file"
          // eslint-disable-next-line react/no-string-refs
          ref="imageUploader"
          style={{ height: '0px', display: 'none' }}
          onChange={this.handleChange}
          accept="image/*"
        />
      </div>
    );
  }
}
ImageUpload.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
};
export default ImageUpload;
