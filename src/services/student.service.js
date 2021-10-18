import Instance from "../Helper/axios";
import { URLLOCAL } from "../Helper/baseURL";

export async function GetAllStudent(pageSize, currentPage) {
  try {
    const response = await Instance.get(
      URLLOCAL +
        "Students/GetStudents?pageSize=" +
        pageSize +
        "&currentPage=" +
        currentPage
    );
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}
export async function SaveStudent(data){
  try{
    const response = await Instance.post(URLLOCAL + "Students/SaveStudent",
    data);
    return await response.data;
  }
  catch(error){
    console.log(error.response.request._response);
  }
}
