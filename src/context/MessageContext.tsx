import { message } from "antd";

import { createContext } from "react";

export const MessageContext = createContext<
  ReturnType<typeof message.useMessage>[0] | null
>(null);
