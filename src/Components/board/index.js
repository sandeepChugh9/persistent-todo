
import { useDispatch, useSelector  } from 'react-redux';
import { useState, useEffect } from 'react';
import {  DragDropContext } from 'react-beautiful-dnd';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TASK_STATES } from '../../constants';
import TaskAddView from './taskAddView';
import List from '../list';
import './index.css';
import FilterView from './FilterView';
import { updateTask, fetchTasks} from '../../actions/taskActions';
import { getUsers , fetchUser } from '../../actions/userActions';

function Fab(){
  const dispatch = useDispatch();
  const [addViewVisible, setAddViewVisible] = useState(false);
  const userState = useSelector((state) => state.user);
  useEffect(()=>{
      if(Object.keys(userState.loggedInUser).length === 0){
        dispatch(fetchUser());
      }
      dispatch(getUsers())
     
  },[dispatch,userState.loggedInUser])

  const onFabClick = ()=>{
    setAddViewVisible(!addViewVisible);
  } 
  return(
        <>
          <button className={`addTaskButton ${addViewVisible ? 'active':''}`} onClick={onFabClick}>+</button> 
          <TaskAddView onCancel={()=> setAddViewVisible(false)} isVisible={addViewVisible}/>
        </>
 );

}

function Board() {
  const dispatch = useDispatch();
  const [taskFetching, setTasksFetching] = useState(true);

  useEffect(()=>{
      dispatch(fetchTasks())
      .then(()=>  {setTasksFetching(false)})
      .catch(()=> setTasksFetching(false));
  },[dispatch]);
  
  
  const onDragEnd = (data) => {
    const { source , destination , draggableId} = data;
    if(source && destination && source.droppableId !== destination.droppableId){
      let payload = { id: draggableId, status: destination.droppableId , previousStatus: source.droppableId}
      dispatch(updateTask(payload));
    }
  }
  
  return (
    <div className="board">
      {
        taskFetching &&
        <Loader type="TailSpin" color="#000" height={80} width={80} />
      }

      { !taskFetching &&
      <>
        <FilterView/>
        <div className="listWrapper">
          <DragDropContext onDragEnd={onDragEnd}>
            { Object.keys(TASK_STATES).map((key,i)=>{
                return <List key={i} type={key}/>
              })
            }
          </DragDropContext>
        </div>
        <Fab/>
      </>
      }
    </div>
  );
}

export default Board;
