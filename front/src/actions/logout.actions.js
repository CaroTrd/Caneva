import { userService } from './user.service'
export const removeIdUser = (login) => {
  userService.logout('user');
  return ({
    type: 'REMOVEIDUSER',
    payload: login,
  })
}

