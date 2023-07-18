import React, {
  useContext,
  Fragment,
  useEffect,
  useState,
  useMemo,
} from "react";
import {
  Space,
  Table,
  Tag,
  Button,
  Dropdown,
  notification,
  Modal,
  Steps,
  Card,
  Form,
  Input,
} from "antd";
import axios from "axios";
import {
  CheckOutlined,
  CarryOutOutlined,
  MailOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import moment from "moment";

const Context = React.createContext({
  name: "Default",
});

const OrderTracking = () => {
  const [api, contextHolder] = notification.useNotification();
  const [order, setorder] = useState({});
  const [showTracking, setshowTracking] = useState(false);

  const openNotification = (msg) => {
    api.open({
      message: msg,
      className: "custom-class",
      style: {
        width: "auto",
      },
    });
  };

  const getTrackingDataApi = (trackingId) => {
    axios
      .post("http://localhost:5050/api/delivery/tracking", {
        trackingId: trackingId,
      })
      .then((response) => {
        openNotification("Order details recalled successfully");
        setorder(response.data.data);
        setshowTracking(true);
      });
  };

  useEffect(() => {}, []);

  return (
    <div className="container d-flex justify-content-center">
      <div
        className="mt-auto mb-auto w-100 d-flex  flex-column"
        style={{
          height: "100vh",
        }}>
        <h3 className="mt-5 text-center mb-5">Order Tracking</h3>

        <Form
          layout="vertical"
          name="basic"
          initialValues={{
            name: "",
            email: "",
            phone: "",
          }}
          onFinish={(values) => {
            getTrackingDataApi(values.trackingId);
          }}
          autoComplete="off">
          <Form.Item
            style={{ width: 500 }}
            name="trackingId"
            rules={[
              {
                required: true,
                message: "Please input your order tracking id!",
              },
              {
                len: 24,
                message: "Order tracking id should have 12 characters",
              },
            ]}>
            <Input
              placeholder="Please Enter Order Tracking Id"
              name="trackingId"
            />
          </Form.Item>
          <Form.Item>
            <Button className="w-100" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {showTracking && (
          <div>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title={order.orderId.name}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <div>
                  <div className="font-weight-normal"></div>
                  <div className="font-weight-light">
                    {"Placed on " +
                      moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </div>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}>
                  {"Total: Rs. " + order.orderId.price}
                </div>
              </div>
            </Card>

            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title={"Order #" + order.trackingId}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <Steps
                  className="my-5 mx-5 px-5"
                  current={
                    order.processing
                      ? 1
                      : order.shipped
                      ? 2
                      : order.delivered
                      ? 3
                      : 1
                  }
                  items={[
                    {
                      title: "Processing",
                    },
                    {
                      title: "Shipped",
                    },
                    {
                      title: "Delivered",
                    },
                  ]}
                />
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
