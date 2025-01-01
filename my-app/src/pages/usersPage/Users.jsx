import styles from "./Users.module.css";
import React, { useEffect, useState } from "react";
import {
  DataGrid,
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
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
function CustomToolbar() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };
  return (
    <GridToolbarContainer>
      <Button
        sx={{
          width: "25%",
          fontSize: "1rem",
          fontWeight: "bold",
          borderRadius: "8px",
          border: "2px solid #1976d2",
          padding: "8px 24px",
          color: "#1976d2",
          backgroundColor: "transparent",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#1976d2",
            color: "#fff",
            borderColor: "#1976d2",
          },
          "&:active": {
            backgroundColor: "#1565c0",
            borderColor: "#1565c0",
          },
        }}
        color="primary"
        startIcon={<GroupAddIcon />}
        onClick={handleClick}
      >
        Add User
      </Button>

      <GridToolbarQuickFilter
        sx={{
          width: "35%",
          "& .MuiInputBase-root": {
            borderRadius: "8px",
            border: "2px solid #1976d2",
            padding: "8px 16px",
            boxShadow: "none",
          },
          "& .MuiInputBase-root:hover": {
            outline: "none",
          },
          "& .MuiSvgIcon-root": {
            color: "#1976d2",
            fontSize: "1.5rem",
            marginRight: "8px",
          },
          overflow: "hidden",
        }}
      />
    </GridToolbarContainer>
  );
}

export default function Users() {
  const API_BASE_URL = "http://127.0.0.1:5000/auth";
  const [users, setUsers] = React.useState([]);
  const [editedRow, setEditedRow] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Fetch data from API
  const fetchData = async (url, method = "GET", body = null) => {
    const accessToken = localStorage.getItem("access_token");

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${accessToken}`, // Ensure the token is correctly formatted
        },        body: body ? JSON.stringify(body) : null,
      });
      if (!response.ok) throw new Error("حدث خطأ أثناء العملية");
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  

  // Handle edit click
  const handleEditClick = (id) => {
    const row = users.find((row) => row.id === id);
    setEditedRow({ ...row });
  };

  // Save changes to a user
  const handleSave = async (id) => {
    const updatedRows = users.map((row) =>
      row.id === id ? { ...row, ...editedRow } : row // تحديث المستخدم المُعدل
    );
    setUsers(updatedRows); // تحديث الواجهة
  
    try {
      await fetchData(`http://localhost:3001/users/${id}`, "PUT", editedRow); // تحديث البيانات في الـ API
      setOpenSnackbar(true); // عرض إشعار النجاح
    } catch (error) {
      console.error("حدث خطأ أثناء تحديث البيانات:", error);
    }
  
    setEditedRow(null); // إخفاء النافذة بعد التحديث
  };
  

  // Delete a user
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!isConfirmed) return;
  
    try {
      await fetchData(`${API_BASE_URL}/users/${id}`, "DELETE");
      setUsers((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("An error occurred while deleting the user: ", error);
    }
  };
  

  const columns = [
    {
      field: "id",
      headerName: "#",
      width: 100,
    },
    {
      field: "username",
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
              value={editedRow.username}
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
      field: "job_name",
      headerName: "Role",
      flex: 1,
      renderCell: (params) => {
        if (editedRow && editedRow.id === params.id) {
          return (
            <Select
              value={editedRow.job_name || ""}
              onChange={(e) =>
                setEditedRow({ ...editedRow, job_name: e.target.value })
              }
              displayEmpty
              sx={{
                width: "100%",
                fontSize: "1rem",
              }}
            >
              <MenuItem value="Developer">Developer</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
            </Select>
          );
        }
        return params.value;
      },
    },
    {
      field: "phone_number",
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
              value={editedRow.phone_number}
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
                  <CancelIcon
                    sx={{
                      color: "red",
                    }}
                  />
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
                <ClearOutlinedIcon
                  sx={{
                    color: "red",
                  }}
                />
              </button>
            </div>
          </>
        );
      },
    },
  ];

  // Data
  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("access_token");
      try {
        if (!accessToken) {
          console.error("Access token not found");
          return;
        }

        const response = await fetch("http://127.0.0.1:5000/auth/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Ensure the token is correctly formatted
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (isMounted) {
          setUsers(data); // Assuming the response contains user data
        }
      } catch (error) {
        if (isMounted) {
          console.error("حدث خطأ:", error);
        }
      }
    };

    fetchUserData();

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.head}>Employee Management</h1>

      {/* Button to Add User */}

      <DataGrid
        rows={users}
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
          "& .MuiDataGrid-toolbarContainer": {
            paddingBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#f7f7f7",
          },
          "& .MuiDataGrid-virtualScroller": {
            border: "1px solid #ddd",
            borderRadius: "4px",
          },
          "& .MuiDataGrid-cell": {
            border: "1px solid #ddd",
          },
          "&.MuiDataGrid-row:hover": {
            backgroundColor: "#f7f7f7",
          },
          "& .MuiDataGrid-columnSeparator": {},
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          backgroundColor: "white",
          border: "none",
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
