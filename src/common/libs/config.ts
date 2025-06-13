export const config = {
  get backendUrl() {
    return "https://api.myretrodaily.store"
  },
  get awsRegion() {
    return "ap-northeast-2"
  },
  get cognitoCallbackUrl() {
    return "https://api.myretrodaily.store/auth/cognito/callback"
  },
  get cognitoLogoutUrl() {
    return "https://api.myretrodaily.store/auth/cognito/logout"
  },
  get cognitoDomain() {
    return "ap-northeast-29m3ycr9ny"
  },
  get cognitoClientId() {
    return "53fuv9ej7sd3approg045ltc84"
  },
};

// export const config = {
//   get backendUrl() {
//     return "http://localhost:8080"
//   },
//   get awsRegion() {
//     return "ap-northeast-2"
//   },
//   get cognitoCallbackUrl() {
//     return "http://localhost:8080/auth/cognito/callback"
//   },
//   get cognitoLogoutUrl() {
//     return "http://localhost:8080/auth/cognito/logout"
//   },
//   get cognitoDomain() {
//     return "ap-northeast-29m3ycr9ny"
//   },
//   get cognitoClientId() {
//     return "53fuv9ej7sd3approg045ltc84"
//   },
// };
