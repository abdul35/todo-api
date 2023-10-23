import { useState } from "react";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { removeTodo, toggleStatus } from "../redux/slices/todoSlice";
import Modal from "../components/Modal";

const LI = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px red;
`;

export const TodoItem = ({ todo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const dispatch = useDispatch();


  const editHandler = () => {
    setActiveModal((activeModal) => !activeModal);
    setIsEdit(() => !isEdit);
  };

  return (
    <LI className="todo__item" draggable="true">
      <input
        className="todo-complite"
        onChange={() => dispatch(toggleStatus(todo.id))}
        type="checkbox"
        checked={todo.completed}
      />
      <div className="todo-text-wrap">
        <span
          className="todo-text"
          style={{ textDecoration: todo.completed ? "line-through" : "" }}
        >
          {todo.title}
        </span>
      </div>

      <div>
        <button className="edit-btn" onClick={() => editHandler(todo.id)}>
          Details
        </button>
        <button
          className="delete-btn"
          onClick={() => dispatch(removeTodo(todo.id))}
        >
          Delete
        </button>
      </div>
      <Modal
        setActiveModal={setActiveModal}
        activeModal={activeModal}
        todo={todo}
      />
    </LI>
  );
};
