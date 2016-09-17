import React, { Component, PropTypes } from 'react'

class filter extends Component {

  render() {
    return (
	  <p>
	    Show:
	    {" "}
		<a href="javascript:void(0)" onClick={e => {
			e.preventDefault()
			this.props.handleBreadClick('a')
			}}>Low
		</a>
	    {", "}
		<a href="javascript:void(0)" onClick={e => {
			e.preventDefault()
			this.props.handleBreadClick('b')
			}}>Medium
		</a>
	    {", "}
		<a href="javascript:void(0)" onClick={e => {
			e.preventDefault()
			this.props.handleBreadClick('c')
			}}>High
		</a>
	  </p>
    );
  }
}

filter.propTypes = {
  isActive: PropTypes.string.isRequired,
  handleBreadClick: PropTypes.func.isRequired
}

export default filter;
