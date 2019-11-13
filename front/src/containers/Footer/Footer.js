import React, { Component } from 'react';
import { Layout } from 'antd';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Footer">
        <Layout.Footer style={{ textAlign: 'center' }}>
          Matchmaker ©2019 Suffered from SWPP
        </Layout.Footer>
      </div>
    );
  }
}
Footer.propTypes = {};
export default Footer;
