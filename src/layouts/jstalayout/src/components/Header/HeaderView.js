import React, {Component} from "react";
import compose from "recompose/compose";
import {connect} from "react-redux";
import {withStyles} from "material-ui/styles";
import Select from "react-select";
import {Nav, Navbar, NavbarBrand, NavbarToggler} from "reactstrap";
import {HashRouter as Router, NavLink, Link} from "react-router-dom";
import Logo from "../../static/images/logo.png";
import FontAwesome from "react-fontawesome";
import Websocket from "react-websocket";
import Badge from "material-ui/Badge";
import Dialog from "material-ui/Dialog";
import Loader from 'react-loader-spinner';
import {chartOperations, chartSelectors} from "../../state/redux/charts/";
import {tableOperations, tableSelectors} from "../../state/redux/tables/";
import PropTypes from 'prop-types';
import config  from '../../config.json';
import {
  Row,
  Col
} from 'reactstrap';
import Avatar from 'material-ui/Avatar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAddressBook} from '@fortawesome/fontawesome-free-solid'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(
  fab
)
import {FormattedMessage} from 'react-intl';
const logo = config[config.logo].logo;
var src = require("../../static/images/" + logo );

const {
  blockPerHour,
  blockPerMin,
  transactionPerHour,
  transactionPerMin,
  transactionByOrg,
  dashStats,
  changeChannel,
  nodeStatus
} = chartOperations;

const {blockList, contractList, nodeList, transactionList} = tableOperations;
const channel = tableOperations.channels;
const {currentChannelSelector, dashStatsSelector} = chartSelectors;
const {channelsSelector} = tableSelectors;


