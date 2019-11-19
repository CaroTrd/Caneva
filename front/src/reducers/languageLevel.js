let languageLvl = JSON.parse(localStorage.getItem("languageLevel"));
const initialState = languageLvl ? { languageLevel: true, languageLvl } : { languageLevel: false };

const saveLanguageLevel = (state = initialState, action) => {
  let languageLevel = false;
  switch (action.type) {
    case "GETLANGUAGELVEL":
      if (action.payload !== undefined) {
        localStorage.setItem("languageLevel", JSON.stringify(action.payload));
        languageLevel = true;
      }
      return {
        ...action.payload,
        languageLevel: languageLevel,
      };
    case "REMOVELANGUAGELVEL":
      return {
        languageLevel: languageLevel,
      };
    default:
      return state;
  }
};

export default saveLanguageLevel;
