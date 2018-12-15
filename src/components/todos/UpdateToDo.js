import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import {updateTodo, getTodos} from '../../Queries';

class UpdateToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.todo_id
        }

    }

    updateTodo(update_to_do) {
        update_to_do({variables: this.state, refetchQueries: [{query: getTodos}]});
    }


    render() {
        return (
            <Mutation mutation={updateTodo}>
                {(update_to_do) => (
                    <div className="update" onClick={() => {
                        this.updateTodo(update_to_do);
                    }
                    }>✓</div>
                )}
            </Mutation>
        );
    }
}

export default UpdateToDo;
