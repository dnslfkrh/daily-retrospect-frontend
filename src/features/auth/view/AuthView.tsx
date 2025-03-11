"use client";

import FullHeightContainer from "@/shared/components/FullHeightContainer";
import { GoogleLoginButton } from "../components/GoogleLoginButton";

const AuthView = () => {
  return (
    <FullHeightContainer>
      <h1 className="text-2xl font-bold mb-6 text-center text-black">시작하기</h1>
      <GoogleLoginButton />
    </FullHeightContainer>
  );
};

export default AuthView;