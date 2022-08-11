import { useFormikContext } from "formik";

const SubmitButton = ({ title }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <button className="btn btn-md btn-primary button" onClick={handleSubmit}>
      {title}
    </button>
  );
};

export default SubmitButton;
