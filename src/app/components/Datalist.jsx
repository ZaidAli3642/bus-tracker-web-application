import DatalistInput from "react-datalist-input";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";

const Datalist = ({ name, options, label }) => {
  const { setFieldValue, touched, setFieldTouched, errors } =
    useFormikContext();

  return (
    <div className="input-container">
      <DatalistInput
        items={options}
        style={{ width: 350, color: "#aaabad" }}
        label={label}
        onBlur={() => setFieldTouched(name)}
        onChange={(e) => setFieldValue(name, e.target.value)}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </div>
  );
};

export default Datalist;
