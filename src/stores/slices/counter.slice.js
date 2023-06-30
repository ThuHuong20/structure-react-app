import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const findAllUesrs = createAsyncThunk(
    "findAllUesrs",
    async () => {
        let res = await axios.get(process.env.REACT_APP_SERVER_JSON + "users")
        return res.data
    }
)
const createNewUsers = createAsyncThunk(
    "createNewUsers",
    async (newUser) => {
        //http://localhost:4000/users
        let res = await axios.post(process.env.REACT_APP_SERVER_JSON + 'users', newUser);
        return res.data
    }
)
const deleteUserById = createAsyncThunk(
    "deleteUserById",
    async (userId) => {
        //http://localhost:4000/users/1
        let res = await axios.delete(process.env.REACT_APP_SERVER_JSON + 'users/' + userId);
        return userId
    }
)
const updateUser = createAsyncThunk(
    "updateUser",
    async (dataObj) => {
        console.log("dataObj", dataObj);
        //http://localhost:4000/users/1   , editData
        let res = await axios.put(process.env.REACT_APP_SERVER_JSON + 'users/' + dataObj.userId, dataObj.editData);
        return res.data
    }
)
const setStatusUser = createAsyncThunk(
    "setStatusUser",
    async (dataObj) => {
        console.log("dataObj", dataObj);
        //http://localhost:4000/users/1   , editData
        let res = await axios.patch(process.env.REACT_APP_SERVER_JSON + 'users/' + dataObj.userId, dataObj.patchData);
        return res.data
    }
)
const counterSlice = createSlice(
    {
        name: "counter",
        initialState: {
            counter: 0,
            loading: false,
            users: []
        },
        reducers: {
            increment: (state, action) => {
                return { ...state, counter: state.counter + 1 }
            },
            decrement: (state, action) => ({ ...state, counter: state.counter - 1 }),
            resetCounter: (state, action) => {
                return { ...state, counter: action.payload.number * action.payload.temp }
            }
        },
        extraReducers: (builder) => {
            // find all users
            builder.addCase(findAllUesrs.pending, (state, action) => {
                state.loading = true;
                console.log("da vao pending");
            });
            builder.addCase(findAllUesrs.fulfilled, (state, action) => {
                state.loading = false;
                state.users = [...action.payload]
                console.log("da vao fulfilled", action.payload);
            });
            builder.addCase(findAllUesrs.rejected, (state, action) => {
                state.loading = false;
                console.log("da vao rejected");
            });
            // create new users
            builder.addCase(createNewUsers.pending, (state, action) => {
                state.loading = true;
                console.log("da vao pending");
            });
            builder.addCase(createNewUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload)
                console.log("da vao fulfilled", action.payload);
            });
            builder.addCase(createNewUsers.rejected, (state, action) => {
                state.loading = false;
                console.log("da vao rejected");
            });
            //delete user
            builder.addCase(deleteUserById.pending, (state, action) => {
                state.loading = true;
                console.log("da vao pending");
            });
            builder.addCase(deleteUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(user => user.id != action.payload)
                console.log("da vao fulfilled", action.payload);
            });
            builder.addCase(deleteUserById.rejected, (state, action) => {
                state.loading = false;
                console.log("da vao rejected");
            });
            //update user
            builder.addCase(updateUser.pending, (state, action) => {
                state.loading = true;
                console.log("da vao pending");
            });
            builder.addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map(user => {
                    if (user.id == action.payload.id) {
                        return action.payload
                    }
                    return user
                })
                console.log("da vao fulfilled", action.payload);
            });
            builder.addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                console.log("da vao rejected");
            });
            // set status
            builder.addCase(setStatusUser.pending, (state, action) => {
                state.loading = true;
                console.log("da vao pending");
            });
            builder.addCase(setStatusUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map(user => {
                    if (user.id == action.payload.id) {
                        return action.payload
                    }
                    return user
                })
                console.log("da vao fulfilled", action.payload);
            });
            builder.addCase(setStatusUser.rejected, (state, action) => {
                state.loading = false;
                console.log("da vao rejected");
            });
        }
    }
)

export const counterActions = {
    ...counterSlice.actions,
    findAllUesrs,
    createNewUsers,
    deleteUserById,
    updateUser,
    setStatusUser
}
export default counterSlice.reducer;