export const sessionoptions = {
  password: process.env.SECRET_KEY,
  cookieName: "mockMatesession",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
