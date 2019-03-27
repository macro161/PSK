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
    credentials: 'include',
    method: 'POST',
  });
}

export function put(url, object) {
  return fetch(url, {
    body: JSON.stringify(object),
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
    method: 'PUT',
  });
}

export function deleteById(url, Id) {
  return fetch(url + '/' + Id, {
    method: 'DELETE',
    credentials: 'include',
  });
}