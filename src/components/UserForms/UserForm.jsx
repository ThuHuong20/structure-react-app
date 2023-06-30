import React from 'react'
import './UserForm.scss'
import { useDispatch } from 'react-redux'
export default function UserForm(props) {
    const dispatch = useDispatch();
    return (
        <div className='userForm_container'>
            <form className='forms' onSubmit={(event) => {
                event.preventDefault()
                console.log("even", event.target.userName.value);
                if (event.target.userName.value == "") {
                    alert("dien day du")
                    return
                }
                let newUser = {
                    name: event.target.userName.value,
                    email: event.target.userMail.value,
                    number: event.target.userNumber.value,
                    block: props.dataForm.preData != null ? props.dataForm.preData.block : false
                }
                if (props.dataForm.type == "add") {
                    dispatch(props.dataForm.functionSubmit(newUser))
                }
                if (props.dataForm.type == "update") {
                    dispatch(props.dataForm.functionSubmit(
                        {
                            userId: props.dataForm.preData.id,
                            editData: newUser
                        }
                    ))
                }
                //reset form
                event.target.userName.value = "";
                event.target.userMail.value = ""
                event.target.userNumber.value = ""
                // props.dataForm.functionCloseForm(false);
                event.target.cancel.click();
            }}>
                {/* input userName */}
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                            User Name
                        </span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="userName"
                        defaultValue={props.dataForm.preData != null ? props.dataForm.preData.name : ""}
                    />
                </div>
                {/* email */}
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                            User Email
                        </span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Usermail"
                        aria-label="Usermail"
                        aria-describedby="basic-addon1"
                        name="userMail"
                        defaultValue={props.dataForm.preData != null ? props.dataForm.preData.email : ""}
                    />
                </div>
                {/* number */}
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                            User Number
                        </span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Usernumber"
                        aria-label="Usernumber"
                        aria-describedby="basic-addon1"
                        name="userNumber"
                        defaultValue={props.dataForm.preData != null ? props.dataForm.preData.number : ""}
                    />
                </div>
                {/* submit */}
                <button style={{ marginRight: "10px" }} type="submit" className="btn btn-primary">
                    {props.dataForm.type == "add" ? "Add" : "Save"}
                </button>
                {/* huy tat form */}
                <button onClick={() => {
                    props.dataForm.functionCloseForm(false)
                }} name='cancel' type="button" className="btn btn-secondary">Hủy</button>
            </form>
        </div >
    )
}
