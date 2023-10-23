import { useState } from "react";
import { todoUpdate } from "../redux/slices/todoSlice";
import { useDispatch } from "react-redux";

const Modal = ({ setActiveModal, activeModal, todo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(todo.title)
  const [desc,setDesc] = useState(todo.desc)
  const dispatch = useDispatch();
  const saveHandler = () => {
    setActiveModal((activeModal) => !activeModal)
    dispatch(todoUpdate({
        id: todo.id,
        title,
        desc,
    }))
  }
  return (
    <div
      className={activeModal ? "modal active" : "modal"}
      onClick={() => setActiveModal(false)}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div>
          <div className="title">
            <h4>Title: </h4>
            {!isEdit && <span className="title__conten">{todo.title}</span>}
            {isEdit && <input onChange={(e)=>setTitle(e.target.value)} type="text" value={title} />}
          </div>
          <div className="desc">
            <h4>Description: </h4>
            {!isEdit && <p>{todo.desc}</p>}
            {isEdit && <textarea className="desc-field" onChange={(e) => setDesc(e.target.value)} type="text" value={desc} rows="10" cols="15"></textarea>}
          </div>
        </div>
        <div className="control">
          <button onClick={() => setActiveModal((activeModal) => !activeModal)}>
            Close
          </button>
          <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
          <button onClick={() => saveHandler()}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;