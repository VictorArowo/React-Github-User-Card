import React, { Component } from 'react';
import styled from 'styled-components';

const Div = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    margin-top: -50px;
    width: 200px;
    height: 200px;
    border-radius: 5px;
  }
`;

class UserCard extends Component {
  render() {
    const { data } = this.props;
    return (
      <Div>
        <img src={data.avatar_url} />
        <div>{data.name}</div>
        <div>{data.location}</div>
        <div>{data.bio}</div>
        <div>Followers: {data.followers}</div>
        <div>Following: {data.following}</div>
      </Div>
    );
  }
}

export default UserCard;
