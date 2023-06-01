import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {};
}

class Test2 extends Component {
  render() {
    return <div>test2</div>;
  }
}

export default connect(mapStateToProps)(Test2);
