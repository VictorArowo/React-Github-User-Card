import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import FriendCard from './FriendCard';

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

  .friendsList {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 80px;
  }
`;

class UserCard extends Component {
  state = {
    friendsData: null,
    renderChild: false,
    currentPage: 1,
    friendsPerPage: 5,
    currentFriends: null,
    searchTerm: '',
    searchData: null
  };

  nextPage = () => {
    const indexOfLastTodo = this.state.currentPage * this.state.friendsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - this.state.friendsPerPage;
    this.setState({
      currentFriends: this.state.friendsData.slice(
        indexOfFirstTodo,
        indexOfLastTodo
      ),
      currentPage: this.state.currentPage + 1
    });
  };

  handleClick = () => {
    axios
      .get('https://api.github.com/users/VictorArowo/followers')
      .then(res => this.setState({ friendsData: res.data, renderChild: true }))
      .then(() => {
        this.nextPage();
      });
  };

  searchUser = e => {
    e.preventDefault();
    axios
      .get(`https://api.github.com/users/${this.state.searchTerm}`)
      .then(res => this.setState({ searchData: res.data, renderChild: true }));
  };

  render() {
    const { data } = this.props;
    return (
      <Div>
        <input
          type="text"
          placeholder="Search for a User"
          style={{ marginLeft: '-400px' }}
          onChange={e => this.setState({ searchTerm: e.target.value })}
        />
        <input
          type="submit"
          style={{ marginLeft: '-400px' }}
          onClick={this.searchUser}
        />

        {this.state.searchData && (
          <>
            <img src={this.state.searchData.avatar_url} />
            <div>{this.state.searchData.name}</div>
            <div>{this.state.searchData.location}</div>
            <div>{this.state.searchData.bio}</div>
            <div>Followers: {this.state.searchData.followers}</div>
            <div>Following: {this.state.searchData.following}</div>
            <button onClick={this.handleClick}>View Followers</button>
          </>
        )}

        {!this.state.renderChild && (
          <>
            <img src={data.avatar_url} />
            <div>{data.name}</div>
            <div>{data.location}</div>
            <div>{data.bio}</div>
            <div>Followers: {data.followers}</div>
            <div>Following: {data.following}</div>
            <button onClick={this.handleClick}>View Followers</button>
          </>
        )}

        {this.state.renderChild && this.state.currentFriends && (
          <>
            <div className="friendsList">
              {this.state.currentFriends.map(item => {
                return <FriendCard data={item} />;
              })}
            </div>
            <button onClick={this.nextPage}>Next</button>;
          </>
        )}
      </Div>
    );
  }
}

export default UserCard;
