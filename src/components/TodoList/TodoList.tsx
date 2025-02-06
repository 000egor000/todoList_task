import React from "react";
import { Button, List, Divider, Tooltip, Checkbox, Flex } from "antd";
import { TodoListProps } from "../../types";
import styles from "./TodoList.module.css";

const TodoList: React.FC<TodoListProps> = ({
  data,
  disabled,
  loading,
  handleUpdate,
  handleDelete,
}) => {
  return (
    <>
      <Divider orientation="center">Default list with api</Divider>
      <List
        className={styles.list}
        bordered
        dataSource={data}
        loading={disabled}
        size="large"
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Flex
              className={styles.flexItem}
              justify="space-between"
              align="center"
            >
              <div className={styles.groupInput}>
                <Checkbox
                  checked={item.completed}
                  onChange={() => handleUpdate(item.id)}
                  disabled={disabled}
                />
                <div className={styles.textItem}>{item.text}</div>
              </div>

              <Tooltip title="Удалить элемент">
                <Button
                  loading={loading.delete === item.id}
                  disabled={disabled}
                  onClick={() => handleDelete(item.id)}
                  type="primary"
                  danger
                >
                  Delete
                </Button>
              </Tooltip>
            </Flex>
          </List.Item>
        )}
      />
    </>
  );
};

export default TodoList;
