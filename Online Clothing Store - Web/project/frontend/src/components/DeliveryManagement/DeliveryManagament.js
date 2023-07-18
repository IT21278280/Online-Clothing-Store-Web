import React, {
  useContext,
  Fragment,
  useEffect,
  useState,
  useMemo,
} from "react";
import { Space, Table, Tag, Button, Dropdown, notification, Modal } from "antd";
import axios from "axios";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { AutoComplete } from "antd";
import "../../css/deliveryManagement.css";

const Context = React.createContext({
  name: "Default",
});

const DeliveryManagament = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [selectedDeliverId, setselectedDelivery] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [selectedDriver, setSelectedDriver] = useState("");
  const [modal, contextHolderModal] = Modal.useModal();

  const confirm = () => {
    modal.confirm({
      title: "Delete Delivery",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        deleteDeliveryApiCall();
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

  const deleteDeliveryApiCall = (event) => {
    axios
      .post("http://localhost:5050/api/delivery/deleteDelivery", {
        deliveryId: selectedDeliverId,
      })
      .then((response) => {
        openNotification("Delivery Deleted Successfully");
        getApi();
      });
  };

  const changeStatusToDelivered = (event) => {
    axios
      .post("http://localhost:5050/api/delivery/changeStatus", {
        deliveryId: selectedDeliverId,
        status: {
          processing: false,
          shipped: false,
          delivered: true,
        },
      })
      .then((response) => {
        openNotification("Delivery Status Changed Successfully");
        getApi();
      });
  };

  const changeStatusToProcessing = (event) => {
    axios
      .post("http://localhost:5050/api/delivery/changeStatus", {
        deliveryId: selectedDeliverId,
        status: {
          processing: true,
          shipped: false,
          delivered: false,
        },
      })
      .then((response) => {
        openNotification("Delivery Status Changed Successfully");
        getApi();
      });
  };

  const changeStatusToShipped = (event) => {
    axios
      .post("http://localhost:5050/api/delivery/changeStatus", {
        deliveryId: selectedDeliverId,
        status: {
          processing: false,
          shipped: true,
          delivered: false,
        },
      })
      .then((response) => {
        openNotification("Delivery Status Changed Successfully");
        getApi();
      });
  };

  const assignDriverApi = (deliveryId, driverId, name) => {
    axios
      .post("http://localhost:5050/api/delivery/assignDriver", {
        deliveryId: deliveryId,
        driverId: driverId,
        driverName: name,
      })
      .then((response) => {
        openNotification("Driver Assigned Successfully");
        getApi();
      });
  };
  const items = [
    {
      key: "1",
      label: <div onClick={changeStatusToShipped}>Shipped</div>,
    },
    {
      key: "2",
      label: <div onClick={changeStatusToProcessing}>Processing</div>,
    },
    {
      key: "3",
      label: <div onClick={changeStatusToDelivered}>Delivered</div>,
    },
  ];

  const columns = [
    {
      title: "Delivery ID",
      dataIndex: "deliveryId",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Order",
      dataIndex: "orderName",
    },
    {
      title: "Driver",
      dataIndex: "driverId",
    },
    {
      title: "Tracking ID",
      dataIndex: "trackingId",
    },
    {
      title: "Status",
      dataIndex: "status",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <Button
            onClick={() => {
              console.log(record);
            }}
            type="primary">
            Assign Driver
          </Button> */}
          <AutoComplete
            style={{
              width: 150,
            }}
            options={drivers}
            placeholder="Assign Driver"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            onSelect={(value, label) => {
              assignDriverApi(record.deliveryId, label.data, value);
            }}
          />
          <Dropdown
            onOpenChange={() => {
              setselectedDelivery(record.deliveryId);
            }}
            menu={{
              items,
            }}
            placement="bottom"
            arrow>
            <Button primary>Change Status</Button>
          </Dropdown>
          <Button
            onClick={() => {
              setselectedDelivery(record.deliveryId);
              confirm();
            }}
            type="primary"
            danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    getApi();
    getDriversApi();
    //eslint-disable-next-line
  }, []);

  const getApi = () => {
    axios
      .get("http://localhost:5050/api/delivery/getDeliveries")
      .then((response) => {
        setDeliveries(response.data.data);
      });
  };

  const getDriversApi = () => {
    axios
      .get("http://localhost:5050/api/delivery/getDrivers")
      .then((response) => {
        let drivers = [];

        response.data.data.map((data) => {
          drivers.push({
            value: data.name,
            data: data._id,
          });
        });

        setDrivers(drivers);
      });
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="mt-auto mb-auto">
        {contextHolder}
        {contextHolderModal}
        <h3 className="mt-3">Delivery Management</h3>
        <Table className="mt-3" columns={columns} dataSource={deliveries} />
      </div>
    </div>
  );
};

export default DeliveryManagament;
