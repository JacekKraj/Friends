import React from 'react';
import { Field } from 'formik';

import classes from './myFormikSelect.module.scss';
import { days, months, years } from './../selectTimeOptions/selectTimeOptions';

const MyFormikSelect = (props) => {
  const { type, className, name, disabled } = props;

  const [options, setOptions] = React.useState([]);

  const getOptionsType = (type) => {
    if (type === 'day') return days;
    if (type === 'month') return months;
    return years;
  };

  const createOptions = (type) => {
    const optionsType = getOptionsType(type);
    const options = optionsType.map((timeStamp) => {
      return (
        <option value={timeStamp} key={timeStamp}>
          {timeStamp}
        </option>
      );
    });
    return options;
  };

  React.useEffect(() => {
    const options = createOptions(type);
    setOptions(options);
  }, [type]);

  return (
    <div className={className}>
      <Field required name={name} as='select' disabled={disabled} className={classes.select}>
        <option value='null'>{type}</option>
        {options}
      </Field>
    </div>
  );
};

export default MyFormikSelect;
