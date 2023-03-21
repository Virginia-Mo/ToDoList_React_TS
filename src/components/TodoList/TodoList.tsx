import './style.scss'
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../../model';
import TodoItem from '../TodoItem/TodoItem';

interface Props {
  todosArray: Todo[];
  setTodosArray: React.Dispatch<React.SetStateAction<Todo[]>>;
  completed: Todo[];
  setCompleted: React.Dispatch<React.SetStateAction<Todo[]>>;
  inProgress: Todo[];
  setInProgress: React.Dispatch<React.SetStateAction<Todo[]>>;
}

function TodoList({todosArray,
  setTodosArray,
  completed,
  setCompleted,inProgress,
  setInProgress}: Props) {
  return (
    <div className="container">
    <Droppable droppableId='TodosList' >
{(provided, snapshot) => (
  <div className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ""}`}
  ref={provided.innerRef}{...provided.droppableProps}>
        <span className="todos__headings">
          To Do Tasks
        </span>
        { todosArray.map((todo, index) => (
           <TodoItem 
           index={index}
           todo={todo} 
           key={todo.id} 
           todosArray={todosArray}
           setTodosArray={setTodosArray}/>
        ))}
       {provided.placeholder}
      </div>
)}
    </Droppable>
    <Droppable droppableId='TodosProgress' >
{(provided, snapshot) => (
  <div className={`todos progress ${snapshot.isDraggingOver ? 'dragprogress' : ""}`}
  ref={provided.innerRef}{...provided.droppableProps}>
        <span className="todos__headings">
          In Progress Tasks
        </span>
        { inProgress.map((todo, index) => (
           <TodoItem 
           index={index}
           todo={todo} 
           key={todo.id} 
           todosArray={inProgress}
           setTodosArray={setInProgress}/>
        ))}
       {provided.placeholder}
      </div>
)}
    </Droppable>
    <Droppable droppableId='TodosRemove' >
      {(provided, snapshot) => (
      <div className={`todos remove ${snapshot.isDraggingOver ? 'dragcomplete' : "" }`}
      ref={provided.innerRef}{...provided.droppableProps}>
      <span className="todos__headings">
          Completed Tasks
        </span>
        { completed.map((todo, index) => (
           <TodoItem 
           index={index}
           todo={todo} 
           key={todo.id} 
           todosArray={completed}
           setTodosArray={setCompleted}/>
        ))}
       {provided.placeholder}
      </div>
       )}
    </Droppable>
   </div>
  );
}

export default TodoList;