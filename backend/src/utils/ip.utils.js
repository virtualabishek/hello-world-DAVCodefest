import axios from "axios";

export const getPublicIP = async () => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    console.log("Public IP:", response.data.ip);
  } catch (error) {
    console.error("Error fetching public IP:", error);
  }
};
