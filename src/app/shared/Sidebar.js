import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Trans } from 'react-i18next';

class Sidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

    const dropdownPaths = [
      {path:'/apps', state: 'appsMenuOpen'},
      {path:'/basic-ui', state: 'basicUiMenuOpen'},
      {path:'/advanced-ui', state: 'advancedUiMenuOpen'},
      {path:'/form-elements', state: 'formElementsMenuOpen'},
      {path:'/tables', state: 'tablesMenuOpen'},
      {path:'/maps', state: 'mapsMenuOpen'},
      {path:'/icons', state: 'iconsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/user-pages', state: 'userPagesMenuOpen'},
      {path:'/error-pages', state: 'errorPagesMenuOpen'},
      {path:'/general-pages', state: 'generalPagesMenuOpen'},
      {path:'/ecommerce', state: 'ecommercePagesMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));
 
  }

  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <a href="!#" className="nav-link" onClick={evt =>evt.preventDefault()}>
              <div className="nav-profile-image">
                <img src={ require("../../assets/images/faces/face1.jpg") } alt="profile" />
                <span className="login-status online"></span>
              </div>
              <div className="nav-profile-text">
                <span className="font-weight-bold mb-2"><Trans>{localStorage.getItem('full_name')}</Trans></span>
                <span className="text-secondary text-small"><Trans></Trans></span>
              </div>
              <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
            </a>
          </li>
          <li className={ this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-title"><Trans>Dashboard</Trans></span>
              <i className="mdi mdi-home menu-icon"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/buyer') ? 'nav-item active' : this.isPathActive('/addBuyer') ? 'nav-item active' : this.isPathActive('/vendor') ? 'nav-item active' : this.isPathActive('/addVendor') ? 'nav-item active' : this.isPathActive('/vehicleType') ? 'nav-item active' : this.isPathActive('/addVehicleType') ? 'nav-item active' : this.isPathActive('/team') ? 'nav-item active' : this.isPathActive('/addTeam') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.basicUiMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('basicUiMenuOpen') } data-toggle="collapse">
              <span className="menu-title"><Trans>Master</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-account menu-icon"></i>
            </div>
            <Collapse in={ this.state.basicUiMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/vehicleType') ? 'nav-link active' : this.isPathActive('/addVehicleType') ? 'nav-link active' : 'nav-link' } to="/vehicleType"><Trans>Vehicle Type</Trans></Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/buyer') ? 'nav-link active' : this.isPathActive('/addBuyer') ? 'nav-link active' : 'nav-link' } to="/buyer"><Trans>Buyer</Trans></Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/vendor') ? 'nav-link active' : this.isPathActive('/addVendor') ? 'nav-link active' : 'nav-link' } to="/vendor"><Trans>Vendor</Trans></Link></li>
                {
                  localStorage.getItem('user_type_id') == 3 && (
                    <li className="nav-item"> <Link className={ this.isPathActive('/team') ? 'nav-link active' : this.isPathActive('/addTeam') ? 'nav-link active' : 'nav-link' } to="/team"><Trans>Team</Trans></Link></li>
                )}
                </ul>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/enquiry') ? 'nav-item active' : this.isPathActive('/addEnquiry') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/enquiry">
              <span className="menu-title"><Trans>Enquiry</Trans></span>
              <i className="mdi mdi-security menu-icon"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/booking') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/booking">
              <span className="menu-title"><Trans>Booking</Trans></span>
              <i className="mdi mdi-contacts menu-icon"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/lr') ? 'nav-item active' : this.isPathActive('/lrAdd') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/lr">
              <span className="menu-title"><Trans>LR</Trans></span>
              <i className="mdi mdi-truck-delivery menu-icon"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/invoice') ? 'nav-item active' : this.isPathActive('/addInvoice') ? 'nav-item active' : this.isPathActive('/invoiceEdit') ? 'nav-item active' : this.isPathActive('/invoiceView') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/invoice">
              <span className="menu-title"><Trans>Invoice</Trans></span>
              <i className="mdi mdi-file-document menu-icon"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/topay') ? 'nav-item active' : this.isPathActive('/topayEdit') ? 'nav-item active' : this.isPathActive('/toclear') ? 'nav-item active' : this.isPathActive('/tobalance') ? 'nav-item active' : this.isPathActive('/toclear') ? 'nav-item active' :  'nav-item' }>
            <div className={ this.state.basicUiMenuOpen1 ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('basicUiMenuOpen1') } data-toggle="collapse">
              <span className="menu-title"><Trans>Payable</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-cash menu-icon"></i>
            </div>
            <Collapse in={ this.state.basicUiMenuOpen1 }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/topay') ? 'nav-link active' : this.isPathActive('/topayEdit') ? 'nav-link active' : 'nav-link' } to="/topay"><Trans>Topay</Trans></Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/tobalance') ? 'nav-link active' : 'nav-link' } to="/tobalance"><Trans>Balance</Trans></Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/toclear') ? 'nav-link active' :  'nav-link' } to="/toclear"><Trans>Clear</Trans></Link></li>
                
                </ul>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/enqsForm') ? 'nav-item active' : this.isPathActive('/booksForm') ? 'nav-item active' : this.isPathActive('/enqsReport') ? 'nav-item active' : this.isPathActive('/booksReport') ? 'nav-item active': this.isPathActive('/buyReport') ? 'nav-item active' : this.isPathActive('/venReport') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.errorPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('errorPagesMenuOpen') } data-toggle="collapse">
              <span className="menu-title"><Trans>Reports</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-file menu-icon"></i>
            </div>
            <Collapse in={ this.state.errorPagesMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/booksForm') ? 'nav-link active' : this.isPathActive('/buyReport') ? 'nav-link active' : 'nav-link' } to="/buyReport">Buyer</Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/booksForm') ? 'nav-link active' : this.isPathActive('/venReport') ? 'nav-link active' : 'nav-link' } to="/venReport">Vendor</Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/enqsForm') ? 'nav-link active' : this.isPathActive('/enqsReport') ? 'nav-link active' : 'nav-link' } to="/enqsForm">Enquiry</Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/booksForm') ? 'nav-link active' : this.isPathActive('/booksReport') ? 'nav-link active' : 'nav-link' } to="/booksForm">Booking</Link></li>
              </ul>
            </Collapse>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);