import React, { Fragment, useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";

import { GetAllTeacher } from "../../../services/teacher.service";

export default function ShowTeacher() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    currentPage: 0,
    lastPage: 1,
    totalRow: 0,
  });
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  

  useEffect(fetchData, [pageNo, pageSize]);

  async function fetchData() {
    const res = await GetAllTeacher(pageSize, pageNo);
    console.log(res)
    if (res.statusCode == "002") {
      let pagination = res.pagin;
      if (pagination.totalRow > 0) {
        setData(res.data);
        setPage({
          currentPage: pagination.currentPage,
          lastPage: pagination.totlaPage,
          totalRow: pagination.totalRow,
        });
      }
    } else {
    }
  }

  const handleChangePage = (e, newPage) => {
    e.preventDefault();
    setPageNo(newPage);
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-12 col-lg-12">
          <div className="card card-primary">
            <div className="card-header">
              <h4>ข้อมูลอาจารย์</h4>
            </div>
            <div className="card-body">
              {/** สำหรับแสดงรายการข้อมูล */}
              <div className="form-group row">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>ชื่อ-นามสกุล</th>
                      <th>คณะ</th>
                      <th>สาขา</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((value, index) => (
                      <tr key={value.teacherCode}>
                        <td>
                          {(page.currentPage - 1) * pageSize + (index + 1)}
                        </td>
                        <td>{value.name + " " + value.lastname}</td>
                        <td>{value.facultyName}</td>
                        <td>{value.majorName}</td>
                        <td>
                          <button className="btn btn-warning">แก้ไข</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/** แสดง pagination */}
              <div className="d-flex justify-content-between">
                <div>จำนวนทั้งหมด {page.totalRow} รายการ</div>
                <Pagination
                  count={parseInt(page.lastPage)}
                  page={pageNo}
                  color="primary"
                  size="small"
                  defaultPage={6}
                  siblingCount={1}
                  onChange={handleChangePage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
