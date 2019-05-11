export function getAll(url) {
  return fetch(url, {
    credentials: 'include',
  });
}

export function getById(url, Id) {
  return fetch(url + '/' + Id, {
    credentials: 'include',
  });
}

export function post(url, object) {
  return fetch(url, {
    body: JSON.stringify(object),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
  });
}

export function postForm(url, object) {
  var formBody = []
  for (var property in object) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(object[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch(url, {
    body: formBody,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept': '*/*',
    },
    method: 'POST',
    credentials: 'include',
  });
}

export function put(url, object) {
  return fetch(url, {
    body: JSON.stringify(object),
    headers: {
      'content-type': 'application/json',
    },
    method: 'PUT',
    credentials: 'include',
  });
}

export function deleteById(url, Id) {
  return fetch(url + 'delete/' + Id, {
    method: 'DELETE',
    credentials: 'include',
  });
}