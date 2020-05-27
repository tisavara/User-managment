import axios from "axios";

const linkAPI = process.env.REACT_APP_SERVER_URI;

export const loginAction = (login) => {
  return (dispatch, getState) => {
    axios
      .post(linkAPI + "login", login)
      .then((response) => {
        // console.log(response);
        let data;
        if (response.data.status === "error") {
          data = response.data;
        } else {
          data = response.data[0];
        }
        dispatch({ type: "LOGIN", data });
      })
      .catch((error) => {
        console.log(error);
        const data = { status: "error", message: "Connection error" };
        dispatch({ type: "LOGIN", data });
      });
  };
};

export const logoutAction = () => {
  return (dispatch, getState) => {
    const data = { info: "" };
    dispatch({ type: "LOGOUT", data });
  };
};

export const getAllUserAction = () => {
  return (dispatch, getState) => {
    axios
      .get(linkAPI + "getUser")
      .then((response) => {
        const data = response.data;
        dispatch({ type: "GET_ALL_USER", data });
      })
      .catch((error) => {
        console.log(error);
        const data = { status: "error", message: "Connection error" };
        dispatch({ type: "GET_ALL_USER", data });
      });
  };
};

export const getUserForManagerAction = (user) => {
  return (dispatch, getState) => {
    axios.post(linkAPI + "getUser/user", user).then((response) => {
      const data = response.data;
      dispatch({ type: "GET_ALL_USER", data });
    }).catch((error) => {
      console.log(error);
      const data = { status: "error", message: "Connection error" };
      dispatch({ type: "GET_ALL_USER", data });
    })
  }
}

export const AddUserAction = (add) => {
  return (dispatch, getState) => {
    axios.post(linkAPI + "addUser", add).then((response) => {
    //   console.log(response);
        const data = response.data;
        dispatch({ type: "CHECK_ADD_USER", data })
    }).catch((error) => {
        console.log(error);
        const data = { status: "error", message: "Connection error" };
        dispatch({ type: "CHECK_ADD_USER", data });
      });
  };
};

export const EditUserAction = (edit) => {
    return (dispatch, getState) => {
        const info = { name: edit.name, email: edit.email, department: edit.department, job_title: edit.job_title, role: edit.role, password: edit.password }

        axios.post(linkAPI + "edit/" + edit.id, info).then((response) => {
            // console.log(response);
            const data = response.data
            dispatch({ type: 'CHECK_EDIT_USER', data})
        }).catch((error) => {
            console.log(error);
            const data = { status: "error", message: "Connection error" };
            dispatch({ type: 'CHECK_EDIT_USER', data})
          });
    }
}

export const DeleteUserAction = (del) => {
    return (dispatch, getState) => {
        axios.delete(linkAPI + "delete/" + del).then((response) => {
            console.log(response);
            const data = response.data
            dispatch({ type: 'CHECK_DELETE_USER', data})
        }).catch((error) => {
            console.log(error);
            const data = { status: "error", message: "Connection error" };
            dispatch({ type: 'CHECK_DELETE_USER', data})
        })
    }
}

export const clearCheckAction = () => {
  return (dispatch, getState) => {
    const data = ""
    dispatch({ type: "CHECK_ADD_USER", data });
    dispatch({ type: 'CHECK_EDIT_USER', data})
    dispatch({ type: 'CHECK_DELETE_USER', data})
  };
};
