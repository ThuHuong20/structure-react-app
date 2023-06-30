import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { counterActions } from '@stores/slices/counter.slice';
export default function Home() {
    const counterStore = useSelector(store => store.counterStore)
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("counterStore", counterStore);
    }, [])
    return (
        <div>
            <div>Home</div>
            <p>Counter:{counterStore.counter}</p>
            <button onClick={() => {
                dispatch(counterActions.increment())
            }}>Tang counter</button>
            <br></br>
            <button onClick={() => {
                dispatch(counterActions.decrement())
            }}>Giam counter</button>
            <br></br>
            <button onClick={() => {
                dispatch(counterActions.resetCounter(
                    {
                        number: 100,
                        temp: 2
                    }
                ))
            }}>reset counter</button>
        </div>

    )
}
