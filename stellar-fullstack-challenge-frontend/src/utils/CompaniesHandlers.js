import { companiesService } from "../services/CompaniesService";
import { foundersService } from "../services/FoundersService";

const handleSaveCompany = async (e, setCompanies, navigate) => {
  const element = e.target;
  const newCompany = await companiesService.addCompany({
    companyName: element.companyName.value,
    state: element.state.value,
    city: element.city.value,
    foundedDate: element.foundedDate.value,
    description: element.description.value,
  });
  if (newCompany) {
    setCompanies(newCompany);
    navigate("/");
  }
};

const handleUpdateCompany = async (e, setValue, navigate, companyId) => {
  const element = e.target;
  const updatedCompany = 
    await companiesService.updateCompany({
      companyName: element.companyName.value,
      state: element.state.value,
      city: element.city.value,
      foundedDate: element.foundedDate.value,
      description: element.description.value,
      companyId: companyId,
    });
    console.log("handleUpdateCompany", updatedCompany);
  if (updatedCompany) setValue(updatedCompany);
  navigate(`/company-view/${companyId}`);
};

const addFounders = async (
  e,
  errorRef,
  setFounders,
  setAddFounderInput,
  companyId
) => {
  e.preventDefault();
  const element = e.target;
  const data = {
    firstName: element.firstName.value,
    lastName: element.lastName.value,
    title: element.title.value,
  };
  const errElement = errorRef.current;
  if (await foundersService.validateFounder(data)) {
    await foundersService.addFounders({ ...data, companyId }, setFounders);
    setAddFounderInput(false);
    errElement.textContent = "";
  } else {
    errElement.textContent = "Founder already exists!";
  }
};
export const companiesHandlers = {
  handleSaveCompany,
  handleUpdateCompany,
  addFounders,
};
