import { Table, Tag, Space, Spin, Button } from "antd";
import React, { useEffect, useState } from "react";
import { getTodos } from "../services";

const TodoForm = () => {
  const [todoList, setTodoList] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    getTodos().then((response) => {
      setTodoList(response);
    });
  }, []);

  const columns = [
    { title: "content", key: "content", dataIndex: "content" },
    {
      title: "isCompleted",
      key: "isCompleted",
      dataIndex: "isCompleted",
      render: (_, { isCompleted }) => (
        <div>
          {isCompleted ? (
            <Tag color={"green"} key={isCompleted}></Tag>
          ) : (
            <Tag color={"volcano"} key={isCompleted}></Tag>
          )}{" "}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button>Update</Button>
          <Button>Delete</Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      {todoList && (
        <div className="container">
          <Button className="add-button">ADD</Button>
          <div className="todotable-container">
            <Table columns={columns} dataSource={todoList} rowKey="id"></Table>
          </div>
        </div>
      )}{" "}
      <div className="spin-container"> {loading && <Spin />}</div>
    </>
  );
};

export default TodoForm;
