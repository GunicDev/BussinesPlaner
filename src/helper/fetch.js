export const postDay = async (url, key, data) => {
  const response = await fetch(`${url}/${key}.json`, {
    method: "PUT", // Use PUT to set the data at the specified key
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

  const transformedData = Object.values(data);

  return transformedData;
};

export const postTask = async (url, key, newData) => {
  const response = await fetch(`${url}/${key}.json`, {
    method: "PUT", // Use PUT to set the data at the specified key
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });

  if (!response.ok) {
    throw new Error("Failed to post task");
  }

  const data = await response.json();
  console.log(data, "postDay");
  return data;
};
