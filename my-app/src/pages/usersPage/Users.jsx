import styles from "./Users.module.css";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import {
  TextField,
  Snackbar,
  Alert,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
const apiURL = "http://localhost:3001/users";

function CustomToolbar() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };
  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Button
        sx={{
          display: "flex",
        }}
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClick}
      >
        Add User
      </Button>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

const fakeData = [
  {
    id: 1,
    name: "Esraa",
    email: "esraa@gmail.com",
    job: "developer",
    phone: "01146815591",
    password: "123456",
  },
  {
    id: 2,
    name: "Galal",
    email: "galal@gmail.com",
    job: "manager",
    phone: "01146815592",
    password: "123456",
  },
  {
    id: 1,
    name: "Esraa",
    email: "esraa@gmail.com",
    job: "developer",
    phone: "01146815591",
    password: "123456",
  },
  {
    id: 1,
    name: "Esraa",
    email: "esraa@gmail.com",
    job: "developer",
    phone: "01146815591",
    password: "123456",
  },
  {
    id: 1,
    name: "Esraa",
    email: "esraa@gmail.com",
    job: "developer",
    phone: "01146815591",
    password: "123456",
  },
  {
    id: 1,
    name: "Esraa",
    email: "esraa@gmail.com",
    job: "developer",
    phone: "01146815591",
    password: "123456",
  },
  {
    id: 1,
    name: "Esraa",
    email: "esraa@gmail.com",
    job: "developer",
    phone: "01146815591",
    password: "123456",
  },
  {
    id: 1,
    name: "Esraa",
    email: "esraa@gmail.com",
    job: "developer",
    phone: "01146815591",
    password: "123456",
  },
  {
    id: 1,
    name: "Esraa",
    email: "esraa@gmail.com",
    job: "developer",
    phone: "01146815591",
    password: "123456",
  },
  {
    id: 1,
    name: "Esraa",
    email: "esraa@gmail.com",
    job: "developer",
    phone: "01146815591",
    password: "123456",
  },
  {
    id: 1,
    name: "Esraa",
    email: "esraa@gmail.com",
    job: "developer",
    phone: "01146815591",
    password: "123456",
  },
  {
    id: 1,
    name: "Esraa",
    email: "esraa@gmail.com",
    job: "developer",
    phone: "01146815591",
    password: "123456",
  },
  {
    id: 1,
    name: "Esraa",
    email: "esraa@gmail.com",
    job: "developer",
    phone: "01146815591",
    password: "123456",
  },
  {
    id: 1,
    name: "Esraa",
    email: "esraa@gmail.com",
    job: "developer",
    phone: "01146815591",
    password: "123456",
  },
  {
    id: 1,
    name: "Esraa",
    email: "esraa@gmail.com",
    job: "developer",
    phone: "01146815591",
    password: "123456",
  },
  {
    id: 1,
    name: "Esraa",
    email: "esraa@gmail.com",
    job: "developer",
    phone: "01146815591",
    password: "123456",
  },
];

