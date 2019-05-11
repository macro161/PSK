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

export function getByParams(url, Param, Param2) {
  return fetch(url + '/' + Param + '/' + Param2, {
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