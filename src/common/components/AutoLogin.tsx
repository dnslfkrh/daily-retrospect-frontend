"use client";

import { useCheckLogin } from "../hooks/useCheckLogin";

const AutoLogin = () => {
  useCheckLogin();
  return null;
};

export default AutoLogin;