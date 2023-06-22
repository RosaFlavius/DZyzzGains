import "./styles.css";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Chip, Grid, IconButton } from "@mui/material";

export default function UserList() {
  const [components, setComponents] = useState([]);
  const [isUpdate, setIsUpdated] = useState(false);

  const fetchUsers = async () => {
    const usr = await axios
      .get("https://localhost:7177/api/User")
      .catch((e) => console.log(e));
    const users = [];
    for (const iterator of usr.data) {
      const user = {
        id: iterator.id,
        firstName: iterator.firstName,
        lastName: iterator.lastName,
        email: iterator.email,
        password: iterator.password,
        dateOfBirth: iterator.dateOfBirth,
        phone: iterator.phone,
        country: iterator.country,
        city: iterator.city,
        address: iterator.address,
        admin: iterator.admin,
      };
      users.push(user);
    }
    setComponents(users);
  };

  const handleDelete = async (id) => {
    setIsUpdated(true);
    await axios
      .delete(`https://localhost:7177/api/User/${id}`)
      .catch((e) => console.log(e));
    setIsUpdated(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [isUpdate]);

  const columns = [
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "name",
      headerName: "Name",
      renderCell: (params) => {
        return (
          <span>
            {params.row.lastName} {params.row.firstName}
          </span>
        );
      },
      width: 180,
    },
    {
      field: "dateOfBirth",
      headerName: "DateOfBirth",
      width: 120,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 120,
    },
    {
      field: "address",
      headerName: "Address",
      renderCell: (params) => {
        return (
          <span>
            {params.row.city} | {params.row.country} | {params.row.address}
          </span>
        );
      },
      width: 430,
    },
    {
      field: "admin",
      headerName: "IsAdmin",
      renderCell: (params) => {
        return (
          <Chip
            label={params.row.admin ? "Yes" : "No"}
            className={params.row.admin ? "chip-inStock" : "chip-outOfStock"}
          />
        );
      },
      width: 110,
    },

    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <div>
            <Link to={"/admin/admin_user/" + params.row.id}>
              <Button variant="contained" className="productListEdit">
                Edit
              </Button>
            </Link>
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <DeleteOutline className="productListDelete" />
            </IconButton>
          </div>
        );
      },
    },
  ];

  return (
    <Grid container spacing={3} className="users-layout-data-grid">
      <Grid item xs={12} sm={5} lg={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} sm={7} lg={9}>
        <DataGrid
          rows={components}
          disableSelectionOnClick
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[10]}
          className="data-grid-users"
        />
      </Grid>
    </Grid>
  );
}
