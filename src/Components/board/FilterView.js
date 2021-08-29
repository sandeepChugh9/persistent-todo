
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_TYPES } from '../../constants';
import {  setFilter } from '../../actions/filterActions';
import './index.css';


export default function FilterView(){
    const dispatch = useDispatch();
    const selectedFilter = useSelector((state) => state.filter);
  
    const onClick =(filterType)=>{
      dispatch(setFilter(filterType))
    }
    return(<div className="filterView"> 
        {
          Object.keys(FILTER_TYPES).map((key,i)=>{
            return <div key={i} 
                        onClick={() => onClick(key)}
                        className={`filterType ${selectedFilter === key ? 'selected':''}`}>
                        {FILTER_TYPES[key]}
                  </div>
          })
        }
    </div>)
  }