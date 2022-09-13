import { Table, Tag, Space, Spin, Button, Modal, Input } from "antd";

import React, { useEffect, useState } from "react";
import { getTodos, addTodo } from "../services";

const TodoForm = () => {
  const [todoList, setTodoList] = useState();
  const [addInput, setAddInput] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [newTask, setNewTask] = useState();

  useEffect(() => {
    setLoading(true);

    getTodos().then((response) => {
      setTodoList(response);
    });
  }, []);

  // const addTaskList =()=>{

  // let newTaskList = [...todoList, newTask];
  // setTodoList(newTaskList)
  // }
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleAddTodo = () => {
    const body = { content: addInput };
    addTodo(body);
    setIsModalOpen(false);
  };

  const handleAddCancel = () => {
    setIsModalOpen(false);
  };
  const updateTodo = (data) => {
    console.log("test11", data.id);
    setData(data);
  };
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
          )}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, data) => (
        <Space size="middle">
          <Button onClick={() => updateTodo(data)}>Update</Button>

          <Button>Delete</Button>
        </Space>
      ),
    },
  ];
  const todoInputChange = (e) => {
    setAddInput(e.target.value);
  };

  return (
    <>
      {todoList && (
        <div className="container">
          <Button className="add-button" onClick={showModal}>
            ADD
          </Button>
          <div className="todotable-container">
            <Modal
              title="todo"
              open={isModalOpen}
              onOk={handleAddTodo}
              onCancel={handleAddCancel}
            >
              <Input placeholder="Basic usage" onChange={todoInputChange} />
            </Modal>

            <Table columns={columns} dataSource={todoList} rowKey="id"></Table>
          </div>
        </div>
      )}{" "}
      <div className="spin-container"> {loading && <Spin />}</div>
    </>
  );
};

export default TodoForm;
