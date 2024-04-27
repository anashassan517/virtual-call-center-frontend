import { Axios } from "axios";
import api from "./axios/instance";
import Cookies from "js-cookie";
export const fetchCases = async () => {
  try {
    const result = await api.get("getCases", {
      headers: {
        "Authorization": "Bearer " + Cookies.get('accessToken')
      }
    });
    console.log("Fetch case result:", result)
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
  }

}


export const getSpecificCase = async (caseId) => {
  try {
    const result = await api.get(`cases/${caseId}`, {
      headers: {
        "Authorization": "Bearer " + Cookies.get('accessToken')
      }
    });
    
    console.log("get specific case result:", result);
    return result.data; // Assuming the backend sends back the case data
  } catch (error) {
    console.error("Error fetching specific case:", error);
    throw error; // Re-throwing the error to handle it in the component
  }
};


export const assignCase = async (agent_id, case_id) => {
  try {
    console.log("Assign case call")
    const result = await api.put("assignAgent", {
      agent_id,
      case_id
    }, {
      headers: {
        "Authorization": "Bearer " + Cookies.get('accessToken')
      }

    });
    console.log("Assign case api result:", result)
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
export const addCase = async (data) => {
  try {
    console.log("Add case call")
    const result = await api.post("addCase", data, {
      headers: {
        "Authorization": "Bearer " + Cookies.get('accessToken')
      }

    });
    console.log("Add case api result:", result)
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export const updateCaseStatus = async (case_id, status) => {
  try {
    console.log("update case api call")
    const result = await api.put("UpdateCaseStatus", {
      case_id,
      status
    });
    console.log("update case api result:", result)
    return result;
  }
  catch (error) {
    console.error("Error fetching data:", error);
  }
}
export const addCaseForm = async (data) => {
  try {
    console.log("Add case form call")
    const result = await api.post("addcaseForm", data, {
      headers: {
        "Authorization": "Bearer " + Cookies.get('accessToken')
      }
    });
    console.log("Add case form api result:", result)
    return result;
  }
  catch (error) {
    console.error("Error fetching data:", error);
  }
}

export const fetchCaseForm = async () => {
  try {
    const result = await api.get("getCaseForm", {
      headers: {
        "Authorization": "Bearer " + Cookies.get('accessToken')
      }
    });
    console.log("Fetch case form result:", result)
    return result;
  }
  catch (error) {
    console.error("Error fetching data:", error);
  }
}
