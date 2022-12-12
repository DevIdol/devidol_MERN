
import { axiosInstance } from "../../../config";

export const SendMessage = async ({ name, email, message, setSend }) => {
  try {
    const mailData = { name, email, message };
    let res = await axiosInstance.post("send-email", mailData);
    if (res) {
      setSend(res.data);
    }
  } catch (error) {
    alert(error.response.data.msg);
  }
};
