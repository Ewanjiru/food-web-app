import jwtDecode from 'jwt-decode';

const decodeToken = () => {
  const rawToken = document.cookie.split('jwt-token=');
  console.log('raw', rawToken);
  
  if (rawToken.length === 2) {
    const userInfo = jwtDecode(rawToken[1]).UserInfo;
    return userInfo;
  }
 return { error: 'Unknown user'};

};

export default decodeToken;
