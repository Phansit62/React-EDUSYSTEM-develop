import Instance from "../Helper/axios";
import { URLLOCAL } from "../Helper/baseURL";

export async function getAllFaculty(pageSize, currentPage, search) {
  try {
    const response = await Instance.get(
      URLLOCAL +
        "Facultys/GetFacultys?pageSize=" +
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

export async function saveFaculty(data){
  try{
    const response = await Instance.post(URLLOCAL + "Facultys/SaveFaculty",
    data);
    return await response.data;
  }
  catch(error){
    console.log(error.response.request._response);
  }
}


export async function updateFaculty(facultyCode, data) {
  try {
    const response = await Instance.put(
      URLLOCAL + "Facultys/UpdateFaculty?facultyCode=" + facultyCode,
      data
    );
    return await response.data;
  } catch (error) {
    console.log("error", error.message);
  }
}

export async function deleteFaculty(facultyCode) {
  try {
    const response = await Instance.delete(
      URLLOCAL + "Facultys/DeleteFaculty?facultyCode=" + parseInt(facultyCode)
    );
    return await response.data;
  } catch (error) {
    console.log("error", error.message);
  }
}