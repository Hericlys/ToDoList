import React, {useState, useEffect} from "react";
import "./TodoList.css";
import Icon from "./assets/icon.webp"

function TodoList() {

    const listStorage = localStorage.getItem('list');
    const [list, setList] = useState(listStorage ? JSON.parse(listStorage) : []);
    const [newItem, setNewItem] = useState("")

    useEffect(()=>{
        localStorage.setItem('list', JSON.stringify(list))
    }, [list])

    function addItem(form) {
        form.preventDefault();
        if(!newItem) {
            return;
        }

        setList([...list, {text: newItem, isCompleted: false}])
        setNewItem("");
        document.getElementById("input").focus();
    }

    function clicked(index) {
        const listAux = [...list];
        listAux[index].isCompleted = !listAux[index].isCompleted;
        setList(listAux);
    }

    function deleteItem(index) {
        const listAux = [...list];
        listAux.splice(index, 1);
        setList(listAux);
    }

    function deleteAllItems() {
        setList([]);
    }

    return (
        <div className="main-container">
            <h1 className="title">Todo list</h1>
            <form className="form" onSubmit={addItem}>
                <input
                    id="input"
                    type="text"
                    value={newItem}
                    onChange={(e)=>{setNewItem(e.target.value)}}
                    placeholder="Add a task"
                />
                <button type="submit" className="add">Add</button>
            </form>
            <div className="todo-list">
                {
                    list.length < 1
                    ?
                    <img className="central-icon" src={Icon}/>
                    :
                    list.map((item, index)=>(
                        <div 
                            key={index}
                            className={item.isCompleted? 'item complete' : 'item'}
                        >
                            <span onClick={()=>{clicked(index)}}>{item.text}</span>
                            <button className="del" onClick={()=>{deleteItem(index)}}>Delete</button>
                        </div>
                        
                    ))
                }
            <button
                className={list.length < 1 ? "del-all" : "del-all visible"}
                onClick={()=>{deleteAllItems()}}>
                    Delete all
            </button>
            </div>
        </div>
    )
}

export default TodoList;