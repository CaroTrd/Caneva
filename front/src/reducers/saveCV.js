let cv = JSON.parse(localStorage.getItem("cv"));
const initialState = cv ? { curriculumVitae: true, cv } : { curriculumVitae: false };

const saveAllCurriculumVitae = (state = initialState, action) => {
  let curriculumVitae = false;
  switch (action.type) {
    case "GETCV":
      if (action.payload !== undefined) {
        localStorage.setItem("cv", JSON.stringify(action.payload));
        curriculumVitae = true;
      }
      return {
        ...action.payload,
        curriculumVitae: curriculumVitae,
      };
    case "REMOVECV":
      return {
        curriculumVitae: curriculumVitae,
      };
    default:
      return state;
  }
};

export default saveAllCurriculumVitae;
