import React, {Component} from 'react';
import Auth from "../../services/Auth";

import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import AddTodo from "../../components/todos/AddTodo";
import ListAllTodos from "../../components/todos/ListAllTodos";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        const ACCESS_TOKEN = localStorage.getItem('access_token');
        this.client = new ApolloClient({
            uri: "https://himanshu-todo.herokuapp.com/v1alpha1/graphql",
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
            }
        });
    }

    logout() {
        let auth = new Auth();
        auth.logout();
    }

    render() {
        return (
            <div>
                <ApolloProvider client={this.client}>
                    <AddTodo/>
                    <ListAllTodos/>
                </ApolloProvider>
                <div className="button" onClick={() => this.logout()}>Logout</div>
            </div>
        );
    }
}

export default Dashboard;
