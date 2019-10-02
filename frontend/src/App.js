import React, { Component } from 'react';
import axios from 'axios';
import UserCard from './components/UserCard';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  flex-direction: columm;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-family: 'Cinzel', serif;
`;

class App extends Component {
  state = {
    userData: null
  };

  componentDidMount() {
    axios
      .get('https://api.github.com/users/VictorArowo')
      .then(res => this.setState({ userData: res.data }));
  }

  render() {
    return (
      this.state.userData && (
        <Div>
          <UserCard data={this.state.userData} />
        </Div>
      )
    );
  }
}

export default App;
