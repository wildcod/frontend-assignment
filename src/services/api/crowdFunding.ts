import ApiHandler from '.';

const BASE_URL =
  'https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master';

const api = new ApiHandler(BASE_URL);

export const fetchCrowdFunding = <T>() => {
  return api.get<T>('/frontend-assignment.json');
};
