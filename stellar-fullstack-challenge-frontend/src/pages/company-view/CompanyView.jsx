import { useEffect, useRef, useState } from "react";
import "./CompanyView.css";
import { useNavigate, useParams } from "react-router-dom";
import { companiesService } from "../../services/CompaniesService";
import { foundersService } from "../../services/FoundersService";
import { companyUtils } from "../../utils/CompanyUtils";
import { companiesHandlers } from "../../utils/CompaniesHandlers";
import { components } from "../../components/Components";
const CompanyView = ({ setCompanies }) => {
  const [company, setCompany] = useState({
    companyName: "",
    foundedDate: "",
    city: "",
    description: "",
  });
  const [founders, setFounders] = useState([]);
  const [addFounderInput, setAddFounderInput] = useState(false);
  const errorRef = useRef(null);
  const navigate = useNavigate();
  const { companyId } = useParams();
  const founderInputProps = [
    { label: "First Name", name: "firstName" },
    { label: "Last Name", name: "lastName" },
    { label: "title", name: "title" },
  ];
  const openFounderInput = () => setAddFounderInput(true);

  const { companyName, foundedDate, city, description } = company;

  const handleEditCompany = () =>
    navigate("/create-edit-company", { state: { company: company } });

  const handleCompanyDelete = async () => {
    setCompanies(await companiesService.deleteCompany(companyId));
    navigate("/");
  };
  const navigateToHome = () => navigate("/");

  const handleCancelAddFounder = () => setAddFounderInput(false);

  useEffect(() => {
    companiesService.getCompany(companyId, setCompany);
    foundersService.getFounders(companyId, setFounders);
  }, [companyId]);
  
  return (
    <>
      {/* {companyName ? ( */}
        <div className="viewLayout">
          <span className="companyName">{companyName}</span>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="companyDetails">
              <span>{companyUtils.formatDate(foundedDate)}</span>
              <span style={{ display: "flex", flexDirection: "row" }}>
                {city}, {company.state} <div className="divider" />
              </span>
              {components.Button("Home", navigateToHome)}
              {components.Button("Edit", handleEditCompany)}
              {components.Button("Delete", handleCompanyDelete)}
            </div>
          </div>
          <p className="companyDescription">{description}</p>
          <fieldset>
            <legend>Founders</legend>
            <div className="founderDetails">
              {founders?.length > 0 &&
                founders?.map(({ firstName, lastName, title }) => {
                  return (
                    <span key={`${firstName}${lastName}`}>
                      {`${firstName} ${lastName}`},{title}
                    </span>
                  );
                })}
              {components.Button("Add Founder", openFounderInput)}
            </div>
          </fieldset>
          {addFounderInput && (
            <form
              onSubmit={(e) =>
                companiesHandlers.addFounders(
                  e,
                  errorRef,
                  setFounders,
                  setAddFounderInput,
                  companyId
                )
              }
            >
              <fieldset>
                <legend>Add Founder</legend>
                <div className="addFounder">
                  {founderInputProps.map(({ label, name }) => {
                    return (
                      <div key={name}>
                        <label>{label}:</label>
                        <input required type="text" name={name} />
                      </div>
                    );
                  })}
                </div>
                <div id="error" name="error" className="error" ref={errorRef} />
                <div className="button-group">
                  {components.CancelButton(handleCancelAddFounder)}
                  <input
                    required
                    className="button-main"
                    value="save"
                    type="submit"
                  />
                </div>
              </fieldset>
            </form>
          )}
        </div>
      {/* ) : (
        <h2>No companies to display!</h2>
      )} */}
    </>
  );
};

export default CompanyView;
