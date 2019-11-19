let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedInUser: true, user } : { loggedInUser: false };

const idUser = (state = initialState, action) => {
  switch (action.type) {
    case "SAVEIDUSER":
      let loggedInUser = false;
      if (action.payload !== undefined) {
        localStorage.setItem("user", JSON.stringify(action.payload));
        loggedInUser = true;
      }
      return {
        loggedInUser: loggedInUser,
        user: action.payload
      };
    case "REMOVEIDUSER":
      return {
        loggedInUser: false,
        user: action.payload
      };
    default:
      return state;
  }
};

export default idUser;

