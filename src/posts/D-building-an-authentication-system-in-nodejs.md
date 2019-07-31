---
path: "/blog/building-auth-system"
date: "2019-07-26"
title: "Making sense of Git and GitHub"
description: "It's time to dissolve the confusion and learn how to use Git and GitHub. Argubly one of the most important tools in a developers repertoire"
preview: "true"
---

Functions of an auth system

- Create new user
- Login user
- Logout user
- Refresh login session
- Send password reset
- Find user
- Update user profile
- Delete user
- Query users
- Provide UI for all functions

Utility requirements

- Must only work from server or the clients domain
- Server and client side different API key

Authentication flow

- User creates account or logins in and gets token
- Token is stored in local-storage or cookie
- User makes requests with the token to API endpoints
- Token is refreshed regularly to prevent user from logging out
- Token can be voided when the password state changes