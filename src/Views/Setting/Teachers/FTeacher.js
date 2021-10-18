import React from "react";
import { Fragment,Component,useState, useEffect } from "react";
import { Formik,Form, ErrorMessage } from "formik";
import { saveTeacher, updateTeacher,getMajorList,getFacultysList} from "../../../services/teacher.service";

import DropdownList from "../../../components/DropdownList";
import Swal from "sweetalert2";

class FTeacher extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        teacherCode: 0,
        titleId:0,
        name: "",
        lastname: "",
        facultyCode:0,
        majorCode:0,
        citizenId:"",
        faculty:[],
        major:[],
        title:[
            {titleId:1,name:"นาย"},
            {titleId:2,name:"นาง"},
            {titleId:3,name:"นางสาว"},
        ]
      };
    }
  

    async componentDidMount() {
        this.fetchAllFaculty();
        this.fetchAllMajor();
      }
    
      async fetchAllFaculty() {
        let response = await getFacultysList();
        response.statusCode === "001"
          ? this.setState({ faculty: response.data })
          : this.setState({ faculty: [] });
      }
      async fetchAllMajor() {
        let response = await getMajorList();
        console.log(response.data);
        response.statusCode === "001"
          ? this.setState({ major: response.data })
          : this.setState({ major: [] });
      }

  
    async action(data) {
      let res = "";
      if (data.teacherCode === 0) {
        res = await saveTeacher(data)
       
        console.log('API CONNECT',res);
      } else {
        res = await updateTeacher(data.teacherCode, data);
      }
  
      if (res !== undefined) {
        if (res.statusCode === "001") {
          Swal.fire({
            icon: "success",
            title: "บันทึกข้อมูลสำเร็จ",
            showConfirmButton: false,
            timer: 500,
          });
          this.props.history.push("/showTeacher");
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
//   async save(data){console.log(data)}
    async componentWillMount() {
        console.log(this.props.location)
      if (this.props.location.state !== undefined) {
        let param = this.props.location.state.value;
        console.log(param.facultyName)
        this.setState({
          teacherCode: param.teacherCode,
          name: param.name,
          lastname: param.lastname,
          facultyCode: param.facultyCode,
          facultyName: param.facultyName,
          majorCode: param.majorCode,
          majorName: param.majorName,
          titleId:param.titleId,
          titleName:param.titleName,
          citizenId:param.citizenId
        });
      } else {
        console.log("444");
      }
    }
  
    componentWillUnmount() {}
  
    render() {
      return (
        <Fragment>
          <div className="row">
            <div className="col-12 col-md-12 col-lg-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h4>ข้อมูลสาขา</h4>
                </div>
                <div className="card-body">
                  <Formik
                    // validationSchema={Schema}
                    validate={(values) => {
                      const errors = {};
                      if (!values.majorCode) {
                        errors.majorCode = "จำเป็นต้องระบุข้อมูล";
                      }
  
                      if (!values.facultyCode) {
                        errors.facultyCode = "จำเป็นต้องระบุข้อมูล";
                      }
                     
                      if (!values.titleId) {
                        errors.titleId = "จำเป็นต้องระบุข้อมูล";
                      }
                      if (!values.lastname) {
                        errors.lastname = "จำเป็นต้องระบุข้อมูล";
                      }
                      if (!values.name) {
                        errors.name = "จำเป็นต้องระบุข้อมูล";
                      }
                      if (!values.citizenId) {
                        errors.citizenId = "จำเป็นต้องระบุข้อมูล";
                      }
                      return errors;
                    }}
                    initialValues={{
                        teacherCode: this.state.teacherCode,
                        titleId:this.state.titleId,
                        name:this.state.name,
                        lastname: this.state.lastname,
                        facultyCode:this.state.facultyCode,
                        majorCode:this.state.majorCode,
                        citizenId:this.state.citizenId,
                    }}
                    // enableReinitialize={true}
                    onSubmit={(values, { resetForm }) => {
                      this.action(values);
                      resetForm();
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      setFieldValue,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="form-group row">
                          <div className="col-md-4">
                            <input
                              type="hidden"
                              name="teacherCode"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.teacherCode}
                            />
                            <label>ชื่อ</label>
                            <input
                              className="form-control"
                              type="text"
                              name="name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                            />
                            <ErrorMessage
                              component="div"
                              name="name"
                              style={{ color: "red" }}
                            />
                          </div>
                          <div className="col-md-4">
                          <label>นามสกุล</label>
                            <input
                              className="form-control"
                              type="text"
                              name="lastname"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.lastname}
                            />
                            <ErrorMessage
                              component="div"
                              name="lastname"
                              style={{ color: "red" }}
                            />
                          </div>
                          <div className="col-md-4">
                          <label>คำนำหน้าชื่อ</label>
                          <DropdownList
                          
                            name="titleId"
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.titleId}
                            options={this.state.title} 
                            defaultInputValue={this.state.titleName}
                            placeholder={"-- กรุณาเลือกคำนำหน้าชื่อ --"}
                            value={values.title}
                            onChange={async (v) => {
                                setFieldValue("titleId", v.titleId)
                            }}
                            onBlur={handleBlur}
                          />
                            <ErrorMessage
                              component="div"
                              name="titleId"
                              style={{ color: "red" }}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-7">
                                <label>เลขบัตรประชาชน</label>
                                <input
                              className="form-control"
                              type="text"
                              name="citizenId"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.citizenId}
                            />
                            <ErrorMessage
                              component="div"
                              name="citizenId"
                              style={{ color: "red" }}
                            />
                            </div>
                        </div>
                        <div className="form-group row">
                        <div className="col-md-6">
                          <label>ชื่อคณะ</label>
                          <DropdownList
                            name="facultyCode"
                            getOptionLabel={(option) => option.facultyName}
                            getOptionValue={(option) => option.facultyCode}
                            options={this.state.faculty}
                            placeholder={"-- กรุณาเลือกชื่อคณะ --"}
                            value={values.faculty}
                            defaultInputValue={this.state.facultyName}
                            onChange={async (v) => {
                              setFieldValue("facultyCode", v.facultyCode);
                              console.log(v)
                            }}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            component="div"
                            name="facultyCode"
                            style={{ color: "red" }}
                          />
                        </div>
                        <div className="col-md-6">
                          <label>ชื่อสาขา</label>
                          <DropdownList
                            name="majorCode"
                            getOptionLabel={(option) => option.majorName}
                            getOptionValue={(option) => option.majorCode}
                            options={this.state.major}
                            placeholder={"-- กรุณาเลือกชื่อสาขา --"}
                            value={values.major}
                            defaultInputValue={this.state.majorName}
                            onChange={async (v) => {
                              setFieldValue("majorCode", v.majorCode);
                            }}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            component="div"
                            name="majorCode"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
  
  
                        <div className="row">
                          <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            บันทึกข้อมูล
                          </button>
                          &nbsp;
                          <button className="btn btn-secondary">
                            ล้างข้อมูล
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
                {/** close tag card-body */}
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
  }
  
  export default FTeacher;