import { serverUrl } from "./BaseUrl"
import { commonAPI } from "./commonAPi"

export const loginAPI = async (reqBody)=>{
    return await commonAPI('POST', `${serverUrl}/adminlogin`, reqBody,"")
}
export const getProfileAPI = async ()=>{
    return await commonAPI('GET', `${serverUrl}/getProfile`, "","")
}
export const updateProfileAPI = async (reqBody)=>{
    return await commonAPI('PUT', `${serverUrl}/updateProfile`, reqBody,"")
}


export const getGrievanceApi = async (searchkey)=>{
    return await commonAPI('GET', `${serverUrl}/getgrievances?search=${searchkey}`, "","")

}
export const getSearchGrievanceApi = async (searchkey)=>{
    return await commonAPI('GET', `${serverUrl}/getSearchgrievances?search=${searchkey}`, "","")

}
export const UpdateGrievanceAPI = async (reqBody)=>{
    return await commonAPI('PUT', `${serverUrl}/grievanceUpdate`, reqBody,"")
}

export const deleteGrievanceAPI = async (reqBody)=>{
    return await commonAPI('DELETE', `${serverUrl}/grievanceDelete`, reqBody,"")
}

