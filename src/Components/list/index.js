
import { useSelector } from 'react-redux';
import {  Droppable, Draggable } from 'react-beautiful-dnd';
import { TASK_STATES, FILTER_TYPES } from '../../constants';
import Task from './task'
import './index.css';


function List(props) {
 
  const state = useSelector((state) => state.tasks);
  const filter = useSelector((state) => state.filter);
  const tasks = state.filter((task)=> task.status === props.type);
  const isListVisible = filter === props.type || filter === Object.keys(FILTER_TYPES)[0];

  const getListStyle = isDraggingOver => ({
      background: isDraggingOver ? 'rgb(222 234 239)' : '#efefef',
  });

  return (
    <Droppable droppableId={`${props.type}`}>
       {(provided, snapshot) => (
        <div className={`tasklist ${isListVisible ? 'fadeIn':'fadeOut'}`}  
            ref={provided.innerRef} 
            style={getListStyle(snapshot.isDraggingOver)}>
            <div className="taskListheader">
                <div className="listName">{TASK_STATES[props.type]}</div>
                <div className="countTasks">{(tasks && tasks.length) || 0}</div>
            </div> 
          <div className="scrollableList">
            { tasks.map((taskData, index)=> (
                    <Draggable
                    key={taskData._id}
                    draggableId={taskData._id}
                    index={index}>
                    {(provided, snapshot) => (
                      <Task 
                          key={taskData.id} 
                          taskdata={taskData}  
                          innerref={provided.innerRef}
                          dragprops={provided.draggableProps}
                          draghandleprops= {provided.dragHandleProps}
                          isdragging={snapshot.isDragging}/>
                      )}
                    </Draggable>
              ))}
          </div>
          {provided.placeholder}
        </div>
       )}
    </Droppable>
  );
}

export default List;
