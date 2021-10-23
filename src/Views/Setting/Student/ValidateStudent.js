import * as Yup from "yup";

const validateStudent = Yup.object().shape({
    titleId: Yup.string().required("กรุณาระบุ คำนำหน้าชื่อ"),
    name: Yup.string().required("กรุณาระบุ ชื่อ"),
    lastname: Yup.string().required("กรุณาระบุ นามสกุล"),
    year: Yup.string().required("กรุณาระบุ ปีเกิด"),
    month: Yup.string().required("กรุณาระบุ เดือนเกิด"),
    day: Yup.string().required("กรุณาระบุ วันเกิด"),
    phone: Yup.string()
        .required("กรุณาระบุ เบอร์โทรศัพท์")
        .matches(/^[0-9]{9,10}$/, "กรุณาตรวจสอบเบอร์โทรศัพท์อีกครั้ง"),
    email: Yup.string()
        .required("กรุณาระบุ อีเมล")
        .matches(/^[\w-\.]+@([\w-]{2,}.)+[\w-]{2,4}$/, "รูปแบบอีเมล์ไม่ถูกต้อง"),
    address: Yup.string().required("กรุณาระบุ ที่อยู่"),
    district: Yup.string().required("กรุณาระบุ ตำบล"),
    amphur: Yup.string().required("กรุณาระบุ อำเภอ"),
    province: Yup.string().required("กรุณาระบุ จังหวัด"),
    postcode: Yup.string().required("กรุณาระบุ รหัสไปรษณีย์"),
    username: Yup.string().required("กรุณาระบุ ชื่อผู้ใช้งาน"),
    password: Yup.string().required("กรุณาระบุ รหัสผ่าน"),
    confirm: Yup.string().when("password", {
        is:val => (val && val.length > 0 ? true : false),
        then:Yup.string().oneOf(
            [Yup.ref("password")],
            "กรูณากรอก รหัสผ่านให้ตรงกัน"
        )
    }),
});

export default validateStudent;