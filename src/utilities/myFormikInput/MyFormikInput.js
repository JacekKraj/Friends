import React from "react";
import { Field, useField } from "formik";
import classnames from "classnames";

import classes from "./myFormikInput.module.scss";

const MyFormikInput = ({ label, ...props }) => {
  const [field] = useField(props);

  return (
    <div className={classnames(classes.container, props.className)}>
      <Field {...field} {...props} />
    </div>
  );
};

export default MyFormikInput;
