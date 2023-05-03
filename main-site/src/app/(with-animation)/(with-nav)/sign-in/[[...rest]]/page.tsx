"use client";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <div className="flex items-center justify-center grow bg-blue-100">
    <SignIn
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-up"
      redirectUrl="/dashboard"
      appearance={{
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-500 text-sm normal-case'
        }
      }}
      
    />
  </div>
);

export default SignInPage;
