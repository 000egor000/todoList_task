import React, { useRef, useState } from "react";
import { Button, List, Divider, Flex, Input, Tooltip, Checkbox } from "antd";
import { handleChangeT, TodoAddProps } from "../../types";
import styles from "./TodoAdd.module.css";

const TodoAdd: React.FC<TodoAddProps> = ({
  handleAddTodo,
  newForm,
  change,
  disabled,
  loading,
  msgError,
}) => {
  const refFocus = useRef<HTMLTextAreaElement>(null);
  const [isCheck, setIsCheck] = useState(false);

  const handleOk = () => {
    if (!newForm.text) {
      msgError("Пустое значение!");
      refFocus.current?.focus();
      setIsCheck(true);
      return;
    }
    handleAddTodo();
    setIsCheck(false);
  };

  const handleChange = (e: handleChangeT) => {
    const { name } = e.target;
    const isCheckbox = "checked" in e.target;
    const value = isCheckbox
      ? (e.target as HTMLInputElement).checked
      : (e.target as HTMLTextAreaElement).value;

    change({
      ...newForm,
      [name as string]: value,
    });
  };

  return (
    <>
      <Divider orientation="center">Add element</Divider>
      <List size="large">
        <List.Item>
          <Flex justify="space-between" className={styles.groupIput}>
            <Flex justify="space-between" className={styles.blockInput}>
              <Checkbox
                checked={newForm.completed}
                onChange={handleChange}
                disabled={disabled}
                name="completed"
              />

              <Input.TextArea
                autoSize
                placeholder="name element"
                name="text"
                value={newForm.text}
                onChange={handleChange}
                disabled={disabled}
                status={isCheck && !newForm.text ? "error" : undefined}
                ref={refFocus}
              />
            </Flex>
            <Tooltip title="Добавить элемент">
              <Button
                loading={!!loading.add}
                disabled={disabled}
                onClick={handleOk}
                type="primary"
              >
                Add
              </Button>
            </Tooltip>
          </Flex>
        </List.Item>
      </List>
    </>
  );
};

export default TodoAdd;
