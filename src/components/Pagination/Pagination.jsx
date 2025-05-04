import ArrowLeft from '../../assets/ArrowLeft';
import ArrowRight from '../../assets/ArrowRight';
import styles from './styles.module.css';
import { useEffect, useState, useRef } from 'react';

function Pagination({totalRestro, updateResult}) {
    const [active, setActive] = useState(1);
    const [last, setLast] = useState(0);
    const [pagination, setPagination] = useState([]);

    const leftRef = useRef(null);
    const rightRef = useRef(null);

    useEffect(()=>{
        if(last>0){
            let arr = [];
            for (let i = 1; i <= 5 && i <= last; i++) arr.push(i);
            setPagination(arr);
        }
    },[last])

    useEffect(() => {
        const fix = totalRestro/24;
        let totalPage = parseInt(fix);
        if(fix - totalPage > 0){
           totalPage++; 
        }
        setLast(totalPage);
    }, [totalRestro]);

    useEffect(()=>{
        if(pagination.length > 1){
            if(active == 1){
                leftRef.current.disabled = true;
                rightRef.current.disabled = false;
            }else if(active == last){
                leftRef.current.disabled = false;
                rightRef.current.disabled = true;
            }else{
                leftRef.current.disabled = false;
                rightRef.current.disabled = false;
            }
            updateResult(active);
        }
    },[active]);

    function updateActive(payload){
        if(payload-active > 0){
            for(let i = active; i < payload; i++){
                if(i > 2 && i < last-2){
                    pagination.push(pagination[4]+1);
                    pagination.shift();
                }
            }
        }else{
            for(let i = active-1; i >= payload; i--){
                if(i > 2 && i < last-2){
                    pagination.unshift(pagination[0]-1);
                    pagination.pop();
                }
            }
        }
        setActive(payload);
    }

    return (
        pagination.length > 1 ? 
        <div className={styles.pagination}>
            <button ref={leftRef} className={styles.left} onClick={() => updateActive(active-1)} ><ArrowLeft/></button>
            <ul>
                {pagination.map((ele, indx) => {
                    return <li key={ele + indx} className={ele == active ? `${styles.active}` : ''} onClick={() => updateActive(ele)}>{ele}</li>;
                })}
            </ul>
            <button ref={rightRef} className={styles.right} onClick={() => updateActive(active+1)}><ArrowRight /></button>
        </div> : ''
    );
}

export default Pagination;