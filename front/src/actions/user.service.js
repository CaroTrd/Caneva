export const userService = {
  logout
};

function logout(item){
  localStorage.removeItem(`${item}`)
}