import { validatedRequest } from "@/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {

  //checks if user exists b4 signup or login
  const { user } = await validatedRequest();
  if (user) {
    redirect("/");
  }


  return <>{children}</>;
};

export default layout;
