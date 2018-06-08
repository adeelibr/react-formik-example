import axios from 'axios';

export default {
  onLogin: (username, password) => {
    let details = {
      username: username,
      password: password,
      grant_type: `password`,
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return axios({
      method: 'POST',
      url: 'http://144.217.243.144:9090/api/oauth2/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: formBody
    })
    .then(res => res.data)
    .catch(error => { throw error });
  },
  onGetUserInfo: (token) => {
    return axios('http://144.217.243.144:9090/api/user', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      },
    })
    .then(res => res.data)
    .catch(error => { throw error });
  }
}