import {styled} from "styled-components"

const Input = styled.input`
    padding: 5px 8px;
    font-size: 1rem;
    width: 250px;
    margin-right: 1rem;
`
const TodoAddInput = ({setNewTodoTitle, newTodoTitle}) => {
    return <Input type="text" onChange={(e) => setNewTodoTitle(e.target.value)} value={newTodoTitle} placeholder="Enter here to add new todo..."/>
} 

export default TodoAddInput