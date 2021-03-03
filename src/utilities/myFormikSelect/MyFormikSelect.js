import React from "react";
import { Field } from "formik";
import classnames from "classnames";

import classes from "./myFormikSelect.module.scss";
import { days, months, years } from "./../selectTimeOptions/selectTimeOptions";

const MyFormikSelect = (props) => {
  const [options, setOptions] = React.useState([]);
  React.useEffect(() => {
    let options;
    if (props.type === "day") {
      options = days.map((el) => {
        return (
          <option value={el} key={el}>
            {el}
          </option>
        );
      });
    } else if (props.type === "month") {
      options = months.map((el) => {
        return (
          <option value={el} key={el}>
            {el}
          </option>
        );
      });
    } else if (props.type === "year") {
      options = years.map((el) => {
        return (
          <option value={el} key={el}>
            {el}
          </option>
        );
      });
    }
    setOptions(options);
  }, []);
  return (
    <div className={props.className}>
      <Field required name={props.name} as="select" disabled={props.disabled} className={classnames(classes.select)}>
        <option value="null">{props.type}</option>
        {options}
      </Field>
    </div>
  );
};

export default MyFormikSelect;
