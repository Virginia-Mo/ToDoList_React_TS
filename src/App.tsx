import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.scss';
import InputField from './components/InputField/InputField';
import TodoList from './components/TodoList/TodoList';
import {Todo} from './model'

function App () {
  
  const [todo, setTodo] = useState<string>("");
  const [todosArray, setTodosArray] = useState<Todo[]>([])
  const [inProgress,setInProgress] = useState<Todo[]>([])
  const [completed,setCompleted] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent ) => {
    e.preventDefault();
    if (todo) {
      setTodosArray([...todosArray, {id : Date.now(), todo: todo, isDone:false} ]);
      setTodo("")
    }
  }

const onDragEnd = (result: DropResult) => {
  const {source, destination } = result;
  if (!destination) {
    return
  }
  if (destination.droppableId === source.droppableId && destination.index === source.index) {
    return
  }
 let addItem;
 let active = todosArray;
 let progress = inProgress;
 let complete = completed;

 if (source.droppableId === "TodosList") {
   addItem = active[source.index];
   active.splice(source.index, 1);
 } else if (source.droppableId === "TodosProgress") {
   addItem = progress[source.index];
   progress.splice(source.index, 1);
 } else {
   addItem = complete[source.index];
  complete.splice(source.index, 1);
 }

 if (destination.droppableId === "TodosList") {
  active.splice(destination.index, 0, {...addItem, isDone:false});
} else if (destination.droppableId === "TodosProgress") {
  progress.splice(destination.index, 0, addItem);
}else {
  complete.splice(destination.index, 0, {...addItem, isDone:true});} 

setCompleted(complete);
setTodosArray(active);
}

  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="App">
    <span className="heading">My to do list</span>
    <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
    <TodoList todosArray={todosArray} 
    setTodosArray={setTodosArray} 
    completed={completed} 
    setCompleted={setCompleted}
    inProgress={inProgress} 
    setInProgress={setInProgress} />
    </div>
    </DragDropContext>
  );
}

export default App;
