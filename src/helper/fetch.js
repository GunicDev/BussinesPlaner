export const postDay = async (url, key, data) => {
  const response = await fetch(`${url}/${key}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to post data");
  }
  return await response.json();
};

export const allDays = async (url) => {
  const response = await fetch(`${url}.json`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();

  if (data === null || data === undefined) {
    return data;
  }

  const transformedData = Object.values(data);

  return transformedData;
};

export const postTask = async (url, dayId, key, newTask) => {
  const response = await fetch(`${url}/${dayId}/${key}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });

  if (!response.ok) {
    throw new Error("Failed to post task");
  }

  const data = await response.json();

  return data;
};
