import React, { Component } from 'react';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
`;

class FriendCard extends Component {
  render() {
    return (
      <Div>
        <img src={this.props.data.avatar_url} />
        <div>{this.props.data.login}</div>
      </Div>
    );
  }
}

export default FriendCard;
