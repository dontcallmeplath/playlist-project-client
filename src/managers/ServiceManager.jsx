export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8000/users?email=${email}`).then((res) =>
    res.json()
  );
};

export const updateUser = (user, userId, token) => {
  return fetch(`http://localhost:8000/users/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

export const pullUserAssets = (asset, token) => {
  return fetch(`http://localhost:8000/${asset}?creator_id=current`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res.json();
  });
};

export const pullAsset = (asset, token) => {
  return fetch(`http://localhost:8000/${asset}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const postAsset = (asset, token, data) => {
  return fetch(`http://localhost:8000/${asset}`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    return res.json();
  });
};

// http://localhost:8000/playlist_episodes?creator_id=current&playlist_id=4
