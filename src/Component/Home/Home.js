import React, { Component } from 'react';
import TodoForm from './TodoForm';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container mt-4">
        <TodoForm />
      </div>
    )
  }
}

export default Home;