import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {};
}

class Test3 extends Component {
  render() {
    return <div>test3</div>;
  }
}

export default connect(mapStateToProps)(Test3);
