import { Table, Tag, Space, Spin, Button, Modal, Input, Form } from "antd";

import React, { useEffect, useState } from "react";
import { getTodos, addTodo, deleteTodo, updateTodo } from "../services";

const TodoForm = () => {
  const [todoList, setTodoList] = useState();
  const [addInput, setAddInput] = useState();
  const [updateInput, setUpdateInput] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [addModalOpen, setaddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTodos().then((response) => {
      setTodoList(response);
    });
  }, []);

  const addShowModal = () => {
    setaddModalOpen(true);
  };

  const handleAddTodo = () => {
    const body = { content: addInput };
    addTodo(body).then((response) => {
      getTodos().then((response) => {
        setTodoList(response);
      });
    });
    setaddModalOpen(false);
  };
  const clickUpdateTodo = () => {
    const body = { content: updateInput };
    setLoading(true);
    updateTodo(body, data.id).then((response) => {
      getTodos().then((response) => {
        setTodoList(response);
        setLoading(false);
      });
    });
    setUpdateModalOpen(false);
  };

  const handleAddCancel = () => {
    setaddModalOpen(false);
  };
  const handleUpdateCancel = () => {
    setUpdateModalOpen(false);
  };
  const handleUpdateTodo = (data) => {
    setUpdateModalOpen(true);

    setData(data);
  };
  const handleOnDeleteTodo = (id) => {
    deleteTodo(id).then((response) => {
      getTodos().then((response) => {
        setTodoList(response);
        setLoading(false);
      });
    });
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
          <Button onClick={() => handleUpdateTodo(data)}>Update</Button>

          <Button onClick={() => handleOnDeleteTodo(data.id)}>Delete</Button>
        </Space>
      ),
    },
  ];
  const todoInputChange = (e) => {
    console.log(e);
    setAddInput(e.target.value);
  };
  const todoUpdateChange = (e) => {
    setUpdateInput(e.target.value);
  };

  return (
    <>
      {todoList && (
        <div className="container">
          <Button className="add-button" onClick={addShowModal}>
            ADD
          </Button>
          <div className="todotable-container">
            <Modal
              title="addtodo"
              open={addModalOpen}
              onOk={handleAddTodo}
              onCancel={handleAddCancel}
              // okButtonProps={{
              //   disabled: true,
              // }}
            >
              <Form>
                <Form.Item
                  name="TODO"
                  rules={[
                    { required: true, message: "Please input your TODO!" },
                    {
                      min: 3,
                      message: "Username must be minimum 3 characters.",
                    },
                  ]}
                >
                  <Input
                    placeholder="Please Enter ToDo :)"
                    onChange={todoInputChange}
                  />
                </Form.Item>
              </Form>
            </Modal>
            <div>
              <Modal
                title=""
                open={updateModalOpen}
                onOk={clickUpdateTodo}
                onCancel={handleUpdateCancel}
                destroyOnClose={true}
              >
                <Form>
                  <Form.Item
                    name="TODO"
                    rules={[
                      { required: true, message: "" },
                      {
                        min: 3,
                        message: "Username must be minimum 3 characters.",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Basic usage"
                      defaultValue={data?.content}
                      onChange={todoUpdateChange}
                    />
                  </Form.Item>
                </Form>
              </Modal>
            </div>

            <Table columns={columns} dataSource={todoList} rowKey="id"></Table>
          </div>
        </div>
      )}{" "}
      <div className="spin-container"> {loading && <Spin />}</div>
    </>
  );
};

export default TodoForm;
