let path_css = JSON.parse(localStorage.getItem("cssPath"));
const initialState = path_css ? { pathCss: true, path_css } : { pathCss: false, path_css: './classic.css' };

const saveCssPath = (state = initialState, action) => {
  let pathCss = false;
  switch (action.type) {
    case "CSSPATH":
      if (action.payload !== undefined) {
        localStorage.setItem("cssPath", JSON.stringify(action.payload));
        console.log(action.payload)
        pathCss = true;
      }
      return {
        css_path: action.payload,
        pathCss: pathCss,
      };
    case "REMOVECSSPATH":
      return {
        pathCss: pathCss,
      };
    default:
      return state;
  }
};

export default saveCssPath;