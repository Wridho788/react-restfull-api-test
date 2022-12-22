import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import MaterialReactTable from 'material-react-table';

const DataTable = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      let response = await axios.get(
        `https://jsonplaceholder.typicode.com/users`
      );
      setUsers(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'username',
      header: 'Username',
    },
    {
      accessorKey: 'website',
      header: 'Website',
    },
  ]);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <MaterialReactTable
        columns={columns}
        data={users}
        enableRowActions
        enableRowSelection
      />
    </div>
  );
};

export default DataTable;
