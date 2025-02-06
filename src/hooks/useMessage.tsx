import { useCallback } from "react";
import { message } from "antd";
import { MessageType } from "../types";

const useMessage = (
  messageApi: ReturnType<typeof message.useMessage>[0] | null
) => {
  const showMessage = useCallback(
    (type: MessageType, content: React.ReactNode) => {
      if (messageApi) {
        messageApi[type](content);
      } else {
        console.warn("Message API is null. Cannot show message.");
      }
    },
    [messageApi]
  );

  return {
    success: (content: React.ReactNode) => showMessage("success", content),
    error: (content: React.ReactNode) => showMessage("error", content),
    warning: (content: React.ReactNode) => showMessage("warning", content),
    info: (content: React.ReactNode) => showMessage("info", content),
  };
};

export default useMessage;
