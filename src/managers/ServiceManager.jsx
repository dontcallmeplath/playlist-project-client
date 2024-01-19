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

export const pullUserAsset = (asset, token, id) => {
  return fetch(
    `http://localhost:8000/${asset}?creator_id=current&playlist_id=${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
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

export const updateAsset = (asset, token, data, pk) => {
  return fetch(`http://localhost:8000/${asset}/${pk}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    return res.json();
  });
};

export const deletePlaylistAsset = (token, pk) => {
  return fetch(`http://localhost:8000/playlist_episodes/${pk}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const deleteEpisodeAsset = (token, pk) => {
  return fetch(`http://localhost:8000/episode_tags/${pk}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const deleteTag = (token, pk) => {
  return fetch(`http://localhost:8000/tags/${pk}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });
};

// http://localhost:8000/playlist_episodes?creator_id=current&playlist_id=4
