import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if(newTaskTitle){
      const task = {
        id: Math.floor(Math.random() * 999),
        title: newTaskTitle,
        isComplete: false
      }
      setTasks([...tasks, task]);
      setNewTaskTitle('');
    } 
  }

  function handleToggleTaskCompletion(id: number) {
    const taskToggle = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete,
    } : task);
    setTasks(taskToggle);
  }

  function handleRemoveTask(id: number) {
    const indexTask = tasks.findIndex(task => task.id === id);
    if(indexTask !== -1){
      tasks.splice(indexTask, 1);
      setTasks([...tasks]);
    }

    // O código abaixo tem o mesmo resultado que o código anterior
    // porém utilizandos métodos diferentes

    // Nesse trecho de código esta sendo realizando um filtro no array de Tasks 
    // retornando todas as tasks exceto a task a qual foi informado o ID 
    //const tasksWithFilter = tasks.filter(task => task.id !== id);
    //setTasks(tasksWithFilter);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}