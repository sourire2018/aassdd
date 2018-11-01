import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header'
import './static/css/main.css'
import Footer from './Footer'
import { IntlProvider, addLocaleData } from 'react-intl';

export default class SourireT extends Component {
  static displayName = 'SourireT';

  static propTypes = {
    value: PropTypes.string
  };

  static defaultProps = {
    value: 'string data'
  };
  getLocale(lang) {
    let result = {};
    switch (lang) {
      case 'zh-CN':
        result = require('./locales/zh-Hans');
        break;
      case 'en-US':
        result = require('./locales/en-US');
        break;
      default:
        result = require('./locales/en-US');
    }

    return result.default || result;
  }
  constructor(props) {
    super(props);
    this.state = {
      lang: 'en-US'
    };
  }
  onChange = (index) => {
    const lang = index === 0 ? 'en-US' : 'zh-CN';
    this.setState({
      lang,
    });
  }

  render() {
    const { lang } = this.state;

    const appLocale = this.getLocale(lang);
    addLocaleData(...appLocale.data);

    return (
      <IntlProvider
        locale={appLocale.locale}
        messages={appLocale.messages}
        formats={appLocale.formats}
      >
        <div>
          <Header onChange={(index) => { this.onChange(index); }}/>
          {this.props.children}
          <Footer />
        </div>
      </IntlProvider>
    );
  }
}

const styles = {

}