export default function Users() {
  const [users, setUsers] = React.useState([]);
  const [editedRow, setEditedRow] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Fetch data from API
  const fetchData = async (url, method = "GET", body = null) => {
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : null,
      });
      if (!response.ok) throw new Error("حدث خطأ أثناء العملية");
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  // Handle edit click
  const handleEditClick = (id) => {
    const row = fakeData.find((row) => row.id === id);
    setEditedRow({ ...row });
  };

  // Save changes to a user
  const handleSave = async (id) => {
    const updatedRows = users.map((row) =>
      row.id === id ? { ...row, ...editedRow } : row
    );
    setUsers(updatedRows);

    try {
      await fetchData(`http://localhost:3001/users/${id}`, "PUT", editedRow);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("حدث خطأ أثناء تحديث البيانات:", error);
    }

    setEditedRow(null);
  };

  // Delete a user
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!isConfirmed) return;

    try {
      await fetchData(`http://localhost:3001/users/${id}`, "DELETE");
      setUsers((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("An error occurred while deleting the user: ", error);
    }
  };

  const columns = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   width: 100,
    // },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        if (editedRow && editedRow.id === params.id) {
          return (
            <TextField
              sx={{
                marginY: 0.2,
              }}
              className={styles.textField}
              value={editedRow.name}
              onChange={(e) =>
                setEditedRow({ ...editedRow, name: e.target.value })
              }
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
              slotProps={{
                input: {
                  classes: { input: styles.centeredInput },
                },
              }}
            />
          );
        }
        return params.value;
      },
    },
    {
      field: "email",
      headerName: "Gmail",
      flex: 1,
      renderCell: (params) => {
        if (editedRow && editedRow.id === params.id) {
          return (
            <TextField
              sx={{
                marginY: 0.2,
              }}
              className={styles.textField}
              value={editedRow.email}
              onChange={(e) =>
                setEditedRow({ ...editedRow, email: e.target.value })
              }
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
              slotProps={{
                input: {
                  classes: { input: styles.centeredInput },
                },
              }}
            />
          );
        }
        return params.value;
      },
    },
    {
      field: "job",
      headerName: "Job",
      flex: 1,
      renderCell: (params) => {
        if (editedRow && editedRow.id === params.id) {
          return (
            <Select
              value={editedRow.job || ""}
              onChange={(e) =>
                setEditedRow({ ...editedRow, job: e.target.value })
              }
              displayEmpty
              sx={{
                width: "100%",
                fontSize: "1rem",
              }}
            >
              <MenuItem value="developer">developer</MenuItem>
              <MenuItem value="manager">manager</MenuItem>
              <MenuItem value="it">IT</MenuItem>
            </Select>
          );
        }
        return params.value;
      },
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        if (editedRow && editedRow.id === params.id) {
          return (
            <TextField
              sx={{
                marginY: 0.2,
              }}
              className={styles.textField}
              value={editedRow.phone}
              onChange={(e) =>
                setEditedRow({ ...editedRow, phone: e.target.value })
              }
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
              slotProps={{
                input: {
                  classes: { input: styles.centeredInput },
                },
              }}
            />
          );
        }
        return params.value;
      },
    },
    {
      field: "password",
      headerName: "Password",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        if (editedRow && editedRow.id === params.id) {
          return (
            <TextField
              sx={{
                marginY: 0.2,
              }}
              className={styles.textField}
              value={editedRow.password}
              onChange={(e) =>
                setEditedRow({ ...editedRow, password: e.target.value })
              }
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
              slotProps={{
                input: {
                  classes: { input: styles.centeredInput },
                },
              }}
            />
          );
        }
        return params.value;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      headerClassName: styles.actionsColumn,
      cellClassName: styles.actionsColumn,
      renderCell: (params) => {
        if (editedRow && editedRow.id === params.id) {
          return (
            <>
              <div className={styles.iconBtnContainer}>
                <button
                  className={styles.iconBtn}
                  onClick={() => handleSave(params.id)}
                >
                  <SaveIcon />
                </button>
                <button
                  className={styles.iconBtn}
                  onClick={() => setEditedRow(null)}
                >
                  <CancelIcon />
                </button>
              </div>
            </>
          );
        }
        return (
          <>
            <div className={styles.iconBtnContainer}>
              <button
                className={styles.iconBtn}
                onClick={() => handleEditClick(params.id)}
              >
                <EditIcon />
              </button>
              <button
                className={styles.iconBtn}
                onClick={() => handleDelete(params.id)}
              >
                <DeleteIcon />
              </button>
            </div>
          </>
        );
      },
    },
  ];

  // Data
  // useEffect(() => {
  //   fetchData("http://localhost:3001/users")
  //     .then(setUsers)
  //     .catch((error) => console.error("حدث خطأ:", error));
  // }, []);

  return (
    <div className={styles.container}>
          <h1 className={styles.head}>System Users</h1>

      {/* Button to Add User */}

      <DataGrid
        rows={fakeData}
        columns={columns.map((col) => ({
          ...col,
          align: "center",
          headerAlign: "center",
          headerClassName: styles.headerCell,
        }))}
        rowHeight={62}
        editMode="row"
        onCellDoubleClick={(params, event) => {
          event.stopPropagation();
        }}
        slots={{
          toolbar: CustomToolbar,
        }}
        sx={{
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          backgroundColor: "white"
        }}
        hideFooter={true}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Changes saved successfully
        </Alert>
      </Snackbar>
    </div>
  );
}