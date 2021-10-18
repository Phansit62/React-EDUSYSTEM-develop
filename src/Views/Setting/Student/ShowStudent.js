import React, { Fragment, useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import Swal from "sweetalert2";
import Icon from "../../../assets/icons/icons";
import SVGarrowClockwise from "../../../assets/svgs/SVGarrowClockwise";
import { GetAllStudent } from "../../../services/student.service";
import {useHistory} from "react-router-dom"

export default function ShowStudent() {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [page, setPage] = useState({
    currentPage: 0,
    lastPage: 1,
    totalRow: 0,
  });
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  useEffect(fetchData, [pageNo, pageSize]);

  async function fetchData() {
    const res = await GetAllStudent(pageSize, pageNo);
    if (res.statusCode == "001") {
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

  const searchData = (e) => {
    e.preventDefault();
    setData([]);
    fetchData();
  };

  const clearData = (e) => {
    e.preventDefault();
    setData([]);
    setSearch("");
    setPageNo(1);
    setPageSize(10);
    fetchData();
  };



  
  const handleChangePage = (e, newPage) => {
    e.preventDefault();
    setPageNo(newPage);
  };

  return (
    <Fragment>
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12">
            <div className="card card-primary" style={{ minHeight: "550px" }}>
              <div className="card-header">
                <h4>ข้อมูลนักศึกษา</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="row col-md-12">
                    <div className="col-md-4">
                      <div className="form-group">
                        <div className="input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="ค้นหาชื่อนักศึกษา"
                            aria-label=""
                            value={search}
                            onChange={(e) => {
                              setSearch(e.target.value);
                            }}
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-primary"
                              type="button"
                              onClick={(e) => {
                                searchData(e);
                              }}
                            >
                              <Icon
                                icon="search"
                                viewBox="0 0 16 16"
                                color="#FDFEFE"
                                size={16}
                                className=""
                              />
                            </button>
                            <button
                              type="reset"
                              className="btn btn-secondary"
                              onClick={(e) => {
                                clearData(e);
                              }}
                            >
                              <SVGarrowClockwise color="#FDFEFE" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8 text-right">
                      <button
                        className="btn btn-primary"
                        onClick={(e) => {
                          history.push("/Profile");
                        }}
                      >
                        <Icon
                          icon="add"
                          viewBox="0 0 16 16"
                          color="#FDFEFE"
                          size={16}
                          className=""
                        />{" "}
                        เพิ่มใหม่
                      </button>
                    </div>
                  </div>
                </div>
                {/** สำหรับแสดงรายการข้อมูล */}
                <div className="row" style={{ marginTop: "10px" }}>
                  <table className="table table-bordered table-sm">
                    <thead>
                      <tr className="text-center">
                        <th>#</th>
                        <th>รหัสนักศึกษา</th>
                        <th>ชื่อนักศึกษา</th>
                        <th>เบอร์โทรศัพท์</th>
                        <th>อีเมล์</th>
                        <th>ที่อยู่</th>
                        <th>อำเภอ</th>
                        <th>ตำบล</th>
                        <th>จังหวัด</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((value, index) => (
                        <tr key={value.stdId}>
                          <td>{index + 1}</td>
                          <td>{value.name}</td>
                          <td>{value.lastName}</td>
                          <td>{value.phone}</td>
                          <td>{value.email}</td>
                          <td>{value.amphur}</td>
                          <td>{value.district}</td>
                          <td>{value.province}</td>
                          <td className="text-center">
                            <button
                              className="btn btn-warning btn-sm"
                              // onClick={(e) => {
                              //   history.push("/FMajor", { value: value });
                              // }}
                            >
                              <Icon
                                icon="pencil"
                                viewBox="0 0 16 16"
                                color="#FDFEFE"
                                size={16}
                                className=""
                              />
                            </button>
                            &nbsp;
                            <button
                              className="btn btn-danger btn-sm"
                              // onClick={(e) => {
                              //   deleteData(
                              //     e,
                              //     value.majorCode,
                              //     value.majorName
                              //   );
                              //   return false;
                              // }}
                            >
                              <Icon
                                icon="trash"
                                viewBox="0 0 16 16"
                                color="#FDFEFE"
                                size={16}
                                className=""
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/** แสดง pagination */}
                <div className="d-flex justify-content-between">
                  <div>
                    ทั้งหมด <strong>{page.totalRow}</strong> รายการ
                  </div>
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
                {/** ปิด div ของ paging */}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
  );
}
