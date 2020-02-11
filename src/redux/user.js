export const login = (username, password) => ({
  type: 'LOGIN',
  username, 
  password
});

export const logout = () => ({
  type: 'LOGOUT'
});


const user = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return [
        action.username,
        action.password
      ];
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
}

export default user;
