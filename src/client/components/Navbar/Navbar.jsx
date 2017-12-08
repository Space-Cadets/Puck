import React, { Component } from "react";
import fuse from '../../fuse/fuse.js';
import { action } from "mobx";
import { observer } from "mobx-react";
import { withRouter } from 'react-router-dom';
import { getNormalTime } from '../../stores/store.js';
import './Navbar.css';

@observer
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      results: [],
      searching: false,
    }
    this.timer = null;
    this.store = this.props.store;
    this.search = this.search.bind(this);
    this.hideSearch = this.hideSearch.bind(this);
    this.showSearch = this.showSearch.bind(this);
    this.addClass = this.addClass.bind(this);
  }

  doSearch(item) {
    let that = this;
    if (this.timer)
      clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      fuse.search(item).then(v => {
        that.setState({results: v});
      }, err => console.log(err));
    }, 100);
  }

  showSearch() {
    this.setState({
      searching: true,
    });
  }

  hideSearch() {
    this.setState({
      searching: false,
    });
  }

  //render the results of a search query
  getResults(input) {

    //render schedules in search
    const getDay = (sched) => sched.map((s, i) => {
      if (s.days && s.days != 'TBA') {
        return (
          <span key={i}>
            {getNormalTime(s.startTime)}-{getNormalTime(s.endTime)}
            <span className="search-time">  {s.days}  </span>
          </span>
        );
      } else {
        return (<span>TBA</span>);
      }
    });

    //return best search
    return this.state.results.slice(0, 6).map((c, i) => {
      let collision = this.props.store.hasCollision(c);
      return (
        <div key={i} data-crn={c.crn} onClick={this.addClass}
          className={`search-section`}>
          <span className="search-info">{c.department} {c.class} - {c.section}</span>
          <span className="search-instructors">{c.instructors.join(" ")}</span>
          <div className="search-cn">{c.name}</div>
          <div>
            {getDay(c.schedule)}
          </div>
          <div className="collision">
            {collision ? `Conflicts with ${this.store.classes[collision].name}` : ""}
          </div>
        </div>
      );
    });

  }

  @action
  addClass(e) {
    let target = e.target;
    while (!target.dataset.crn)
      target = target.parentNode;
    let course = target.dataset.crn;
    this.hideSearch();
    this.store.addClass(this.props.store.classes[course]);
    if (this.props.location != "/") {
      this.props.history.push('/');
    }
  }

  search(e) {
    this.setState({
      searching: true,
      input: e.target.value,
    });
    this.doSearch(e.target.value);
  }

  getSearch() {
    if (this.state.searching) {
      return (
        <span>
          {this.state.searching ? <div onClick={this.hideSearch} id="search-block" /> : ""}
          <div id="search">
            {this.getResults(this.state.input)}
          </div>
        </span>
      );
    }
  }

  render() {
    return (
      <nav id="navbar" className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a id="navbar-logo" className="icon" href="/">
            <img src="/static/img/acm.png" className="is-hidden-mobile"></img>
            <img id="small-logo" src="/static/img/modsmw.png" className="is-hidden-desktop"></img>
          </a>
          <div id="navbar-search" className="containter">
            <input onClick={this.showSearch} onKeyUp={this.search} placeholder="search classes / teachers"></input>
            {this.getSearch()}
          </div>
          <div className="navbar-burger" id="navbar-burger">
            <div className="navbar-item menuitem">
              <p className="navbar-item"><i className="fa fa-navicon"></i></p>
            </div>
          </div>
        </div>
        <div className="navbar-menu" aria-label="main navigation">
          <div className="navbar-item navbar-end menuitem">
            <p>Spring 2018</p>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
