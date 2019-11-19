let educationLvl = JSON.parse(localStorage.getItem("educationLevel"));
const initialState = educationLvl ? { educationLevel: true, educationLvl } : { educationLevel: false };

const saveEducationLevel = (state = initialState, action) => {
  let educationLevel = false;
  switch (action.type) {
    case "GETEDUCATIONLEVEL":
      if (action.payload !== undefined) {
        localStorage.setItem("educationLevel", JSON.stringify(action.payload));
        educationLevel = true;
      }
      return {
        ...action.payload,
        educationLevel: educationLevel,
      };
    case "REMOVEEDUCATIONLEVEL":
      return {
        educationLevel: educationLevel,
      };
    default:
      return state;
  }
};

export default saveEducationLevel;