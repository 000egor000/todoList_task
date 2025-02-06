import { message } from "antd";
import { MessageContext } from "../context/MessageContext";
import { MessageProviderProps } from "../types";

export const ProviderAntd: React.FC<MessageProviderProps> = ({ children }) => {
  const [messageApi, contextHolderMessage] = message.useMessage();

  return (
    <MessageContext.Provider value={messageApi}>
      {contextHolderMessage}
      {children}
    </MessageContext.Provider>
  );
};
