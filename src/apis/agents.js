import axios from "axios";
import Cookies from "js-cookie";
import api from "./axios/instance";
import toast from "react-hot-toast";
export const fetchApprovedAgents = async () => {
    try {
        console.log("Fetch approve agents api call")
      const result= await axios.get("http://localhost:5000/api/spade/getApprovedAgents", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log("Fetch approve agents api result:",result)
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
}
export const updateAgentStatus = async (agent_id,status) => {
    try {
        console.log("update Agents api call")
      const result = await axios.put("http://localhost:5000/api/spade/UpdateAgentStatus", {
        agent_id,
        status
      },{
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            },
        });
        console.log("update agents api result:",result)
        return result;
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
}
export const updateAgentProfile = async (formdata)=>{
  try{
    const result= await api.put("updateUserProfile",formdata,{
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });
    if(result.status===200){
      toast.success("Profile updated successfully")
      return result;
    }
    else{
      throw new Error("Failed to update profile")
    }
  }catch(error){
    toast.error("Failed to update profile")
  }
}
