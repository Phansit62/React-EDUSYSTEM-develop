import React from "react";
import { Formik, Form, Field , ErrorMessage } from "formik";
import DropdownList from "../../components/DropdownList";
import { monthTH } from "../../Data/month-th.json";
import Swal from "sweetalert2";
import SearchAddress from "../../components/SearchAddress";
import { SaveStudent, UpdateStudent } from "../../services/student.service";
import validateStudent from "../Setting/Student/ValidateStudent";

import Input from "../../components/Input";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stdId: "",
      titleId: 0,
      name: "",
      lastname: "",
      birtday: null,
      phone: "",
      email: "",
      address: "",
      district: "",
      amphur: "",
      province: "",
      postcode: "",
      username: "",
      password:"",
      salt:"",
      title: [],
      year: "",
      month:"",
      day:"",
      confirm:""
    };
  }

  async componentDidMount() {
    this.fetchInitial();
  }


  async action(data) {
    let res = "";
    if (data.stdId === "") {
      
      data.birtday = `${data.year}-${data.month}-${data.day}`
      console.log("INput:",data)
      res = await SaveStudent(data)
      // console.log(res)
    } else {
      res = await UpdateStudent(data.stdId, data);
    }

    if (res !== undefined) {
      if (res.statusCode === "001") {
        Swal.fire({
          icon: "success",
          title: "บันทึกข้อมูลสำเร็จ",
          showConfirmButton: false,
          timer: 500,
        });
        this.props.history.push("/showStudent");
      } else {
        Swal.fire({
          icon: "warning",
          title: "บันทึกข้อมูลไม่สำเร็จ",
          showConfirmButton: false,
          timer: 500,
        });
      }
    }
  }

  fetchInitial() {
    let strInitial = [
      {
        titleId: 1,
        titleName: "นาย",
      },
      {
        titleId: 2,
        titleName: "นางสาว",
      },
      {
        titleId: 3,
        titleName: "นาง",
      },
    ];
    this.setState({
      title: strInitial,
    });
  }

  validateConfirmPass(pass,value){
    let error;
    if (pass !== value) {
      error = 'กรุณากรอกให้ตรงกัน😂😂';
    }
    return error;
  }

  async componentWillMount() {
    
    //console.log("t:" + JSON.stringify(this.props.location.state));
    if (this.props.location.state !== undefined) {
      let param = this.props.location.state.value;
      this.setState({
        stdId:param.stdId,
        titleId: param.titleId,
        titleName:param.titleName,
        name: param.name,
        lastname: param.lastname,
        birtday: param.birtday,
        phone:param.phone,
        email:param.email,
        address: param.address,
        district: param.district,
        amphur: param.amphur,
        province: param.province,
        postcode: param.postcode,
        username: param.username,
        password:param.password,
        year: param.year,
        month:param.month,
        day:param.day,
        salt: param.salt,
      });
    } else {
      console.log("444");
    }
  }

  componentWillUnmount() {}


  render() {
    var year = new Date().getFullYear();
    let years = Array.from(new Array(10), (e, index) => year - index);
    return (
      <div>
        <div className="col-12 col-md-12 col-lg-12">
          <div className="card card-primary">
            <div className="card-header">
              <h4>ข้อมูลส่วนตัว</h4>
            </div>
            <div className="card-body">
              <Formik
                validationSchema={validateStudent}
                initialValues={{
                  stdId:this.state.stdId,
                  titleId: this.state.titleId,
                  name: this.state.name,
                  lastname: this.state.lastname,
                  birtday: this.state.birtday,
                  phone:this.state.phone,
                  email:this.state.email,
                  address: this.state.address,
                  district: this.state.district,
                  amphur: this.state.amphur,
                  province: this.state.province,
                  postcode: this.state.postcode,
                  username: this.state.username,
                  password:this.state.password,
                  salt:this.state.salt,
                  year: this.state.year,
                  month:this.state.month,
                  day:this.state.day,
                  confirm:this.state.confirm,
                }}
                enableReinitialize={true}
                onSubmit={(values, { resetForm }) => {
                  // console.log("submit:" + JSON.stringify(values));
                  this.action(values);
                  resetForm();
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  setFieldValue,
                  setFieldTouched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <Input
                        type="hidden"
                        name="stdId"
                        className="form-control"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.stdId}
                      />
                      <div className="col-md-3">
                        <label>คำนำหน้าชื่อ</label>
                        <DropdownList
                          name="titleId"
                          defaultInputValue={this.state.titleName}
                          getOptionLabel={(option) => option.titleName}
                          getOptionValue={(option) => option.titleId}
                          options={this.state.title}
                          placeholder={"--กรุณาเลือก--"}
                          value={values.title}
                          onChange={async (v) => {
                            setFieldValue("titleId", v.titleId);
                          }}
                          onBlur={handleBlur}
                          errors={errors}
                          touched={touched}
                        />
                          
                      </div>
                      <div className="col-md-5">
                        <label>ชื่อ</label>
                        <Input
                          type="text"
                          name="name"
                          className="form-control"
                          onChange={(v) => {
                            setFieldValue("name", v);
                          }}
                          errors={errors}
                          touched={touched}
                          value={values.name}
                        />
                      
                      </div>
                      <div className="col-md-4">
                        <label>นามสกุล</label>
                        <Input
                          type="text"
                          name="lastname"
                          className="form-control"
                          onChange={(v) => {
                            setFieldValue("lastname", v);
                          }}
                          value={values.lastname}
                          errors={errors}
                          touched={touched}
                        />
                      
                      </div>
                      {/* <div className="col-md-4">
                        <input
                          type="hidden"
                          name="birtday"
                          className="form-control"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.birtday}
                          
                        />
                      </div> */}
                    </div>

                    <div className="form-group row">
                      <div className="col-md-2">
                        <label>วันเดือนปีเกิด</label>
                        <select
                          name="day"
                          className="form-control"
                          value={values.day}
                          onChange={(e) => {
                            setFieldValue("day", e.target.value);
                          }}
                          errors={errors}
                          touched={touched}
                        >
                          <option value=""> -- วัน -- </option>
                          {Array.from(Array(31), (e, i) => (
                            <option value={i + 1 < 10 ? "0" + (i + 1) : i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                        <span class="error" style={{ color: "red" }}>
              {errors.day}</span>
                      </div>
                      <div className="col-md-2">
                        <select
                          name="month"
                          className="form-control"
                          style={{ marginTop: "30px" }}
                          value={values.month}
                          errors={errors}
                          touched={touched}
                          onChange={(e) => {
                            setFieldValue("month", e.target.value);
                          }}
                        >
                          <option value=""> -- เดือน -- </option>
                          {monthTH.map((item, index) => (
                            <option key={item.id} value={item.id}>
                              {item.monthName}
                            </option>
                          ))}
                        </select>
                        <span class="error" style={{ color: "red" }}>
              {errors.month}</span>
                      </div>
                      <div className="col-md-2">
                        <select
                          name="year"
                          className="form-control"
                          style={{ marginTop: "30px" }}
                          value={values.year}
                          errors={errors}
                          touched={touched}
                          onChange={(e) => {
                            setFieldValue("year", e.target.value);
                          }}
                        >
                          <option value=""> -- ปี -- </option>
                          {years.map((year, index) => (
                            <option key={`year${index}`} value={year}>
                              {year + 543}
                            </option>
                          ))}
                        </select>
                        <span class="error" style={{ color: "red" }}>
              {errors.year}</span>
                      </div>
                      <div className="col-md-3">
                        <label>เบอร์โทรศัพท์</label>
                        <Input type="text" className="form-control"
                          name="phone"
                          onChange={(v) => {
                            setFieldValue("phone", v);
                          }}
                          value={values.phone}
                          errors={errors}
                          touched={touched}
                        />
                       
                      </div>
                      <div className="col-md-3">
                        <label>อีเมล</label>
                        <Input type="text" className="form-control"
                             name="email"
                             onChange={(v) => {
                              setFieldValue("email", v);
                            }}
                             value={values.email}
                             errors={errors}
                             touched={touched}
                        />
                          
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-12">
                      <SearchAddress
                          onChange={(value) => {
                            setFieldValue("use_address", false);
                            if (value !== "") {
                              setFieldValue(
                                "district",
                                value.subdistrictName
                              );
                              setFieldValue("amphur", value.districtName);
                              setFieldValue("province", value.provinceName);
                              setFieldValue("postcode", value.postCode);
                            } else {
                              setFieldValue("district", "");
                              setFieldValue("amphur", "");
                              setFieldValue("province", "");
                              setFieldValue("postcode", "");
                            }
                          }}
                          name="SearchAddress"
                          placeholder="ค้นหา"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-3">
                        <label>บ้านเลขที่</label>
                        <Input type="text" className="form-control"
                        
                        name="address"
                        onChange={(v) => {
                          setFieldValue("address", v);
                        }}
                        value={values.address}
                        errors={errors}
                        touched={touched}
                        />
                        
                      </div>
                      <div className="col-md-3">
                        <label>ตำบล</label>
                        <Input type="text" className="form-control"
                            name="district"
                            onChange={(v) => {
                              setFieldValue("district", v);
                            }}
                            value={values.district}
                            errors={errors}
                            touched={touched}
                        />
                          \
                      </div>
                      <div className="col-md-2">
                        <label>อำเภอ</label>
                        <Input type="text" className="form-control"

                        name="amphur"
                        onChange={(v) => {
                          setFieldValue("amphur", v);
                        }}
                        value={values.amphur}
                        errors={errors}
                        touched={touched}
                        />
                     
                      </div>
                      <div className="col-md-2">
                        <label>จังหวัด</label>
                        <Input type="text" className="form-control"
                        
                        name="province"
                        onChange={(v) => {
                          setFieldValue("province", v);
                        }}
                        value={values.province}
                        errors={errors}
                        touched={touched}

                        />
                       
                      </div>
                      <div className="col-md-2">
                        <label>รหัสไปรษณีย์</label>
                        <Input type="text" className="form-control" 
                        name="postcode"
                        onChange={(v) => {
                          setFieldValue("postcode", v);
                        }}
                        value={values.postcode}
                        errors={errors}
                        touched={touched}
                        />
                       
                      </div>
                    </div>

                    <hr />
                    <h5>ข้อมูลผู้ใช้งาน</h5>
                    <div className="form-group row">
                      <div className="col-md-4">
                        <label>ชื่อผู้ใช้งาน</label>
                        <Input type="text" className="form-control"
                        
                        name="username"
                        onChange={(v) => {
                          setFieldValue("username", v);
                        }}
                        errors={errors}
                        touched={touched}
                        value={values.username}

                        />
                       
                      </div>
                      <div className="col-md-4">
                        <label>รหัสผ่าน</label>
                        <Input
                          type="password"
                          className="form-control"
                          name="password"
                          onChange={(v) => {
                            setFieldValue("password", v);
                          }}
                          errors={errors}
                          touched={touched}
                          value={values.password}
                        />
                      
                      </div>
                      <div className="col-md-4">
                        <label>ยืนยันรหัสผ่าน</label>
                        <Input 
                          type="password"
                          className="form-control"
                          name="confirm"
                          autoComplete="off"
                          // validate={value => this.validateConfirmPass(values.password,value)}
                          onChange={async (e) => {
                            setFieldValue("confirm", e);
                        
                          }}
                          value={values.confirm}
                          errors={errors}
                          touched={touched}
                        />
                        <span class="error" style={{ color: "red" }}>
              {errors.confirm}
            </span>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-12 text-center">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary">บันทึก</button> &nbsp;
                        &nbsp;
                        <button  type="reset"  className="btn btn-secondary">ล้างข้อมูล</button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }
}