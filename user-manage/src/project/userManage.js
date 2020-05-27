import React, { useState, useEffect } from "react";
import { Input } from "antd";
import {
  SearchOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Table, Space, Checkbox, Modal, Select, Radio } from "antd";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  logoutAction,
  getAllUserAction,
  getUserForManagerAction,
  AddUserAction,
  clearCheckAction,
  EditUserAction,
  DeleteUserAction,
} from "./../store/action/authAction";

const { Option } = Select;
const { confirm } = Modal;

function UserManage(props) {
  const { auth } = props;
  const [selectionType] = useState("checkbox");
  const [visible, setVisible] = useState(false);
  const [modalContant, setModalContant] = useState("");
  const [eye, setEye] = useState(false);
  // form detail
  const [ID, setID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [job, setJob] = useState("");
  const [role, setRole] = useState("Admin");
  // error
  const [ErrName, setErrName] = useState("");
  const [ErrEmail, setErrEmail] = useState("");
  const [ErrPassword, setErrPassword] = useState("");
  const [ErrDepartment, setErrDepartment] = useState("");
  const [ErrJob, setErrJob] = useState("");
  const [ErrRole, setErrRole] = useState("");

  var randomstring = Math.random().toString(36).slice(-8);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Job Title",
      dataIndex: "job_title",
      key: "job_title",
    },
    {
      title: "Admin",
      dataIndex: "admin",
      render: (i, user) => {
        return (
          <Space>
            <Checkbox checked={user.role === "Admin" ? true : false} />
          </Space>
        );
      },
    },
    {
      title: "Manager",
      dataIndex: "manager",
      render: (i, user) => {
        return (
          <Space>
            <Checkbox checked={user.role === "Manager" ? true : false} />
          </Space>
        );
      },
    },
    {
      title: "User",
      dataIndex: "user",
      render: (i, user) => {
        return (
          <Space>
            <Checkbox checked={user.role === "User" ? true : false} />
          </Space>
        );
      },
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (i, user) => {
        const show = (
          <Space>
            <a
              href="#st"
              onClick={() => {
                setModalContant("edit");
                setVisible(true);
                setName(user.name);
                setEmail(user.email);
                setDepartment(user.department);
                setJob(user.job_title);
                setRole(user.role);
                setPassword(user.password);
                setID(user.id);
              }}
            >
              Edit
            </a>
            <span style={{ margin: "1vw" }}>|</span>
            <a
              href="#st"
              onClick={() => {
                showDeleteConfirm(user.id);
              }}
            >
              Delete
            </a>
          </Space>
        );
        if (user.role === "User") {
          if (auth.info.role === "Manager") {
            return null;
          } else {
            return show;
          }
        } else {
          return show;
        }
      },
    },
  ];

  const data = auth.user;

  // const data = [];

  // for (let i = 0; i < 100; i++) {
  //   data.push({
  //     key: i,
  //     name: `John Brown ${i}`,
  //     email: "Aa@aa",
  //     department: "IT",
  //     job: "IT",
  //   });
  // }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  function showDeleteConfirm(del) {
    confirm({
      title: "Confirmation",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to delete ?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        props.delete(del);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  function error(msg) {
    Modal.error({
      title: "Error",
      content: msg,
    });
  }

  useEffect(() => {
    if (auth.info.role === "Manager") {
      const data = { department: auth.info.department };
      props.getUser.getUserForManager(data);
    } else {
      props.getAllUser.getAllUserAction();
    }
  }, [props.getAllUser, props.getUser, auth.info.role, auth.info.department]);

  useEffect(() => {
    if (auth.checkAddUser) {
      if ( auth.checkAddUser.status === "success" ) {
        setVisible(false);
        props.clearCheck.clearCheckAction();
        window.location.reload();
      } else if (auth.checkAddUser.status === "error") {
        setErrRole("This email is already used.");
      }
    }
    
    if(auth.checkEdit){
      if(auth.checkEdit.status === "success"){
        setVisible(false);
        props.clearCheck.clearCheckAction();
        window.location.reload();
      } else if (auth.checkEdit.status === "error") {
        setErrRole(auth.checkEdit.message);
      } 
    }

    if(auth.checkDelete){
      if(auth.checkDelete.status === "success"){
        setVisible(false);
        props.clearCheck.clearCheckAction();
        window.location.reload();
      }else if (auth.checkDelete.status === "error") {
        error(auth.checkDelete.message);
      }
    }

  }, [auth.checkAddUser, auth.checkEdit, props.clearCheck, auth.checkDelete]);

  if (auth.info === "") {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className="header-content">
        <span>User manage</span>
        <span className="text-right">
          <a href="#name">
            {auth.info.name} ({auth.info.role})
          </a>
          <span style={{ margin: "1vw" }}>|</span>
          <a href="#logout" onClick={() => props.logout()}>
            Logout
          </a>
        </span>
      </div>

      <div className="second-row">
        <button
          className="submit-button"
          onClick={() => {
            setModalContant("add");
            setVisible(true);
            setErrRole("");
          }}
        >
          Add New
        </button>
        <span className="text-right">
          <Input
            className="search-input"
            placeholder="Quick search"
            prefix={<SearchOutlined />}
          />
        </span>
      </div>

      <Table
        rowSelection={{ type: selectionType, ...rowSelection }}
        columns={columns}
        dataSource={data}
        scroll={{ y: 400 }}
      ></Table>

      <div className="footer-content">Version 0.0.1</div>

      <Modal
        title={modalContant === "edit" ? "Edit" : "Add New"}
        visible={visible}
        okText="Save"
        onOk={() => {
          if (modalContant === "edit") {
            if (
              ErrName === "success" ||
              ErrEmail === "success" ||
              ErrDepartment === "success" ||
              ErrJob === "success" ||
              ErrPassword === "success" ||
              ErrRole === "success" ||
              newPassword !== ""
            ) {
              const data = {
                id: ID,
                name: name,
                email: email,
                department: department,
                job_title: job,
                role: role,
                password: newPassword === '' ? password : newPassword,
              };
              props.editUser(data);
            } else {
              setErrRole("No information has been change");
            }
          } else {
            if (name === "") {
              setErrName("Please fill in your name");
            }
            if (email === "") {
              setErrEmail("Please fill in your email");
            }
            if (department === "") {
              setErrDepartment("Please select department");
            }
            if (job === "") {
              setErrJob("Please fill in jop title");
            }
            if (password === "") {
              setErrPassword("Please fill your password");
            }
            if (
              ErrName === "success" &&
              ErrEmail === "success" &&
              ErrDepartment === "success" &&
              ErrJob === "success" &&
              ErrPassword === "success"
            ) {
              const data = {
                name: name,
                email: email,
                department: department,
                job_title: job,
                role: role,
                password: password,
              };
              props.addUser(data);
            }
          }
        }}
        onCancel={() => {
          setVisible(false);
          props.clearCheck.clearCheckAction();
        }}
        closable={() => {
          setVisible(false);
          props.clearCheck.clearCheckAction();
        }}
      >
        <p>
          Name <span className="imp">*</span>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value.match(/^[a-zA-Z\s]+$/)) {
                setErrName("success");
              } else {
                setErrName("Please fill in only characters a-z, A-Z");
              }
            }}
          />
          <span className="text-err">
            {ErrName === "success" ? null : ErrName}
          </span>
        </p>
        <p>
          Email <span className="imp">*</span>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (
                e.target.value.match(
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                )
              ) {
                setErrEmail("success");
              } else {
                setErrEmail("Email incorrect");
              }
            }}
          />
          <span className="text-err">
            {ErrEmail === "success" ? null : ErrEmail}
          </span>
        </p>
        <p>
          Department <span className="imp">*</span>
          <Select
            style={{ width: "100%" }}
            value={
              department === "" ? (
                <span style={{ color: "#aaaaaa" }}>Please select</span>
              ) : (
                department
              )
            }
            onChange={(e) => {
              setDepartment(e);
              setErrDepartment("success");
            }}
          >
            <Option value="IT">IT</Option>
            <Option value="BOMO">BOMO</Option>
            <Option value="HR">HR</Option>
          </Select>
          <span className="text-err">
            {ErrDepartment === "success" ? null : ErrDepartment}
          </span>
        </p>
        <p>
          Job Title <span className="imp">*</span>
          <input
            type="text"
            value={job}
            onChange={(e) => {
              setJob(e.target.value);
              if (e.target.value.match(/^[a-zA-Z]+$/)) {
                setErrJob("success");
              } else {
                setErrJob("Please fill in only characters a-z, A-Z");
              }
            }}
          />
          <span className="text-err">
            {ErrJob === "success" ? null : ErrJob}
          </span>
        </p>
        <p>
          {modalContant === "edit" ? (
            "New Password"
          ) : (
            <span>
              Password<span className="imp">*</span>
            </span>
          )}
          <br />
          <input
            type={eye === false ? "password" : "text"}
            style={{ width: "80%" }}
            value={modalContant === "edit" ? newPassword : password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrPassword("success");
            }}
          />
          {password === "" ? null : eye === false ? (
            <EyeOutlined className="eye" onClick={() => setEye(!eye)} />
          ) : (
            <EyeInvisibleOutlined
              className="eye"
              onClick={() => setEye(!eye)}
            />
          )}
          <a
            href="#s"
            onClick={() => {
              if (modalContant === "edit") {
                setNewPassword(randomstring);
              } else {
                setPassword(randomstring);
              }
            }}
            style={{ marginLeft: "2vw" }}
          >
            Generate
          </a>
          <br />
          <span className="text-err">
            {ErrPassword === "success" ? null : ErrPassword}
          </span>
        </p>
        <p>
          Role
          <Radio.Group
            style={{ marginLeft: "2vw" }}
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setErrRole("success");
            }}
          >
            <Radio value="Admin">Admin</Radio>
            <Radio value="Manager">Manager</Radio>
            <Radio
              value="User"
              disabled={auth.info.role === "Manager" ? true : false}
            >
              User
            </Radio>
          </Radio.Group>
        </p>
        <p className="text-err">{ErrRole === "success" ? null : ErrRole}</p>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (logout) => dispatch(logoutAction(logout)),
    getAllUser: { getAllUserAction: () => dispatch(getAllUserAction()) },
    getUser: {
      getUserForManager: (get) => dispatch(getUserForManagerAction(get)),
    },
    addUser: (add) => dispatch(AddUserAction(add)),
    clearCheck: { clearCheckAction: () => dispatch(clearCheckAction()) },
    editUser: (edit) => dispatch(EditUserAction(edit)),
    delete: (del) => dispatch(DeleteUserAction(del)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
