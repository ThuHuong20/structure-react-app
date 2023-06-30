import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { counterActions } from '@stores/slices/counter.slice';
import Loading from '@components/Loadings/Loading'
export default function About() {
    const dispatch = useDispatch();
    const counterStore = useSelector(store => store.counterStore)
    useEffect(() => {
        console.log("counterStore.users", counterStore.users);
    }, [counterStore.users])
    return (
        <div>
            {
                counterStore.loading ? <Loading /> : <></>
            }
            <h1>about page</h1>
            <button onClick={() => {
                dispatch(counterActions.findAllUesrs())
            }}>FindAll Users</button>
            <Outlet></Outlet>
        </div>
    )
}
