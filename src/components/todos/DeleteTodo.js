import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import {deleteTodo, getTodos} from '../../Queries';

class DeleteTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.todo_id
        }

    }

    deletetodo(delete_to_do) {
        delete_to_do({ variables: this.state, refetchQueries: [{ query: getTodos }] });
    }


    render() {
        return (
            <Mutation mutation={deleteTodo}>
                {(delete_to_do) => (

                        <div className="delete" onClick={() => {
                            this.deletetodo(delete_to_do);
                        }
                        } >x</div>
                )}
            </Mutation>
        );
    }
}

export default DeleteTodo;
