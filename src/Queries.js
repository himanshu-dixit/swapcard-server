import gql from 'graphql-tag';

export const getTodos = gql`{
    todo(order_by: {id: desc, completed: asc}){
        id
        task
        user
        completed
    }
}`;

export const addTodo = gql`
    mutation($task: String!, $user: String! ,$completed: Boolean!) {
        insert_todo(
            objects: [
                {
                  task: $task,
                  user: $user,
                  completed: false
                }
              ]
          ){
            affected_rows
          }
    }
`;

export const deleteTodo = gql`
    mutation($id: Int!) {
        delete_todo(
            where: {id: {_eq:$id}}
        ){
            affected_rows
        }
    }
`;

export const updateTodo = gql`
    mutation($id: Int!) {
        update_todo(
            where: {id: {_eq:$id}}
             _set: {completed: true}
        ){
            affected_rows
        }
    }
`;
