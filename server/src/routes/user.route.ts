import express, { Request, Response } from 'express';

const router = express.Router();
/*const users = [
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
];*/

const users = [
  {
    name: 'Jorn',
    id: 0,
    department: 'IT',
    dateHired: new Date('2022-09-02T16:27:24.999Z'),
  },
  {
    name: 'Markus',
    id: 3,
    department: 'HR',
    dateHired: new Date('2023-01-24T16:27:24.999Z'),
  },
  {
    name: 'Andrew',
    id: 2,
    department: 'HR',
    dateHired: new Date('2022-03-22T16:27:24.999Z'),
  },
  {
    name: 'Ori',
    id: 4,
    department: 'FINANCE',
    dateHired: new Date('2019-07-04T16:27:24.999Z'),
  },
  {
    name: 'Mike',
    id: 1,
    department: 'IT',
    dateHired: new Date('2010-12-16T16:27:24.999Z'),
  },
];

const sortFunctions = (sortField: string, sortOrder: string) => {
  console.log(sortField);
  if (sortOrder === 'asc') {
    console.log('Sorting Ascending');
    return [...users].sort((a, b) => {
      if (a[sortField as keyof typeof a] < b[sortField as keyof typeof b])
        return -1;
      if (a[sortField as keyof typeof a] > b[sortField as keyof typeof b])
        return 1;
      return 0;
    });
  } else {
    let descSortField = sortField.slice(1);
    return [...users].sort((a, b) => {
      if (
        a[descSortField as keyof typeof a] > b[descSortField as keyof typeof b]
      )
        return -1;
      if (
        a[descSortField as keyof typeof a] < b[descSortField as keyof typeof b]
      )
        return 1;
      return 0;
    });
  }
};

router.get('/', (req: Request, res: Response) => {
  console.log('GET /api/users');
  //Parse parameters
  const size = Number.isNaN(parseInt(req.query.size as string))
    ? 10
    : parseInt(req.query.size as string);

  const page = Number.isNaN(parseInt(req.query.size as string))
    ? 1
    : parseInt(req.query.page as string);

  const sortField = (req.query.sortField as string) || 'id';
  console.log(`size: ${size}, page: ${page}, sortField: ${sortField}`);

  //Input validation
  if (isNaN(size) || size <= 0) {
    return res
      .status(400)
      .json({ error: 'Invalid size parameter. Must be a positive integer.' });
  }

  if (isNaN(page) || page <= 0) {
    return res
      .status(400)
      .json({ error: 'Invalid page parameter. Must be a positive integer.' });
  }

  const validFields = Object.keys(users[0]);

  let sortOrder = 'asc';

  if (validFields.includes(sortField)) {
  } else if (validFields.includes(sortField.slice(1))) {
    sortOrder = sortField.slice(1);
  } else {
    return res.status(400).json({
      error: `Invalid sortField. Must be one of: ${validFields.join(', ')}`,
    });
  }
  //Pagination
  const totalResults = users.length;
  const maxPage = Math.ceil(totalResults / size);
  const start = (page - 1) * size;
  const end = start + size;

  if (page > maxPage) {
    return res.status(400).json({
      error: `Invalid page parameter. Maximum page for size=${size} is ${maxPage}.`,
    });
  }

  //Sorting
  const sortedUsers = sortFunctions(sortField, sortOrder);
  console.log('Sorted Users:');
  console.log(sortedUsers);
  console.log('--------------------');

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
