"use client";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <div className="flex items-center justify-center grow">
    <SignIn
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-up"
      appearance={{
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-500 text-sm normal-case'
        }
      }}
      
    />
  </div>
);

export default SignInPage;
