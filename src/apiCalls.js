const fetchApiData = (path) => {
  return fetch(`http://localhost:3001/api/v1/${path}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch(() => console.log(`${path} API Error!`));
};

const fetchData = () => {
  return Promise.all([
    fetchApiData("travelers"),
    fetchApiData("trips"),
    fetchApiData("destinations"),
  ]);
};

export default { fetchData };
