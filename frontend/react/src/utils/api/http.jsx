export function getAll(url) {
  return fetch(url, {
  });
}

export function getById(url, Id) {
  return fetch(url + Id, {
  });
}

export function getByParams(url, Param, Param2) {
  return fetch(url + Param + '/' + Param2, {
  });
}

export function post(url, object) {
  return fetch(url, {
    body: JSON.stringify(object),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  });
}

export function put(url, object) {
  return fetch(url, {
    body: JSON.stringify(object),
    headers: {
      'content-type': 'application/json',
    },
    method: 'PUT',
  });
}

export function deleteById(url, Id) {
  return fetch(url + 'delete/' + Id, {
    method: 'DELETE',
  });
}