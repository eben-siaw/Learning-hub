import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { Input, InputLabel, Typography, FormControl } from "@material-ui/core";

const StreamDetails = ({ handleSubmit, editDetails, onSubmit }) => {
  const [editValues, setEditValues] = useState({});

  //activates if the values in the effect changes 
  useEffect(() => {
    setEditValues({
      title: (editDetails && editDetails.title) || "",
      description: (editDetails && editDetails.description) || "",
    });
  }, [editDetails]);

  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          style={{ color: "red" }}
        >
          {error}
        </Typography>
      );
    }
  };

  const renderInput = ({ input, label, meta }) => {
    if (input.value === "") input.onChange(editValues[input.name]);
    return (
      <>
        <FormControl fullWidth={true} margin="normal">
          <InputLabel>{label}</InputLabel>
          <Input {...input} />
          {renderError(meta)}
        </FormControl>
      </>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field name="title" component={renderInput} label="Title" />
      <Field name="description" component={renderInput} label="Description" />
      <button style={{ marginTop: "20px" }} type="submit">
        {editDetails ? "Edit Stream" : "Create Stream"}
      </button>
    </form>
  );
};

// validating form fields
const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate,
})(StreamDetails);
