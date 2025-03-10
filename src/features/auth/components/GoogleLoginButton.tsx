import Image from 'next/image';

export const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
  };

  return (
    <div onClick={handleGoogleLogin} className="login-button">
      <Image
        src="/auth/GoogleLoginButton.png"
        alt="Login with Google"
        width={80}
        height={20}
        layout="intrinsic"
      />
    </div>
  );
};
