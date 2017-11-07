import React from 'react';
import './Footer.css';

//dashboard on the left side swaps out the center component.
//its functionality is replaced by the dropdown on mobile
export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <span id="dashboard" className="is-hidden-mobile">
        <span className="dashboard-item focus"><i className="fa fa-calendar"></i></span>
        <span className="dashboard-item"><i className="fa fa-search"></i></span>
        <span className="dashboard-item"><i className="fa fa-diamond"></i></span>
      </span>
    );
  }
}
