import React, { useEffect, useState } from 'react'
import './Todo.css'

function Todo() {

    const [tasks,setTasks]=useState([])
    const [newtask,setNewTask]=useState("")
    const [finishedTasks,setFinishedTasks]=useState([])
    const [deletedTasks,setdeletedTasks]=useState([])
    const [flag,setFlag]=useState(false)

    const handleSubmit=(e,i=false,ind=NaN)=>{
        if(i==true){    
            setTasks([...tasks,e])
            const updatedDel=deletedTasks.filter((t,i)=>i!=ind)
            setdeletedTasks(updatedDel)
        }
        else{
            e.preventDefault()
            setTasks([...tasks,newtask])
            setNewTask("")
        }
    }   

    const handleChange=(e)=>{
        setNewTask(e.target.value);
    }

    const deleteTask=(index)=>{
        const deleted=tasks[index]
        const updateTasks=tasks.filter((task,i)=>i!=index)
        setdeletedTasks([...deletedTasks,deleted])
        setTasks(updateTasks)
    }

    const finishTask=(index)=>{
        const finished=tasks[index]
        const updateTasks=tasks.filter((task,i)=>i!=index)
        setFinishedTasks([...finishedTasks,finished])
        setTasks(updateTasks)
    }

  return (
    <div className="todo">
        <h1>To-do List</h1>
        <form className="todo-form" onSubmit={handleSubmit}>
            <label>Add new item</label>
            <div className="">
                <input type="text" onChange={handleChange}/>
                <button type="submit">Add</button>
            </div>
        </form>

        {tasks.length>0&&<h3>Tasks</h3>}
        {tasks.length>0&&tasks.map(
            (task,i)=>(
                <div className="task-box" key={i}>
                    <input type="checkbox" checked={false} onChange={()=>finishTask(i)}/>
                    <p>{task}</p>
                    <button onClick={()=>deleteTask(i)}>delete</button>
                </div>
            )
        )
        }
        {finishedTasks.length>0&&<h3>Finished tasks</h3>}
        {finishedTasks.length>0&&finishedTasks.map(
            (task,i)=>(
                <div className="fin-task-box" key={i}>
                    <p><strike>{task}</strike></p>
                </div>
            )
        )
        }

        {deletedTasks.length>0&&<p className="show-ch" onClick={()=>setFlag(!flag)}>Show deleted tasks?</p>}
        {flag&&deletedTasks.map(
            (task,i)=>(
                <div className="task-box" key={i}>
                    <p>{task}</p>
                    <button onClick={()=>handleSubmit(task,true,i)}>Undo delete</button>
                </div>
            )
        )
        }   
    </div>
  )
}

export default Todo