export class HeaderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      notifyDrawer: false,
      adminDrawer: false,
      channels: [],
      notifyCount: 0,
      notifications: [],
      isLoading: true,
      modalOpen: false,
      selectedChannel: {},
      isLight: true,
      langSelectedIndex: 1,
      value : 1
    };
    
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  val (value) {
    this.setState({
      value: value === 0? 1 : 0
    });
  };
  handleData(notification) {
    let notifyArr = this.state.notifications;
    notifyArr.unshift(JSON.parse(notification));
    this.setState({notifications: notifyArr});
    this.setState({notifyCount: this.state.notifyCount + 1});
  }

  componentDidMount() {
    let arr = [];
    let selectedValue ={}
    if (this.props.channels) {
      this.props.channels.forEach(element => {
      if (element.genesis_block_hash === this.props.currentChannel) {
        selectedValue = {
          value: element.genesis_block_hash,
          label: element.channelname
        };

      }
      arr.push({
        value: element.genesis_block_hash,
        label: element.channelname
      });
    });
    }
    this.setState({
      channels: arr,
      isLoading: false,
      selectedChannel: selectedValue
    });
    setInterval(() => this.syncData(this.props.currentChannel), 5000);
  }

  async syncData(currentChannel) {
    await Promise.all([
      this.props.getBlockList(currentChannel),
      this.props.getBlocksPerMin(currentChannel),
      this.props.getBlocksPerHour(currentChannel),
      this.props.getContractList(currentChannel),
      this.props.getDashStats(currentChannel),
      this.props.getNodeList(currentChannel),
      this.props.getNodeStatus(currentChannel),
      this.props.getTransactionByOrg(currentChannel),
      this.props.getTransactionList(currentChannel),
      this.props.getTransactionPerHour(currentChannel),
      this.props.getTransactionPerMin(currentChannel),
      this.props.getChannels()
    ]);
    this.dashStats = this.props.getDashStats(currentChannel);
    this.channels = this.props.getChannels();
    this.handleClose();
  }

  componentWillReceiveProps(nextProps) {
    let options = [];
    let selectedValue = {};
    nextProps.channels.forEach(element => {
      options.push({
        value: element.genesis_block_hash,
        label: element.channelname
      });
      if (
        nextProps.currentChannel == null ||
        nextProps.currentChannel == undefined
      ) {
        if (element.genesis_block_hash != null) {
          selectedValue = {
            "value": element.genesis_block_hash,
            "label": element.channelname
          };
        }
      } else if (element.genesis_block_hash === nextProps.currentChannel) {
        selectedValue = {
          value: element.genesis_block_hash,
          label: element.channelname
        };
      }
    });
    

    if (
      nextProps.currentChannel == null ||
      nextProps.currentChannel == undefined
    ) {
      this.props.getChangeChannel(selectedValue.value);
    }

    this.setState({
      channels: options,
      isLoading: false,
      selectedChannel: selectedValue
    });
    if (nextProps.currentChannel !== this.props.currentChannel) {
      this.syncData(nextProps.currentChannel);
    }
  }

  handleChange = async ( selectedChannel) => {
   await this.handleOpen();
    this.setState({selectedChannel});
    this.props.getChangeChannel(selectedChannel.value);
   await this.syncData(selectedChannel.value);
  };

  handleOpen = () => {
    console.log("opened model");
    this.setState({modalOpen: true});
  };

  handleClose = () => {
    this.setState({modalOpen: false});
  };

  render() {
    const {classes} = this.props;
    const {hostname, port} = window.location;
    var webSocketUrl = `ws://${hostname}:${port}/`;
    const dashLink = props => (
      <Link to="/" exact activeClassName="active" {...props} />
    );
    const transLink = props => (
      <Link to="/transactions" activeClassName="active" {...props} />
    );

    const header = [], status = [];
    for (let i = 0; i < config.header.length; i++) {
      switch(config.header[i]) {
        case "blocksview": header.push( <li key = {config.header[i]}>
                  <NavLink
                    to="/blocks"
                    className="dashButtons"
                    activeClassName="activeTab"
                  >
                  BLOCKS
                  </NavLink>
                </li> ); break;
        case "contractview" : header.push( <li key = {config.header[i]}>
                  <NavLink
                    to="/contracts"
                    className="dashButtons"
                    activeClassName="activeTab"
                  >
                    
                    CONTRACTS
                    
                    
                  </NavLink>
                </li> ); break;
        case "chainview" : header.push( <li key = {config.header[i]}>
                  <NavLink
                    to="/channels"
                    className="dashButtons"
                    activeClassName="activeTab"
                  >
          
                    CHAIN
                 
                    
                  </NavLink>
                </li> ); break;
        case "nodesview" : header.push( <li key = {config.header[i]}>
                  <NavLink
                    to="/"
                    exact
                    className="dashButtons"
                    activeClassName="activeTab"
                  >
                    
                    NODES
                    
                  </NavLink>
                </li> ); break;
        case "transactionsview" :header.push( <li key = {config.header[i]}>
                  <NavLink
                    to="/transactions"
                    className="dashButtons"
                    activeClassName="activeTab"
                  >
                   
                    TRANSACTIONS
                    
                    
                  </NavLink>
                </li> ); break;
        case "select" : header.push(
          <div>
            <Select
              className="channel-dropdown"
              placeholder="Select Channel..."
              required={true}
              name="form-field-name"
              isLoading={this.state.isLoading}
              value={this.state.selectedChannel}
              onChange={this.handleChange}
              options={this.state.channels}
            />
          </div>
        ); break; 
        case "language" : header.push(
          <div  className="admin-buttons theme-switch" onClick= {() => {
          this.props.onChange(this.state.value); this.val(this.state.value)}}>
            <FontAwesome name="language" className="langIcon" />
          </div>
        ); break;
        case "github" : header.push(
          <div  className="admin-buttons theme-switch" >
            <NavbarBrand href="https://github.com/DSiSc/justitia">
              <FontAwesome name="github" className="github githubIcon" />
            </NavbarBrand>
          </div>
        ); break;
        default:  break;
      }
    }
        for (let i = 0; i < config.status.length; i++) {

      switch(config.status[i]) {
        case "blocks" : status.push(
          <div className="statistic vdivide" style={{ width: "19%" }}>
            <Row>
              <Col sm= "4">
                <span className="stat-count">{this.props.dashStat.latestBlock}</span>
              </Col>
              <Col sm= "4">
              
                <div className="stat-avatar avatar-block div-icon" style={{ margin: "0px 0px 0px 40px", padding : "0" }}>
                  <FontAwesomeIcon
                    icon={['fas', 'cube']}
                  />
                </div>
              </Col>
            </Row>
            <span className="stat-name">
              <FormattedMessage
                id="page.localeProvider.blocks"
                defaultMessage="BLOCKS"
                description="BLOCKS"
                />
              </span>
          </div>
        ); break;
        case "transactions" : status.push(
          <div className="statistic vdivide" style={{ width: "19%" }}>
            <Row>
              <Col sm= "4">
                <span className="stat-count">{this.props.dashStat.txCount}</span>
              </Col>
              <Col sm= "4">
                <div className="stat-avatar avatar-block div-icon"  style={{ margin: "0px 0px 0px 40px", padding : "0" }}>
                  <FontAwesomeIcon
                    icon={['fas', 'list-alt']}
                  />
                </div>
              </Col>
            </Row>
            <span className="stat-name">
              <FormattedMessage
              id="page.localeProvider.transactions"
              defaultMessage="TRANSACTIONS"
              description="TRANSACTIONS"
              />
            </span>
         </div>
        ); break;
        case "nodes" : status.push(<div className="statistic vdivide" style={{ width: "19%" }}>
                  <Row>
                    <Col sm= "4">
                      <span className="stat-count">{this.props.dashStat.nodeCount}</span>
                    </Col>
                    <Col sm= "4">
                      <div className="stat-avatar avatar-block div-icon"  style={{ margin: "0px 0px 0px 40px", padding : "0" }}>
                        <FontAwesomeIcon
                        icon={['fas', 'users']}
                      />
                      </div>
                    </Col>
                  </Row>
                  <span className="stat-name">
                    <FormattedMessage
                      id="page.localeProvider.nodes"
                      defaultMessage="NODES"
                      description="NODES"
                      />
                  </span>
                </div>); break;
        case "contracts" : status.push(<div className="statistic vdivide" style={{ width: "19%" }}>
                  <Row>
                    <Col sm= "4">
                      <span className="stat-count">{this.props.dashStat.contractCount}</span>
                    </Col>
                    <Col sm= "4">
                      <div className="stat-avatar avatar-block div-icon"  style={{ margin: "0px 0px 0px 40px", padding : "0" }}>
                        <FontAwesomeIcon
                          icon={['fa', 'handshake']}
                        />
                      </div>
                    </Col>
                  </Row>
                  <span className="stat-name">
                    <FormattedMessage
                      id="page.localeProvider.contracts"
                      defaultMessage="CONTRACTS"
                      description="CONTRACTS"
                      />
                  </span>
                </div>); break;
          case "chains" : status.push(<div className="statistic vdivide" style={{ width: '19%' }}>
                  <Row>
                    <Col sm= "4">
                      <span className="stat-count">{this.props.dashStat.channelCount}</span>
                    </Col>
                    <Col sm= "4">
                      <div className="stat-avatar avatar-block div-icon"  style={{ margin: "0px 0px 0px 40px", padding : "0" }}>
                        <FontAwesomeIcon
                          icon={['fas', 'tree']}
                        />

                      </div>
                    </Col>
                  </Row>
                  <span className="stat-name">
                    <FormattedMessage
                      id="page.localeProvider.chains"
                      defaultMessage="chain"
                      description="chain"
                      />
                  </span>
                </div>); break;
        default:  break;
      }
    }
    return (
      <div>
        <Websocket
          url={webSocketUrl}
          onMessage={this.handleData.bind(this)}
          reconnect={true}
        />
        <Router>
          <div className="navbar-header" >
            <Navbar expand="md">
              <NavbarBrand href="/">
                {" "}
                <img src={src} className="logo" alt={config.logo} />
              </NavbarBrand>
              <NavbarBrand>
                <span className = 'dashButtons'>Justitia Chain Explorer</span>
              </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Nav className="ml-auto " navbar>
                {header}
                <br />
                
              </Nav>
              
            </Navbar>
            <div className="stat" >
              <Row>
                {status}
                {" "}
              </Row>
            </div>

          </div>
        </Router>
        
      </div>
    );
  }
}

export default compose(
  connect(
    state => ({
      currentChannel: currentChannelSelector(state),
      channels : channelsSelector(state),
      dashStat: dashStatsSelector(state)
    }),
    {
      getBlockList: blockList,
      getBlocksPerHour: blockPerHour,
      getBlocksPerMin: blockPerMin,
      getContractList: contractList,
      getChangeChannel: changeChannel, //not in syncdata
      getDashStats: dashStats,
      getNodeList: nodeList,
      getNodeStatus: nodeStatus,
      getTransactionByOrg: transactionByOrg,
      getTransactionList: transactionList,
      getTransactionPerHour: transactionPerHour,
      getTransactionPerMin: transactionPerMin,
      getChannels : channel
    }
  )
)(HeaderView);
