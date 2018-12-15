import React, { Component } from 'react';
import { Query} from 'react-apollo';
import {getTodos} from '../../Queries';
import DeleteTodo from "./DeleteTodo";
import UpdateToDo from "./UpdateToDo";

class ListAllTodos extends Component {

    render() {
        return (
            <Query query={getTodos}>
                {({loading, error, data}) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    if(data.todo.length===0){
                        return <div>Please add a item :)</div>;
                    }
                    return data.todo.map((todo) => (
                        <div className={todo.completed?"task "+"completed":"task"}>{todo.task}
                            <DeleteTodo todo_id={todo.id}/>
                            {todo.completed === false ? <UpdateToDo todo_id={todo.id}/> : ''}
                        </div>
                    ));

                }}
            </Query>
        );
    }
}

export default ListAllTodos;
