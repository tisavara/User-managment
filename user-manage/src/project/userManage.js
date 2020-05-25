import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { SearchOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Table, Space, Checkbox, Modal, Select, Radio } from "antd";

const { Option } = Select;
const { confirm } = Modal;

function UserManage() {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [visible, setVisible] = useState(false);
  const [modalContant, setModalContant] = useState('')
  const [role, setRole] = useState("Admin");

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
      dataIndex: "job",
      key: "job",
    },
    {
      title: "Admin",
      dataIndex: "admin",
      render: () => (
        <Space>
          <Checkbox />
        </Space>
      ),
    },
    {
      title: "Manager",
      dataIndex: "manager",
      render: () => (
        <Space>
          <Checkbox />
        </Space>
      ),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: () => (
        <Space>
          <a href="#st" onClick={() => {
              setModalContant("edit")
              setVisible(true)
            }}>
            Edit
          </a>
          <span style={{ margin: "1vw" }}>|</span>
          <a href="#st" onClick={showDeleteConfirm}>Delete</a>
        </Space>
      ),
    },
  ];

  const data = [];

  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `John Brown ${i}`,
      email: "Aa@aa",
      department: "IT",
      job: "IT",
    });
  }

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

  useEffect(() => {
  }, [])

  return (
    <div className="container">
      <div className="header-content">
        <span>User manage</span>
        <span className="text-right">
          <a href="/">John Doe (Admin)</a>
          <span style={{ margin: "1vw" }}>|</span>
          <a href="/">Logout</a>
        </span>
      </div>

      <div className="second-row">
        <button className="submit-button" onClick={() => {
            setModalContant("add")
            setVisible(true)
        }}>Add New</button>
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
        scroll={{ y: 250 }}
      ></Table>

      <div className="footer-content">Version 0.0.1</div>

      <Modal
        title={modalContant === "edit" ? "Edit" : "Add New"}
        visible={visible}
        okText="Save"
        onOk={(e) => {
          console.log(e);
          setVisible(false);
        }}
        onCancel={(e) => {
          console.log(e);
          setVisible(false);
        }}
      >
        <p>
          Name <span className="imp">*</span>
          <input />
        </p>
        <p>
          Email <span className="imp">*</span>
          <input />
        </p>
        <p>
          Department <span className="imp">*</span>
          <Select style={{ width: "100%" }} placeholder="Please select">
            <Option value="IT">IT</Option>
            <Option value="BOMO">BOMO</Option>
            <Option value="HR">HR</Option>
          </Select>
        </p>
        <p>
          Job Title <span className="imp">*</span>
          <input />
        </p>
        <p>
          New Password
          <br />
          <input style={{ width: "80%" }} />
          <a href="#s" style={{ marginLeft: "2vw" }}>
            Generate
          </a>
        </p>
        <p>
          Role
          <Radio.Group style={{ marginLeft: "2vw" }} value={role} onChange={(e) => setRole(e.target.value)}>
            <Radio value="Admin">Admin</Radio>
            <Radio value="Manager">Manager</Radio>
          </Radio.Group>
        </p>
      </Modal>

    </div>
  );
}

export default UserManage;

function showDeleteConfirm() {
    confirm({
      title: 'Confirmation',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete ?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
