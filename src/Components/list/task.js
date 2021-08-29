import { useDispatch , useSelector } from 'react-redux';
import { deleteTask } from '../../actions/taskActions';
import './index.css';

function Task(props) {
  const dispatch = useDispatch();
  const userState = useSelector((state)=> state.user);
  const { taskdata, innerref } = props;
  const onDelete = () =>{
    dispatch(deleteTask(taskdata._id))
  }

  let creator = userState.userList.filter((user)=> user._id === taskdata.createdBy);
  let assignedTo = userState.userList.filter((user)=> user._id === taskdata.assignedTo);
  return (
    <div className="task" ref={innerref} {...props.dragprops} {...props.draghandleprops}>
       <div className="taskTitle">{taskdata.taskTitle}</div>
       <div className="taskBody">{taskdata.taskBody}</div>
       <img onClick={onDelete} className="deleteIcon" alt='' src='images/delete.png'/>
       <div>
          <div className='taskCredit'>Created by: <b>{creator[0] && creator[0].username}</b></div>
          <div className='taskCredit'>Assigned to: <b>{assignedTo[0] && assignedTo[0].username}</b></div>
      </div>
    </div>
  );
}

export default Task;
