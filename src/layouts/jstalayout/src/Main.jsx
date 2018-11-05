import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderView from './components/Header/HeaderView'
import './static/css/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import FooterView from './components/Header/footerView'
import { IntlProvider, addLocaleData } from 'react-intl';
import chartsOperations from './state/redux/charts/operations'
import tablesOperations from './state/redux/tables/operations'
import LandingPage from "./components/LandingPage";
import { Provider } from 'react-redux'
import createStore from './state/store'
import './static/css/style.css'
import { unregister } from './registerServiceWorker'

const store = createStore()
store.dispatch(chartsOperations.channel())
store.dispatch(chartsOperations.channelList())
unregister()
const {
  blockPerHour,
  blockPerMin,
  transactionPerHour,
  transactionPerMin,
  transactionByOrg,
  notification,
  dashStats,
  channel,
  channelList,
  changeChannel,
  nodeStatus
} = chartsOperations

const {
  blockList,
  contractList,
  channels,
  nodeList,
  transactionInfo,
  transactionList
} = tablesOperations

function getLocale(lang) {
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

class Main extends Component {
  constructor(props) {
    super(props);
    this.refreshComponent = this.refreshComponent.bind(this);
    this.state = {
      loading: true,
      lang: 'en-US',
    };
  }

  onChange = (index) => {
    const lang = index === 0 ? 'en-US' : 'zh-CN';
    this.setState({
      lang,
    });
  }

  componentWillMount() {
    //Check if sessionStorage is true, then theme is true, else false.
    const theme = sessionStorage.getItem("toggleTheme") === "true";
    this.setState({ toggleClass: theme });
    theme
      ? (document.body.className = "dark-theme")
      : (document.body.className = "");
    theme
      ? (document.body.style.backgroundColor = "#242036")
      : (document.body.style.backgroundColor = "#F0F5F9");
  }

  updateLoadStatus = () => {
    this.setState({ loading: false })
  }
  refreshComponent = val => {
    this.setState({ toggleClass: val });
    this.state.toggleClass
      ? (document.body.style.backgroundColor = "#F0F5F9")
      : (document.body.style.backgroundColor = "#242036");
    this.state.toggleClass
      ? (document.body.className = "")
      : (document.body.className = "dark-theme");
  };


  render() {
    const { lang } = this.state;

    const appLocale = getLocale(lang);
    addLocaleData(...appLocale.data);

     if (this.state.loading) {
      return (<Provider store={store} >
      <LandingPage
        updateLoadStatus={this.updateLoadStatus}
      />
      </Provider>);
    }

    return (
      <IntlProvider
        locale={appLocale.locale}
        messages={appLocale.messages}
        formats={appLocale.formats}
      >
        
         <Provider store={store} >
          <div>
          <HeaderView refresh={this.refreshComponent.bind(this)} onChange={(index) => { this.onChange(index); }}/>
          {this.props.children}
          <FooterView />

        </div>
        </Provider>
      </IntlProvider>
    );
  }
}

export default Main;