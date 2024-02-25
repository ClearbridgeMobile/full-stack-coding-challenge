import { useEffect, useState } from "react";
import "./CreateOrEditCompany.css";
import { useLocation, useNavigate } from "react-router-dom";
import { companiesHandlers } from "../../utils/CompaniesHandlers";
import { components } from "../../components/Components";
const CreateOrEditCompany = ({ setCompanies }) => {
  const [value, setValue] = useState({
    companyName: "",
    state: "",
    city: "",
    foundedDate: "",
    description: "",
  });
  const navigate = useNavigate();
  const handleValueChange = (key, val) => setValue({ ...value, [key]: val });
  const inputRowProps = [
    { label: "City", name: "city", type: "text" },
    { label: "State", name: "state", type: "text" },
  ];
  const handleCancel = () =>
    state?.company
      ? navigate(`/company-view/${state.company.companyId}`)
      : navigate("/");
  const { state } = useLocation();
  useEffect(() => {
    if (state?.company) setValue(state.company);
  }, [state?.company]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          state?.company
            ? companiesHandlers.handleUpdateCompany(
                e,
                setValue,
                navigate,
                state.company.companyId
              )
            : companiesHandlers.handleSaveCompany(e, setCompanies, navigate);
        }}
      >
        <div className="formContainer">
          <fieldset>
            <legend>
              {state?.company ? "Edit Company" : "Create a new company"}
            </legend>
            <div>
              <label style={{ display: "block", marginTop: "2rem" }}>
                Company Name:
              </label>
              <input
                required
                style={{ width: "100%", border: "3px solid black" }}
                type="text"
                name="companyName"
                onChange={(e) =>
                  handleValueChange(e.target.name, e.target.value)
                }
                value={value.companyName}
              />
            </div>
            <div className="inputRow">
              {inputRowProps.map(({ label, name, type }, i) => (
                <div key={i}>
                  <label>{label}:</label>
                  <input
                    required
                    type={type}
                    name={name}
                    onChange={(e) =>
                      handleValueChange(e.target.name, e.target.value)
                    }
                    value={value[name]}
                  />
                </div>
              ))}
              <div>
                <label>Founded date:</label>
                <input
                  required
                  type="date"
                  name="foundedDate"
                  value={
                    value.foundedDate
                      ? new Date(value?.foundedDate).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setValue({ ...value, foundedDate: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <label style={{ display: "block" }}>Description:</label>
              <textarea
                onChange={(e) =>
                  handleValueChange(e.target.name, e.target.value)
                }
                type="text"
                name="description"
                style={{
                  width: "100%",
                  border: "3px solid black",
                  minHeight: "15rem",
                }}
                value={value.description}
              />
            </div>
            <div className="button-group">
              {components.CancelButton(handleCancel)}
              <input
                type="submit"
                className="button-main"
                value={state?.company ? "Update" : "Save"}
                style={{ marginLeft: "auto", height: "1.5rem" }}
              />
            </div>
          </fieldset>
        </div>
      </form>
    </>
  );
};

export default CreateOrEditCompany;
