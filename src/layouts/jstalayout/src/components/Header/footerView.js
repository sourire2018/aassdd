import React, { Component } from 'react';
import config from '../../config.json';

export class FooterView extends Component {
  handleChange = (selectedOption) => {
    this.setState({ selectedOption: selectedOption.value });
    this.props.getChangeChannel(selectedOption.value);
  }

  handleThemeChange = () => {
    const theme = !this.state.isLight;
    this.setState({ isLight: theme });
  }

  render() {
    return (
      <div>
        <div className="footer">
           trustchain Copyright © 2018  {config.foot} | All rights reserved

          {""}
        </div>
      </div>
    );
  }
}

export default FooterView;
