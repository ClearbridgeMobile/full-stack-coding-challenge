import { useNavigate } from "react-router-dom";
import "./CompaniesView.css";
import { components } from "../../components/Components";
const CompaniesView = ({ companies }) => {
  const navigate = useNavigate();
  const handleViewCompany = (id) => navigate(`/company-view/${id}`);
  const handleAddCompany = () => navigate("/create-edit-company");

  return (
    <>
      {companies.length > 0 &&
        companies.map(
          ({ companyName, city, state, description, companyId }, index) => {
            return (
              <div key={index} className="cardLayout">
                <div className="cardTitleSection">
                  <span style={{ fontSize: "x-large", fontWeight: "bold" }}>
                    {companyName}
                  </span>
                  <div className="companyLocation">
                    <div className="divider" />
                    <span className="location">
                      {city},{state}
                    </span>
                  </div>
                  <button
                    title={companyId}
                    className="moreButton"
                    onClick={() => handleViewCompany(companyId)}
                  >
                    more..
                  </button>
                </div>
                <p className="companyDescription truncate">{description}</p>
              </div>
            );
          }
        )}
      <span className="footer">
        {components.Button("Add company", handleAddCompany)}
      </span>
    </>
  );
};

export default CompaniesView;
