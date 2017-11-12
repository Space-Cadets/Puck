import React from 'react';
import './Dashboard.css';
import { observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';

//dashboard on the left side swaps out the center component.
//its functionality is replaced by the dropdown on mobile
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span id="dashboard" className="is-hidden-mobile">
        <NavLink exact activeClassName="focus" to="/">
          <span className="dashboard-item">
            <i className="fa fa-caret-left caret"></i>
            <i className="fa fa-calendar"></i>
          </span>
        </NavLink>
        <NavLink to="/index/" activeClassName="focus">
          <span className="dashboard-item">
            <i className="fa fa-caret-left caret"></i>
            <i className="fa fa-search"></i>
          </span>
        </NavLink>
        <a href="https://facebook.com/VillanovaACM" className="dashboard-item">
          <i className="fa fa-facebook"></i>
        </a>
      </span>
    );
  }
}
