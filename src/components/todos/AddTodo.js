import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import {addTodo, getTodos} from '../../Queries';

class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: "",
            user: localStorage.getItem("user"),
            completed: false
        }
        this.handleTask = this.handleTask.bind(this);
    }

    addtodo(insert_todos) {
        insert_todos({ variables: this.state, refetchQueries: [{ query: getTodos }] });
    }

    handleTask(event) {
        this.setState({task: event.target.value});
    }

    render() {
        return (
            <Mutation mutation={addTodo}>
                {(insert_todos) => (
                    <div>
                    <input type="text" name="name" value={this.state.task} onChange={this.handleTask}
                           placeholder="Enter the task name"/>
                    <div className="add-task" onClick={() => this.addtodo(insert_todos)}>+</div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default AddTodo;
