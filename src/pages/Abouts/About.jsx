import React, { Fragment, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { counterActions } from '@stores/slices/counter.slice';
import Loading from '@components/Loadings/Loading'
import UserForm from '@components/UserForms/UserForm';
export default function About() {
    const dispatch = useDispatch();
    const counterStore = useSelector(store => store.counterStore)
    useEffect(() => {
        dispatch(counterActions.findAllUesrs())
    }, [])
    // useEffect(() => {
    //     console.log("counterStore", counterStore.users);
    // }, [counterStore.users])
    // dieu khien userForm
    // điều khiển user form
    const [showUserForm, setShowUserForm] = useState(false);
    const [dataForm, setDataForm] = useState(null)
    return (
        <div>
            {
                counterStore.loading ? <Loading /> : <></>
            }
            {
                showUserForm ? <UserForm dataForm={dataForm}></UserForm> : <></>
            }
            <h1>about page</h1>
            <button type="button" class="btn btn-warning" onClick={() => {
                setShowUserForm(true)
                setDataForm({
                    functionCloseForm: setShowUserForm,
                    type: 'add', // loại form: add: thêm, update: cập nhật
                    functionSubmit: counterActions.createNewUsers,
                    preData: null
                })
            }}>Add New User</button>
            <br></br>
            {counterStore.users.map((user) =>
                <Fragment key={user.id}>
                    <div onContextMenu={(e) => {
                        e.preventDefault();// huy hanh vi mawc dinh cua chuot phai
                        dispatch(counterActions.setStatusUser(
                            {
                                userId: user.id,
                                patchData: {
                                    block: !user.block
                                }
                            }
                        ))
                    }} style={{ textDecoration: user.block ? "line-through" : "" }} >UserName:{user.name}, UserId:{user.id}, Email:{user.email}. number:{user.number}</div>
                    <button onClick={() => {
                        console.log("delete", user.id);
                        dispatch(counterActions.deleteUserById(user.id))
                    }} type='button' className='btn btn-danger'>Delete</button>
                    <button onClick={() => {
                        setShowUserForm(true)
                        setDataForm({
                            functionCloseForm: setShowUserForm,
                            type: 'update', // loại form: add: thêm, update: cập nhật
                            functionSubmit: counterActions.updateUser,
                            preData: user
                        })
                    }} type='button' className='btn btn-success'>Edit</button>
                </Fragment>
            )}
            <br></br>
            <Outlet></Outlet>
        </div>
    )
}
