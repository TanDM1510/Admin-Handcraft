export const sandboxURL = "https://sandbox.webbythien.com";
export const baseURL = "http://34.126.177.133:8881/v1/api/";

export const loginPath = "/auth/signin";
export const signUpPath = "/auth/signup";
export const gptsPath = "/gpts";
export const reviewsPath = "/reviews";
export const categoriesPath = "/categories";
export const userDetailsPath = "/users/details";
export const refreshTokenPath = "/auth/refresh";
export const uploadFilePath = "/files/upload";
export const packagePath = "/package";
export const paymentPath = "/payment/vnp";
export const socketPath = "https://socket.webbythien.com";
export const notificationUpdateAll = "/notification/all";
export const ratingPath = "/ratings";
export const listPath = "/lists";
export const updateDetailsPath = (userId) => {
  return `/users/${userId}/details`;
};

export const changePasswordPath = (userId) => {
  return `/users/${userId}/password`;
};

export const forgotPasswordPath = (email) => {
  return `/users/forgot-password/verify/${email}`;
};

export const verifyOTPPath = (email, otp) => {
  return `/users/forgot-password/${otp}/verify/${email}`;
};

export const changePassForgotPath = (email, otp) => {
  return `/users/forgot-password/change-password/${email}?otp=${otp}`;
};

export const getPaymentPath = (userId) => {
  return `/payment/${userId}`;
};

export const getNotificationUserPath = (userId) => {
  return `/notification/${userId}`;
};
