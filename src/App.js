
import { useEffect, useState } from 'react';
import './App.css';
import Task from './Task';
import TaskForm from './TaskForm';

function App() {
const[tasks,setTasks]=useState([]);

useEffect(()=>{
  if (tasks.length === 0) return;
  localStorage.setItem('tasks', JSON.stringify(tasks));
},[tasks]);

useEffect(() => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  setTasks(tasks || []);
}, []);


function addTask(name){
    setTasks( prev => {
      return[...prev,{name:name,done:false}]
    })
}

function removeTrash(taskIndex){
   setTasks(prev=>{
    return prev.filter((taskObject,index)=>{
      return index !== taskIndex;
    })
   })
}

function editTask(taskIndex, newText) {
  setTasks(prev =>
    prev.map((task, index) =>
      index === taskIndex ? { ...task, name: newText } : task
    )
  );
}

function updateTaskDone(taskIndex,newDone){
  setTasks(prev => {
    const newTasks = [...prev];
    newTasks[taskIndex].done = newDone;
    return newTasks;
  });
}
  return (
    <main>
      <h1>TO DO LIST:</h1>
      <h2>Keep it going💪</h2>
      <TaskForm onAdd={addTask}/>
      {tasks.map((task,index) =>(
        <Task{...task}
         onToggle={done => updateTaskDone(index,done)}
         onTrash={()=>removeTrash(index)}
         onEdit={newText => editTask(index,newText)}
         />
      ))}
      
      
    </main>
  );
}

export default App;
