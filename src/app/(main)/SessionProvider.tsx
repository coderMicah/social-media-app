"use client";

import { Session, User } from "lucia";
import { createContext, useContext } from "react";

interface ISessionContext {
  session: Session;
  user: User;
}

const SessionContext = createContext<ISessionContext | null>(null);

export default function SessionProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: ISessionContext }>) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}


// inonrder to get a non nullable context 
export const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within SessionProvider");
  }

  return context;
};
