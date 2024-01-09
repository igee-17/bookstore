import { useDispatch } from "react-redux";
import { setSearch } from "../features/books/bookSlice";

const FormInput = ({ label, name, type, defaultValue, size, placeholder }) => {
  const dispatch = useDispatch();

  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className={`input input-bordered ${size}`}
        placeholder={placeholder || ""}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
    </div>
  );
};
export default FormInput;
