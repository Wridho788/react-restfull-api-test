import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
// import MaterialReactTable from 'material-react-table';
import Pagination from './Pagination';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const DataTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  let PageSize = 5;

  const getUsers = async () => {
    try {
      let response = await axios.get(
        `https://jsonplaceholder.typicode.com/users`
      );
      setUsers(response.data);
      console.log(users);
    } catch (e) {
      console.log(e.message);
    }
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return users.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <TextField
        id='outlined-basic'
        label='Search Name'
        variant='outlined'
        sx={{ marginTop: '2rem', width: '80%', backgroud: 'white' }}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer
        component={Paper}
        sx={{ width: '80%', margin: '2rem auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table' data={users}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>USERNAME</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>WEBSITE</TableCell>
              <TableCell>PHONE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentTableData
              .filter((user) => user.name.toLowerCase().includes(search))
              .map((item, index) => {
                return (
                  <TableRow
                    key={index.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.website}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        className='pagination-bar'
        currentPage={currentPage}
        totalCount={users.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default DataTable;
