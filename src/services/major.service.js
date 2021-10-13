import Instance from "../Helper/axios";
//import axios from "axios";

import { URLLOCAL } from "../Helper/baseURL";

export async function GetAllMajor(pageSize, currentPage, search) {
  try {
    const response = await Instance.get(
      URLLOCAL +
        "Majors/GetMajors?pageSize=" +
        pageSize +
        "&currentPage=" +
        currentPage +
        "&search=" +
        search
    );
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function GetFacultysList(){
  const res = await Instance.get(
    URLLOCAL + "Facultys/GetFacultyList"
  );
  return await res.data;
}


export async function SaveMajor(data){
  try{
    const response = await Instance.post(URLLOCAL + "Majors/SaveMajor",
    data);
    return await response.data;
  }
  catch(error){
    console.log(error.response.request._response);
  }
}


export async function UpdateMajor(majorCode, data) {
  try {
    const response = await Instance.put(
      URLLOCAL + "Majors/UpdateMajor?majorCode=" + majorCode,
      data
    );
    return await response.data;
  } catch (error) {
    console.log("error", error.message);
  }
}

export async function DeleteMajor(majorCode) {
  try {
    const response = await Instance.delete(
      URLLOCAL + "Majors/DeleteMajor?majorCode=" + parseInt(majorCode)
    );
    return await response.data;
  } catch (error) {
    console.log("error", error.message);
  }
}