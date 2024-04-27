import api from './axios/instance';


export const getAllUsers = async () => {
    try {
        console.log("getAllUsersWithAudios call")
        const result = await api.get("getAllUsers");
        console.log("Fetch getAllUsersWithAudios result:",result)
        return result;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
}

