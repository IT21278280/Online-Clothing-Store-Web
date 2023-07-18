import React, { useEffect, useState } from "react";
import {
  Space,
  Table,
  Button,
  Form,
  Input,
  notification,
  Modal,
} from "antd";
import axios from "axios";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "../../css/deliveryManagement.css";

// const Context = React.createContext({
//   name: "Default",
// });

const DriverManagament = () => {
  const [selectedDriverId, setDriverId] = useState("");
  const [editMode, seteditMode] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [modal, contextHolderModal] = Modal.useModal();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (editMode) {
      editDriverApi(values.name, values.email, values.phone);
    } else {
      addDriverApi(values.name, values.email, values.phone);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const confirm = () => {
    modal.confirm({
      title: "Delete Driver",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        deleteDriverApiCall();
      },
    });
  };

  const openNotification = (msg) => {
    api.open({
      message: msg,
      className: "custom-class",
      style: {
        width: "auto",
      },
    });
  };

  const deleteDriverApiCall = (event) => {
    axios
      .post("http://localhost:5050/api/delivery/deleteDriver", {
        driverId: selectedDriverId,
      })
      .then((response) => {
        openNotification("Driver Deleted Successfully");
        getApi();
      });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a href=" ">{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              seteditMode(true);
              setDriverId(record._id);
              form.setFieldsValue({
                name: record.name,
                email: record.email,
                phone: record.phoneNumber,
              });
            }}
            type="primary"
            style={{ background: "#A78364" }}>
            Edit
          </Button>

          <Button
            onClick={() => {
              setDriverId(record._id);
              confirm();
            }}
            type="primary"
            style={{ background: "#ffff", border: "1px solid #A78364", color:"#A78364" }}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    getApi();

    //eslint-disable-next-line
  }, []);

  const getApi = () => {
    axios
      .get("http://localhost:5050/api/delivery/getDrivers")
      .then((response) => {
        setDrivers(response.data.data);
      });
  };

  const addDriverApi = (name, email, phone) => {
    axios
      .post("http://localhost:5050/api/delivery/addDriver", {
        name: name,
        email: email,
        phone: phone,
      })
      .then((response) => {
        form.setFieldsValue({ name: "", email: "", phone: "" });
        getApi();
      });
  };

  const editDriverApi = (name, email, phone) => {
    axios
      .post("http://localhost:5050/api/delivery/editDriver", {
        driverId: selectedDriverId,
        name: name,
        email: email,
        phone: phone,
      })
      .then((response) => {
        form.setFieldsValue({ name: "", email: "", phone: "" });
        seteditMode(false);
        getApi();
      });
  };

  return (
    <div className="container-fluid mx-5">
      <div className="mt-auto mb-auto" style={{ height: "100vh" }}>
        {contextHolder}
        {contextHolderModal}
        <h3 className="mt-3">Driver Management</h3>
        <div className="row">
          <div className="col-6">
            <Table className="mt-3" columns={columns} dataSource={drivers} />
          </div>
          <div className="col-6">
            <h3 className="text-center"> {editMode ? "Edit" : "Add"} Driver</h3>
            <Form
              form={form}
              layout="vertical"
              name="basic"
              initialValues={{
                name: "",
                email: "",
                phone: "",
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off">
              <Form.Item
                style={{ width: 500 }}
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}>
                <Input name="name" />
              </Form.Item>

              <Form.Item
                style={{ width: 500 }}
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "The input is not valid E-mail !",
                  },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item
                style={{ width: 500 }}
                label="Phone Number"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item>
                <div className="d-flex flex-row ">
                  <Button
                    className="w-50"
                    onClick={() => {
                      form.setFieldsValue({ name: "", email: "", phone: "" });
                      seteditMode(false);
                    }}
                    type="danger"
                    htmlType="submit"
                    style={{ background: "#ffff", border: "1px solid #A78364", color:"#A78364", marginRight:"10px" }}>
                    Clear
                  </Button>
                  <Button className="w-50" type="primary" htmlType="submit" style={{ background: "#A78364" }}>
                    {editMode ? "Edit" : "Add"}
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverManagament;
