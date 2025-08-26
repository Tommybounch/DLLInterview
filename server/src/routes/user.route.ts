import express, { Request, Response } from 'express';

const router = express.Router();
const users = [
  {
    name: 'Jorn',
    id: 0,
  },
  {
    name: 'Markus',
    id: 3,
  },
  {
    name: 'Andrew',
    id: 2,
  },
  {
    name: 'Ori',
    id: 4,
  },
  {
    name: 'Mike',
    id: 1,
  },
];

router.get('/', (req: Request, res: Response) => {
  console.log('GET /api/users');
  //Parse parameters
  const size = parseInt(req.query.size as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  const sortField = (req.query.sortField as string) || 'id';
  console.log(`size: ${size}, page: ${page}, sortField: ${sortField}`);

  //Pagination
  const totalResults = users.length;
  const start = (page - 1) * size;
  const end = start + size;

  //Sorting
  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortField as keyof typeof a] < b[sortField as keyof typeof b])
      return -1;
    if (a[sortField as keyof typeof a] > b[sortField as keyof typeof b])
      return 1;
    return 0;
  });

  const paginatedUsers = sortedUsers.slice(start, end);

  //Build paging URLs
  const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
  const paging: { previous?: string; next?: string; totalResults: number } = {
    totalResults,
  };
  if (page > 1) {
    paging.previous = `${baseUrl}?size=${size}&page=${
      page - 1
    }&sortField=${sortField}`;
  }
  if (end < totalResults) {
    paging.next = `${baseUrl}?size=${size}&page=${
      page + 1
    }&sortField=${sortField}`;
  }

  console.log(paginatedUsers);
  console.log(paging);
  res.json({ data: paginatedUsers, paging });
});

export default router;
