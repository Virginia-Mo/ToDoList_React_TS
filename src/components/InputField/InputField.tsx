import { useRef } from 'react';
import './style.scss'

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

function InputField({todo, setTodo, handleAdd }: Props) {

  const inputTag = useRef<HTMLInputElement>(null)

  return (
    <form action="" className="input" onSubmit={(e) => {
      handleAdd (e)
      inputTag.current?.blur()}}>
      <input 
      type="input"
      ref={inputTag}
      placeholder="Enter a task"
      className="input__box"
      value={todo}
      onChange={(e) => setTodo(e.target.value)}
       />
      <button type="submit" 
      className="input__button"> GO </button>
    </form>

  );
}

export default InputField;
