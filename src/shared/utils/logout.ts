export const handleLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("id_token");
  document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
  
  window.location.href = `${process.env.NEXT_PUBLIC_COGNITO_LOGOUT_URL}`;
};