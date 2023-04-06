import octokitInstance from './index';

const fetchEvents = (perPage = 25, page = 1) => {
  return octokitInstance.request(
    `GET /events?per_page=${perPage}&page=${page}`,
    {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    },
  );
};

export default fetchEvents;
