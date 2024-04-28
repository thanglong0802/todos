import './App.css';
import {useEffect, useState} from "react";
import Todo from "./Todo";
import {Button, Input} from "antd";

let index = 0;

function App() {
    const [input, setInput] = useState('')
    const [todos, setTodos] = useState([]);
    const [todosByStatus, setTodosByStatus] = useState([]);

    const handleChange = (e) => {
        setTodos([...todos, {
            key: index += 1,
            todo: e.target.value,
            status: 1
        }]);
        setInput('');
    }

    const handleComplete = (keysCompleted) => {
        todos.map(item => {
            if (keysCompleted.includes(item.key)) {
                item.status = 0;
            }
        })
    }

    const handleDisplayTodosByStatus = (status) => {
        if (status === "ALL") {
            setTodosByStatus(todos);
        } else if (status === "ACTIVE") {
            const newTodos = todos.filter(item => item.status === 1);
            setTodosByStatus(newTodos);
        } else if (status === "COMPLETED") {
            const newTodos = todos.filter(item => item.status === 0);
            setTodosByStatus(newTodos);
        } else if (status === "CLEAR-COMPLETED") {
            const newTodos = todos.filter(item => item.status === 1);
            setTodos(newTodos);
        }
    }

    useEffect(() => {
        setTodosByStatus(todos);
    }, [todos]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', background: 'aquamarine' }}>
            <div style={{ justifyContent: 'center' }}>
                <h1 style={{textAlign: 'center'}}>todos</h1>
                <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '3rem', paddingRight: '3rem'}}>
                    <Input
                        placeholder="What needs to be done?"
                        allowClear
                        onPressEnter={(event) => handleChange(event)}
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        size="large"
                    />
                    <hr/>
                    <Todo todos={todosByStatus} handleComplete={handleComplete}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '10px'}}>
                    <span>{todosByStatus.length} item left!</span>
                    <Button onClick={() => handleDisplayTodosByStatus("ALL")}>All</Button>
                    <Button onClick={() => handleDisplayTodosByStatus("ACTIVE")}>Active</Button>
                    <Button onClick={() => handleDisplayTodosByStatus("COMPLETED")}>Completed</Button>
                    <Button onClick={() => handleDisplayTodosByStatus("CLEAR-COMPLETED")}>Clear completed</Button>
                </div>
            </div>
        </div>
    );
}

export default App;
