import './style.scss'
import { useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Todo } from '../../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

interface Props {
  todo : Todo,
  todosArray: Todo[];
  setTodosArray: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
}

function TodoItem({todo, todosArray, setTodosArray, index}: Props) {
  const [editTodo, setEditTodo] = useState<string>(todo.todo)
  const [edit, setEdit] = useState<boolean>(false)

  const inputElem = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputElem.current?.focus()
  },[edit])

  const handleDone = (id : number) => {
    setTodosArray(
      todosArray.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo, 
        isDone : !todo.isDone}
        } else {
          return todo
        }
      }
    ))
    }

  const handleDelete= (id : number) => {
      setTodosArray(todosArray.filter((todo) => todo.id !== id))
    }

  const handleEdit = (isDone : boolean) => {
     if (!edit && !isDone) {
      setEdit(!edit)
     }
    }

  const submitEdit = (e: React.FormEvent, id : number ) => {
      e.preventDefault()
      setTodosArray(
        todosArray.map((todo) => { 
        if (todo.id === id) {
          return {
            ...todo,todo : editTodo
      }
    } else {
      return todo
    }
  }))
       setEdit(!edit)
    }

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      { (provided, snapshot) => (
     <form className={`todoItem ${snapshot.isDragging ? 'drag' : ""}`} 
      onSubmit={(e) => submitEdit(e, todo.id)}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}> 
        { edit ? (
          <input 
          className='todoItem__input'
          ref={inputElem}
          value={editTodo} 
          type="text" 
          onChange={(e) => setEditTodo(e.target.value)}/>
        ) : todo.isDone? ( 
        <span className='todoItem__p todoItem__p--done'>{todo.todo}</span>)
      : (
        <span className='todoItem__p'>{todo.todo}</span>
      ) }
        <div>

          <span className="icon"><AiFillEdit onClick={() => handleEdit(todo.isDone)}/>  </span>
          <span className="icon"><AiFillDelete onClick={() => handleDelete(todo.id)}/></span>
          <span className="icon"><MdDone onClick={() => handleDone(todo.id)}/></span>
        </div>
    </form>
      )}
    </Draggable>
  );
}

export default TodoItem;