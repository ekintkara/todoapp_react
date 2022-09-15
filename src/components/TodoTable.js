import { Table, Tag, Space, Spin, Modal, Input, Form } from "antd";
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
  // const [addButtonSwitch, setAddButtonSwitch] = useState(true);

  useEffect(() => {
    setLoading(true);

    getTodos().then((response) => {
      setTodoList(response);
      setLoading(false);
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
    Modal.warning({
      title: "I'm deleting todo",
    });

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
          <button className="a.button3" onClick={() => handleUpdateTodo(data)}>
            Update
          </button>

          <button
            className="a.button3"
            onClick={() => handleOnDeleteTodo(data.id)}
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];
  const todoInputChange = (e) => {
    setAddInput(e.target.value);
  };
  const todoUpdateChange = (e) => {
    setUpdateInput(e.target.value);
  };

  return (
    <>
      {todoList && (
        <div className="container">
          <button className="add-button" onClick={addShowModal}>
            ADD
          </button>

          <div className="todotable-container">
            <Modal
              title="Add Todo"
              open={addModalOpen}
              onOk={handleAddTodo}
              onCancel={handleAddCancel}
              okButtonProps={{
                disabled: addInput ? false : true,
              }}
            >
              <Form>
                <Form.Item
                  name="addInput"
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
                title="Update Todo"
                open={updateModalOpen}
                onOk={clickUpdateTodo}
                onCancel={handleUpdateCancel}
                destroyOnClose={true}
              >
                <Form>
                  <Form.Item
                    name="Update"
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
            <div></div>

            <Table columns={columns} dataSource={todoList} rowKey="id" />
          </div>
        </div>
      )}{" "}
      <div className="spin-container"> {loading && <Spin />}</div>
    </>
  );
};

export default TodoForm;
