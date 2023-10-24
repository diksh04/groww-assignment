export const httpWrapper = {
  get,
};

function get(url, queryParams) {
  const requestOptions = {
    method: "GET",
  };
  const newQueryParams = {
    ...queryParams,
    apikey: process.env.NEXT_PUBLIC_ALPHA_ADVANTAGE_API_KEY,
  };

  url =
    process.env.NEXT_PUBLIC_URL +
    url +
    "?" +
    new URLSearchParams(newQueryParams);
  return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    else if(data["Error Message"] !== undefined){
        const error = data["Error Message"];
        // console.log(error);
        return Promise.reject(error);
    }

    return data;
  });
}
