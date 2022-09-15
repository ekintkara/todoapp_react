import React, { Component, useState } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";

export default class Header extends Component {
  render() {
    return (
      <>
        <div className="header">
          TODO LİST
          <Button icon={<UserAddOutlined />} />
        </div>
      </>
    );
  }
}
