"use client";

import { useRouter } from "next/navigation";

export const useCognitoLogin = () => {
  const router = useRouter();

  const login = () => {
    const REGION = process.env.NEXT_PUBLIC_AWS_REGION;
    const COGNITO_DOMAIN = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
    const CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_COGNITO_CALLBACK_URL;

    if (!REGION || !COGNITO_DOMAIN || !CLIENT_ID || !REDIRECT_URI) {
      console.error("환경 변수 값이 올바르게 설정되지 않았습니다.");
      return;
    }

    const loginUrl = `https://${COGNITO_DOMAIN}.auth.${REGION}.amazoncognito.com/login` +
      `?client_id=${CLIENT_ID}&response_type=code&scope=email+openid+profile+aws.cognito.signin.user.admin` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

    router.push(loginUrl);
  };

  return { login };
};
