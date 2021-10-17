import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import xlsx from "xlsx";
import axios from "axios";

const ImportExcelFile = () => {
  const initialValues = {
    tableName: "",
    excelFile: "",
  };

  const validationSchema = Yup.object({
    tableName: Yup.string().required("Table Name is required"),
    excelFile: Yup.string().required("Excel File is required"),
  });

  const onSubmit = (values) => {
    console.log(values);
    axios
      .post("http://localhost:5000/student/add", values)
      .then((response) => console.log(response));
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div className="importExcelFile">
      <h3 className="header">Import Excel File</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="formControl">
          <label htmlFor="tableName">Table Name</label>
          <input
            type="text"
            name="tableName"
            id="tableName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.tableName}
          />
          <div></div>
        </div>
        <div className="formControl">
          <label htmlFor="excelFile">Excel File Upload</label>
          <input
            type="file"
            name="excelFile"
            id="excelFile"
            onChange={(event) => {
              formik.setFieldValue("excelFile", event.target.files[0]);
              const file = new FileReader();
              file.onload = (event) => {
                const workbook = xlsx.read(event.target.result, {
                  type: "binary",
                  cellDates: true,
                });
                formik.setFieldValue(
                  "sheetData",
                  xlsx.utils.sheet_to_json(
                    workbook.Sheets[workbook.SheetNames[0]]
                  )
                );
              };
              file.readAsBinaryString(event.target.files[0]);
            }}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          <button type="submit" disabled={!formik.isValid}>
            Import Data
          </button>
          <input type="reset" name="clearData" />
        </div>
      </form>
    </div>
  );
};

export default ImportExcelFile;
