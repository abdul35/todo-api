import { styled } from "styled-components"

const TextArea = styled.textarea`
    padding: 5px 8px;
    font-size: 1rem;
    width: 250px;
    margin-right: 1rem;
    resize: none;
`
const TodoDescInput = ({setNewTodoDesc, newTodoDesc}) => {
    return <TextArea type="text" onChange={(e) => setNewTodoDesc(e.target.value)} value={newTodoDesc} placeholder="Enter here desc todo..."/>
} 

export default TodoDescInput