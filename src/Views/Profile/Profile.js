import React from "react";
import { SaveStudent } from "../../services/student.service";
import { Formik, Form, ErrorMessage } from "formik";
import Swal from "sweetalert2";


export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      StdId: 0,
      TitleId: "",
      Name: "",
      Lastname: "",
      Birtday: null,
      Phone: "",
      Email: "",
      Address: "",
      DistrictId: 0,
      Amphur: 0,
      Province: 0,
      Postcode: 0,
      Username: ""
    };
  }

  year = new Date().getFullYear();
  years = Array.from(new Array(5), (e, index) => this.year - index)
  month = [
    {key:1,value:"January"},
    {key:2,value:"February"},
    {key:3,value:"March"},
    {key:4,value:"April"},
    {key:5,value:"May"},
    {key:6,value:"June"},
    {key:7,value:"July"},
    {key:8,value:"August"},
    {key:9,value:"September"},
    {key:10,value:"October"},
    {key:11,value:"November"},
    {key:12,value:"December"},
  ];

  async PostStudent(data) {
    let res = await SaveStudent(data);

    if (res.statusCode === "001") {
      Swal.fire({
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
        showConfirmButton: false,
        timer: 500,
      });
      this.props.history.push("/showMajor");
    } else {
      Swal.fire({
        icon: "warning",
        title: "บันทึกข้อมูลไม่สำเร็จ",
        showConfirmButton: false,
        timer: 500,
      });
    }
  }

  async componentWillMount() {
    //console.log("t:" + JSON.stringify(this.props.location.state));
    if (this.props.location.state !== undefined) {
      let param = this.props.location.state.value;
      this.setState({
        StdId: param.StdId,
        TitleId: param.TitleId,
        Name: param.Name,
        Lastname: param.Lastname,
        Birtday: param.Birtday,
        Phone: param.Phone,
        Email: param.Email,
        Address: param.Address,
        DistrictId: param.DistrictId,
        Amphur: param.Amphur,
        Province: param.Province,
        Postcode: param.Postcode,
        Username: param.Username,
        Password: param.Password
      });
    } else {
      console.log("444");
    }
  }

  componentWillUnmount() { }


  render() {
    return (
      <div>
        <div className="col-12 col-md-12 col-lg-12">
          <div className="card card-primary">
            <div className="card-header">
              <h4>ข้อมูลส่วนตัว</h4>
            </div>
            <div className="card-body">
              <Formik
                // validationSchema={Schema}
                validate={(values) => {
                  const errors = {};
                  if (!values.TitleId) {
                    errors.TitleId = "จำเป็นต้องระบุข้อมูล";
                  }

                  if (!values.Name) {
                    errors.Name = "จำเป็นต้องระบุข้อมูล";
                  }
                  if (!values.Lastname) {
                    errors.Lastname = "จำเป็นต้องระบุข้อมูล";
                  }
                  if (!values.Birtday) {
                    errors.Birtday = "จำเป็นต้องระบุข้อมูล";
                  }
                  if (!values.Phone) {
                    errors.Phone = "จำเป็นต้องระบุข้อมูล";
                  }
                  if (!values.Email) {
                    errors.Email = "จำเป็นต้องระบุข้อมูล";
                  }
                  if (!values.Address) {
                    errors.Address = "จำเป็นต้องระบุข้อมูล";
                  }
                  if (!values.DistrictId) {
                    errors.DistrictId = "จำเป็นต้องระบุข้อมูล";
                  }
                  if (!values.Amphur) {
                    errors.Amphur = "จำเป็นต้องระบุข้อมูล";
                  }
                  if (!values.Province) {
                    errors.Province = "จำเป็นต้องระบุข้อมูล";
                  }
                  if (!values.Postcode) {
                    errors.Postcode = "จำเป็นต้องระบุข้อมูล";
                  }
                  if (!values.Username) {
                    errors.Username = "จำเป็นต้องระบุข้อมูล";
                  }
                  if (!values.Password) {
                    errors.Password = "จำเป็นต้องระบุข้อมูล";
                  }
                  return errors;
                }}
                initialValues={{
                  StdId: this.state.StdId,
                  TitleId: this.state.TitleId,
                  Name: this.state.Name,
                  Lastname: this.state.Lastname,
                  Birtday: this.state.Birtday,
                  Phone: this.state.Phone,
                  Email: this.state.Email,
                  Address: this.state.Address,
                  DistrictId: this.state.DistrictId,
                  Amphur: this.state.Amphur,
                  Province: this.state.Province,
                  Postcode: this.state.Postcode,
                  Username: this.state.Username,
                  Password: this.state.Password,
                }}
                // enableReinitialize={true}
                onSubmit={(values, { resetForm }) => {
                  console.log("values:" + values);
                  this.action(values);
                  resetForm();
                }}
              > {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <div className="col-md-2">
                      <label>รหัสนักเรียน</label>
                      <input className="form-control"
                        type="hidden"
                        name="StdId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.StdId}

                      />
                    </div>
                    <div className="col-md-3">
                      <label>คำนำหน้าชื่อ</label>
                      <select className="form-control">
                        <option>--กรุณาเลือก--</option>
                      </select>
                      <ErrorMessage
                        component="div"
                        name="TitleId"
                        style={{ color: "red" }}
                      />
                    </div>
                    <div className="col-md-4">
                      <label>ชื่อ</label>
                      <input type="text" className="form-control"
                        name="Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.Name}
                      />

                      <ErrorMessage
                        component="div"
                        name="Name"
                        style={{ color: "red" }}
                      />
                    </div>
                    <div className="col-md-3">
                      <label>นามสกุล</label>
                      <input type="text" className="form-control"
                        name="Lastname"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.Lastname}

                      />
                       <ErrorMessage
                            component="div"
                            name="Lastname"
                            style={{ color: "red" }}
                          />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-2">
                      <label>วันเดือนปีเกิด</label>
                      <select className="form-control">
                        <option>--วันที่--</option>
                        {Array.from(Array(31), (v, i) => (

                                <option value={i + 1}>{i}</option>
                            ))}
                           
                      </select>
                      <ErrorMessage
                            component="div"
                            name="Day"
                            style={{ color: "red" }}
                          />
                    </div>
                    <div className="col-md-2">
                      <select
                        className="form-control"
                        style={{ marginTop: "30px" }} >
                        <option>--เดือน--</option>
                        {this.month.map((value, key) => (
                                <option value={key}>
                                    {value}
                                </option>
                            ))}
                      </select>
                      <ErrorMessage
                            component="div"
                            name="month"
                            style={{ color: "red" }}
                          />
                    </div>
                    <div className="col-md-2">
                      <select
                        className="form-control"
                        style={{ marginTop: "30px" }}>
                        <option>--ปี พ.ศ.--</option>
                        {this.years.map((year, index) => (
                                <option key={index} value={year + 543}>
                                    {year + 543}
                                </option>
                            ))}
                      </select>
                      <ErrorMessage
                            component="div"
                            name="year"
                            style={{ color: "red" }}
                          />
                    </div>
                    <div className="col-md-3">
                      <label>เบอร์โทรศัพท์</label>
                      <input type="text" className="form-control"
                        name="Phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.Phone}

                      />
                       <ErrorMessage
                            component="div"
                            name="Phone"
                            style={{ color: "red" }}
                          />
                    </div>
                    <div className="col-md-3">
                      <label>อีเมล</label>
                      <input type="text" className="form-control"
                        name="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.Email}

                      />
                       <ErrorMessage
                            component="div"
                            name="Email"
                            style={{ color: "red" }}
                          />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="ค้นหาที่อยู่"
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-3">
                      <label>บ้านเลขที่</label>
                      <input type="text" className="form-control"

                        name="Address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.Address}
                      />
                       <ErrorMessage
                            component="div"
                            name="Address"
                            style={{ color: "red" }}
                          />
                    </div>
                    <div className="col-md-3">
                      <label>ตำบล</label>
                      <input type="text" className="form-control"
                        name="District"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.District}
                      />
                       <ErrorMessage
                            component="div"
                            name="District"
                            style={{ color: "red" }}
                          />
                    </div>
                    <div className="col-md-2">
                      <label>อำเภอ</label>
                      <input type="text" className="form-control"

                        name="Amphur"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.Amphur}

                      />
                       <ErrorMessage
                            component="div"
                            name="Amphur"
                            style={{ color: "red" }}
                          />
                    </div>
                    <div className="col-md-2">
                      <label>จังหวัด</label>
                      <input type="text" className="form-control"

                        name="Province"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.Province}

                      />
                       <ErrorMessage
                            component="div"
                            name="Province"
                            style={{ color: "red" }}
                          />
                    </div>
                    <div className="col-md-2">
                      <label>รหัสไปรษณีย์</label>
                      <input type="text" className="form-control"
                        name="Postcode"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.Postcode}

                      />
                       <ErrorMessage
                            component="div"
                            name="Postcode"
                            style={{ color: "red" }}
                          />
                    </div>
                  </div>

                  <hr />
                  <h5>ข้อมูลผู้ใช้งาน</h5>
                  <div className="form-group row">
                    <div className="col-md-4">
                      <label>ชื่อผู้ใช้งาน</label>
                      <input type="text" className="form-control"

                        name="Username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.Username}
                      />
                       <ErrorMessage
                            component="div"
                            name="Username"
                            style={{ color: "red" }}
                          />
                    </div>
                    <div className="col-md-4">
                      <label>รหัสผ่าน</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"

                        name="Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.Password}
                      />
                        <ErrorMessage
                            component="div"
                            name="Password"
                            style={{ color: "red" }}
                          />
                    </div>
                    <div className="col-md-4">
                      <label>ยืนยันรหัสผ่าน</label>
                      <input
                        type="password"
                        className="form-control"
                        id="ConPassword"
                      />
                        <ErrorMessage
                            component="div"
                            name="ConPassword"
                            style={{ color: "red" }}
                          />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-sm-12 text-center">
                      <button class="btn btn-primary" disabled={isSubmitting}>บันทึก</button> &nbsp; &nbsp;
                      <button class="btn btn-secondary">ล้างข้อมูล</button>
                    </div>
                  </div>
                </form>
              )
                }
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
