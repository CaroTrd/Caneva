export * from "./login.actions";
export * from "./logout.actions";

export const cssPath = (select) => ({
  type: 'CSSPATH',
  payload: select
})

export const removeCssPath = (cssPath) => {
  localStorage.removeItem('cssPath');
  return ({
    type: 'REMOVECSSPATH',
    payload: cssPath,
  })
}

export const getCv = (select) => ({
  type: 'GETWORK',
  payload: select,
})

export const removeCv = (cv) => {
  localStorage.removeItem('cv');
  return ({
    type: 'REMOVECV',
    payload: cv,
  })
}

export const languageLevel = () => {
  return dispatch => {
      fetch('/api/curriculum/language-level')
          .then(response => response.json())
          .then(data => { dispatch(getLanguageLevel(data)) }
          )
  }
}

export const getLanguageLevel = (select) => ({
  type: 'GETLANGUAGELVEL',
  payload: select,
})

export const removeLanguageLevel = (langLvl) => {
  localStorage.removeItem("languageLevel");
  return ({
    type: 'REMOVELANGUAGELVEL',
    payload: langLvl,
  })
}

export const educationLevel = () => {
  return dispatch => {
      fetch('/api/curriculum/education-level')
          .then(response => response.json())
          .then(data => { dispatch(getEducationLevel(data)) }
          )
  }
}

export const getEducationLevel = (select) => ({
  type: 'GETEDUCATIONLEVEL',
  payload: select,
})

export const removeEducationLevel = (select) => {
  localStorage.removeItem("educationLevel");
  return ({
    type: 'REMOVEEDUCATIONLEVEL',
    payload: select,
  })
}

export const skillLevel = () => {
  return dispatch => {
      fetch('/api/curriculum/skill-level')
          .then(response => response.json())
          .then(data => {dispatch(getSkillLevel(data)) }
          )
  }
}

export const getSkillLevel = (select) => ({
  type: 'GETSKILLLEVEL',
  payload: select,
})

export const removeSkillLevel = (select) => {
  localStorage.removeItem("skillLevel");
  return ({
    type: 'REMOVESKILLLEVEL',
    payload: select,
  })
}

