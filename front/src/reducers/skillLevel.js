let skillLvl = JSON.parse(localStorage.getItem("skillLevel"));
const initialState = skillLvl ? { skillLevel: true, skillLvl } : { skillLevel: false };

const saveSkillLevel = (state = initialState, action) => {
  let skillLevel = false;
  switch (action.type) {
    case "GETSKILLLEVEL":
      if (action.payload !== undefined) {
        localStorage.setItem("skillLevel", JSON.stringify(action.payload));
        skillLevel = true;
      }
      return {
        ...action.payload,
        skillLevel: skillLevel,
      };
    case "REMOVESKILLLEVEL":
      return {
        skillLevel: skillLevel,
      };
    default:
      return state;
  }
};

export default saveSkillLevel;