import React from "react"
import Install from "./js/Install.mdx"
import Register from "./js/Register.mdx"
import LoginPassword from "./js/LoginPassword.mdx"
import LoginCode from "./js/LoginCode.mdx"
import AuthState from "./js/AuthState.mdx"
import ResetPassword from "./js/ResetPassword.mdx"
import Logout from "./js/Logout.mdx"
import Verify from "./js/Verify.mdx"

export const ezAuthInstructions = [
  {
    name: "JS",
    steps: [
      {
        title: "Introduction",
        body: <Install/>
      },
      {
        title: "Install",
        body: <Install/>
      },
      {
        title: "Create new user",
        body: <Register/>
      },
      {
        title: "Login with password",
        body: <LoginPassword/>
      },
      {
        title: "Login via e-mail or phone",
        body: <LoginCode/>
      },
      {
        title: "Get auth token",
        body: <AuthState/>
      },
      {
        title: "Verify Auth Token",
        body: <ResetPassword/>
      },
      {
        title: "Verify account",
        body: <Verify/>
      },
      {
        title: "Logout user",
        body: <Logout/>
      },
      {
        title: "Reset password",
        body: <ResetPassword/>
      },
      {
        title: "Error Handling",
        body: <ResetPassword/>
      },
    ],
  },
  {
    name: "API",
    steps: [
      { title: "Register new user", body: "" },
      { title: "1 Register new user", body: "" },
    ],
  }
]
