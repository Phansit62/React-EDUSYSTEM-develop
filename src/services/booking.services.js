import Instance from "../Helper/axios";
import { URLLOCAL } from "../Helper/baseURL";

export async function getCoures(pageSize, currentPage, search) {
  try {
    const response = await Instance.get(
      URLLOCAL +
        "BookiCoures/GetCoures?pageSize=" +
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

export async function Booking(StdID,data){
  try{
  
    const response = await Instance.post(URLLOCAL + "BookiCoures/BookingCoures?stdId="+StdID,
    data);
    return await response.data;
  }
  catch(error){
    console.log(error);
  }
}
