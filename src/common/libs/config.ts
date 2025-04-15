export const config = {
  get backendUrl() {
    return typeof window !== "undefined" && window.env?.NEXT_PUBLIC_BACKEND_URL || "";
  },
  get awsRegion() {
    return typeof window !== "undefined" && window.env?.NEXT_PUBLIC_AWS_REGION || "";
  },
  get cognitoCallbackUrl() {
    return typeof window !== "undefined" && window.env?.NEXT_PUBLIC_COGNITO_CALLBACK_URL || "";
  },
  get cognitoLogoutUrl() {
    return typeof window !== "undefined" && window.env?.NEXT_PUBLIC_COGNITO_LOGOUT_URL || "";
  },
  get cognitoDomain() {
    return typeof window !== "undefined" && window.env?.NEXT_PUBLIC_COGNITO_DOMAIN || "";
  },
  get cognitoClientId() {
    return typeof window !== "undefined" && window.env?.NEXT_PUBLIC_COGNITO_CLIENT_ID || "";
  },
};