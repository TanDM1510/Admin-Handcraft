import axios from "axios";



export const sendTestFCMNotification = async (title, body) => {
  try {
    const footerText = localStorage.getItem("footerText") || "";

    const fcmToken = footerText;
    const response = await axios.post(
      "https://fcm.googleapis.com/v1/projects/prm392-craft-management/messages:send",
      {
        message: {
          token:
            "fF2sompyRmuycuv4X54tLi:APA91bHAliwgBRRxLd-FiRT_TLXPu_s0P5Cox4QxT3Cg1ROsCiVdDPVQHiEecjAsOpLqSjguc-vfhHClboFdIdC5dl8GQZH8AwsE5z-k-cO17xpU7knIK62QdONwZrNjst0xl4gVhbf_",
          notification: {
            body: body,
            title: title,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${fcmToken}`,
        },
      }
    );

    console.log("FCM Notification sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending FCM Notification:", error);
  }
};
