"use client";

import FullHeightWithoutBottomNav from "@/shared/components/FullHeightWithoutBottomNav";
import { GoogleLoginButton } from "../components/GoogleLoginButton";

const AuthView = () => {
  return (
    <FullHeightWithoutBottomNav>
      <h1 className="text-2xl font-bold mb-6 text-center text-black">시작하기</h1>
      <GoogleLoginButton />
    </FullHeightWithoutBottomNav>
  );
};

export default AuthView;
