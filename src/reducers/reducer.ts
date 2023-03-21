import { useReducer } from "react";
import { Todo } from "../model";

type Actions = |{
    type: 'add';
    payload: string,
} |
{
    type: 'remove';
    payload: number,
} |
{  type: 'edit';
payload: number
}

export function TodoReducer (state: Todo[], action: Actions) {
    switch (action.type){
        case "add" : 
        return [
            ...state,
            {id : Date.now(), todo: action.payload, isDone: false}
        ];
        case "remove" : 
        console.log("hey")
        return state.filter((todo) => todo.id !== action.payload);
        case "edit" :
            return state.map((todo) => {
                if(todo.id === action.payload){
                    return {...todo, isDone: !todo.isDone}
                }
                return todo;
            });
            default:
                return state;
    }
}

// const ReducerExample = () => {

// const [state, dispatch] = useReducer(todoReducer, []);

// return {

// }

// }