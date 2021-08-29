
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect, useCallback } from 'react';
import { TASK_STATES } from '../../constants';
import { addTask } from '../../actions/taskActions';
import './index.css';

export default function TaskAddView({ onCancel, isVisible }){
    const dispatch = useDispatch();
    const node = useRef();
    const userState = useSelector((state) => state.user);
    const [taskData, setTaskData] = useState({ taskTitle:'' , taskBody: '', assignedTo: ''});
    const [error, setError] = useState(' ');
    const handleClick = useCallback((e) => {
        if (node.current.contains(e.target) || e.target.classList.contains('addTaskButton')) {
          return;
        }
        onCancel();
      },
      [onCancel],
    );
    useEffect(() => {
      document.addEventListener("mousedown", handleClick);
  
      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }, [handleClick]);
  
    
    
   
    const onSubmit = () =>{  
      const { taskTitle , taskBody, assignedTo } = taskData;
      if(taskTitle.length === 0 || taskBody.length === 0 || assignedTo.length === 0){
        setError('Please enter all the fields');
        return;
      }else{
        setError('');
      }
      let data = { 
        taskTitle, 
        taskBody, 
        status: Object.keys(TASK_STATES)[0], 
        assignedTo 
      };

      dispatch(addTask({ taskData: data}));
      setTaskData({ taskTitle:'' , taskBody: '', assignedTo: ''});
    }
  
  
    const onInputChange = (event) =>{
      const { name , value } = event.target;
      let newState = Object.assign({}, taskData, {[name]:value});
      setTaskData(newState);
    }
  
    
      return (<div ref={node} className={`createView ${isVisible? 'expand':'collapse'}`}>
               <div className='inputRow'>
                <label>Task Title</label>
                <input type='text' onChange={onInputChange} name='taskTitle' value={taskData['taskTitle']}/>
               </div>
  
               <div className='inputRow'>
                 <label>Description</label>
                 <input type='text' onChange={onInputChange} name='taskBody' value={taskData['taskBody']}/>
               </div>
               <div className='inputRow selectRow'>
                 <label>Assign to</label>
                 <select onChange={onInputChange} name="assignedTo" value={taskData['assignedTo']}>
                     <option value={''}>Select User</option>
                  {
                       userState.userList.map((user)=> <option key={user._id} value={user._id}>{user.email}</option>)
                  }
                </select>
               </div>
               <div className='error'>{error}</div>
               <div className='buttonRow'>
                   <button onClick={onSubmit}>Create</button>
                   <button onClick={onCancel}>Cancel</button>
               </div>
        </div>)
    
  }