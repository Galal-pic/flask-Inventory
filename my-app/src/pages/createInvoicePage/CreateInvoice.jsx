import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import logo from "./logo.png";

export default function Type1() {
  const [user, setUser] = useState({});
  const rowRefs = useRef([]);

  // getUserName
  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.error("No access token found.");
        return;
      }
      try {
        const response = await fetch("http://127.0.0.1:5000/auth/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserData();
  }, []);

  const [rows, setRows] = useState([
    {
      counter: 1,
      itemsBar: "",
      itemName: "",
      quantity: "",
      price: "",
      description: "",
      total: 0,
    },
  ]);
  const [machineName, setMachineName] = useState("");
  const [machineInfo, setMachineInfo] = useState("");
  const [mechanismName, setMechanismName] = useState("");
  const [mechanismInfo, setMechanismInfo] = useState("");
  const [items, setItems] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [warehouseManager, setWarehouseManager] = useState("");
  const [comment, setComment] = useState("");
  const [showCommentField, setShowCommentField] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackBarType, setSnackBarType] = useState("");

  const operationTypes = [
    "إضافة/Add",
    "صرف/Withdraw",
    "أمانات/Deposits",
    "مرتجع/Return",
    "توالف/Scrap",
    "حجز/Reservation",
    "رصيد افتتاحي/Opening Balance",
  ];
  const [operationType, setOperationType] = useState(operationTypes[0]);
  const handleAddComment = () => {
    setShowCommentField(true);
  };

  const handleCancelComment = () => {
    setShowCommentField(false);
    setComment("");
  };

  // Handle Sticky
  useEffect(() => {
    rowRefs.current = rows.map(() =>
      Array(6)
        .fill(null)
        .map(() => React.createRef())
    );
  }, [rows]);
  const handleKeyDown = (e, rowIndex, cellIndex) => {
    const numberOfCells = 6;
    const totalRows = rows.length;

    if (e.key === "Enter") {
      e.preventDefault();
      if (rowIndex + 1 < totalRows) {
        if (
          rowRefs.current[rowIndex + 1] &&
          rowRefs.current[rowIndex + 1][0] &&
          rowRefs.current[rowIndex + 1][0].current
        ) {
          rowRefs.current[rowIndex + 1][0].current.focus();
        } else {
          console.error("Ref not defined for row:", rowIndex + 1, "cell: 0");
        }
      } else {
        addRow();
        setTimeout(() => {
          if (
            rowRefs.current[totalRows] &&
            rowRefs.current[totalRows][0] &&
            rowRefs.current[totalRows][0].current
          ) {
            rowRefs.current[totalRows][0].current.focus();
          } else {
            console.error("Ref not defined for new row:", totalRows, "cell: 0");
          }
        }, 50);
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const nextCellIndex = cellIndex + 1;
      if (nextCellIndex < numberOfCells) {
        if (
          rowRefs.current[rowIndex][nextCellIndex] &&
          rowRefs.current[rowIndex][nextCellIndex].current
        ) {
          rowRefs.current[rowIndex][nextCellIndex].current.focus();
        } else {
          console.error(
            "Ref not defined for row:",
            rowIndex,
            "cell:",
            nextCellIndex
          );
        }
      }
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      const prevCellIndex = cellIndex - 1;
      if (prevCellIndex >= 0) {
        if (
          rowRefs.current[rowIndex][prevCellIndex] &&
          rowRefs.current[rowIndex][prevCellIndex].current
        ) {
          rowRefs.current[rowIndex][prevCellIndex].current.focus();
        } else {
          console.error(
            "Ref not defined for row:",
            rowIndex,
            "cell:",
            prevCellIndex
          );
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (rowIndex + 1 < totalRows) {
        if (
          rowRefs.current[rowIndex + 1] &&
          rowRefs.current[rowIndex + 1][cellIndex] &&
          rowRefs.current[rowIndex + 1][cellIndex].current
        ) {
          rowRefs.current[rowIndex + 1][cellIndex].current.focus();
        } else {
          console.error(
            "Ref not defined for row:",
            rowIndex + 1,
            "cell:",
            cellIndex
          );
        }
      } else {
        if (
          rowRefs.current[totalRows] &&
          rowRefs.current[totalRows][0] &&
          rowRefs.current[totalRows][0].current
        ) {
          rowRefs.current[totalRows][0].current.focus();
        } else {
          console.error("Ref not defined for new row:", totalRows, "cell:", 0);
        }
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (rowIndex - 1 >= 0) {
        if (
          rowRefs.current[rowIndex - 1] &&
          rowRefs.current[rowIndex - 1][cellIndex] &&
          rowRefs.current[rowIndex - 1][cellIndex].current
        ) {
          rowRefs.current[rowIndex - 1][cellIndex].current.focus();
        } else {
          console.error(
            "Ref not defined for row:",
            rowIndex - 1,
            "cell:",
            cellIndex
          );
        }
      }
    }
  };

  const addRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        counter: prevRows.length + 1,
        itemsBar: "",
        itemName: "",
        quantity: "",
        price: "",
        description: "",
      },
    ]);
  };

  // Calculate the total
  const totalAmount = rows
    .reduce(
      (total, row) =>
        total + (parseFloat(row.quantity) * parseFloat(row.price) || 0),
      0
    )
    .toFixed(2);

  // Get Date and Time
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString({
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = today.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setDate(formattedDate);
    setTime(formattedTime);
  }, []);

  const removeRow = (index) => {
    const newRows = rows.filter((row, i) => i !== index);
    setRows(newRows.map((row, i) => ({ ...row, counter: i + 1 })));
    rowRefs.current = newRows.map(() =>
      Array(6)
        .fill(null)
        .map(() => React.createRef())
    );
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    if (field === "quantity" || field === "price") {
      const quantity = parseFloat(newRows[index].quantity) || 0;
      const price = parseFloat(newRows[index].price) || 0;
      newRows[index].total = (quantity * price).toFixed(2);
    }
    setRows(newRows);
  };

  const handlePrint = () => {
    const style = document.createElement("style");
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        .printable-box, .printable-box * {
          visibility: visible;
        }
        .printable-box {
          position: absolute;
          left: 0;
          top: 0;
          padding: 0 !important;
          margin: 0!important;
      
        }
        .printable-box .MuiIconButton-root {
          display: none;
        }
        @page {
          size: portrait;
        }
        .printable-box table {
          width: 100%;
          font-size: 12px;
        }
         .printable-box select {
          display: none;
        }
        .printable-box button {
          display: none;
        }
        .printable-box img {
          width: 300px !important;
        }
        .printable-box .operationType{
          font-size: 20px;
        }
        .printable-box .text{
          font-size: 15px;
        }
        .printable-box p {
          margin: 0;
        }
        .printable-box .MuiTypography-root {
          font-size: 14px;
        }
      }
    `;
    document.head.appendChild(style);
    window.print();
    document.head.removeChild(style);
  };
  useEffect(() => {
    const filteredItems = rows.filter(
      (row) => row.itemName.trim() !== "" && parseFloat(row.total) > 0
    );
    setItems(
      // filteredItems.map((row) => ({
      //   ...row,
      //   total: row.total,
      // }))
      rows
    );
  }, [rows]);

  const handleSave = async () => {
    // Validate that at least one item is entered
    if (items.length === 0) {
      setOpenSnackbar(true);
      setSnackbarMessage("Please add at least one item");
      setSnackBarType("error");
      return;
    }

    // Validate that each item has a non-empty name
    const isValid = items.every((item) => item.itemName.trim() !== "");
    if (!isValid) {
      setOpenSnackbar(true);
      setSnackbarMessage("Item name cannot be empty");
      setSnackBarType("error");
      return;
    }

    // Prepare data to send
    const dataToSend = {
      type: operationType,
      machine_name: machineName,
      mechanism: mechanismName,
      client_name: clientName,
      Warehouse_manager: warehouseManager,
      total_amount: parseFloat(totalAmount),
      items: items.map((item) => ({
        name: item.itemName,
        item_bar: item.itemsBar,
        quantity: item.quantity ? parseFloat(item.quantity) : 0,
        price: item.price ? parseFloat(item.price) : 0,
      })),
    };

    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.log(accessToken);
        setOpenSnackbar(true);
        setSnackbarMessage("You are not logged in. Please log in to continue.");
        setSnackBarType("error");
        return;
      }

      const response = await fetch("http://127.0.0.1:5000/invoices/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create invoice");
      }

      setOpenSnackbar(true);
      setSnackbarMessage("Invoice created successfully");
      setSnackBarType("success");
    } catch (error) {
      console.error("Error creating invoice:", error);
      setOpenSnackbar(true);
      setSnackbarMessage(error.message || "Error creating invoice");
      setSnackBarType("error");
    }
  };

  return (
    <Box sx={{ padding: 4, width: "90%", margin: "auto", marginTop: "100px" }}>
      {/* Operation Type Selection */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "20px",
        }}
      >
        <label
          style={{
            marginBottom: "20px",
            fontSize: "1.4rem",
            color: "#1976d2",
            fontWeight: "bold",
          }}
        >
          نوع العملية / Operation Type
        </label>
        <FormControl
          sx={{
            m: 1,
            width: "250px",
            margin: "auto",
            border: "2px solid #1976d2",
            borderRadius: "6px",
            backgroundColor: "white",
          }}
        >
          <Select
            value={operationType}
            onChange={(e) => setOperationType(e.target.value)}
            displayEmpty
            sx={{ fontWeight: "bold", fontSize: "20px" }}
            inputProps={{ "aria-label": "نوع العملية / Operation Type" }}
          >
            {operationTypes.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Box
        sx={{
          direction: "rtl",
          borderRadius: "8px",
          width: "100%",
          margin: "auto",
        }}
      >
        <Box
          className="printable-box"
          sx={{
            border: "1px solid #ddd",
            padding: "10px 35px",
            overflowY: "auto",
          }}
        >
          {/* Header Section */}
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
            <Box>
              <img
                src={logo}
                alt="Logo"
                style={{ width: "300px", height: "" }}
              />
            </Box>
            <Box sx={{ textAlign: "center", flex: 1, lineHeight: "2.4" }}>
              <Box
                className="operationType"
                sx={{ fontWeight: "bold", color: "#333", fontSize: "1.4rem" }}
              >
                نوع العملية/ Operation type
              </Box>
              <Box sx={{ fontSize: "20px", color: "#555", fontWeight: "bold" }}>
                {operationType}
              </Box>
            </Box>
            <Box className="text" sx={{ textAlign: "right" }}>
              <Box
                sx={{
                  fontWeight: "bold",
                  color: "#555",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box>رقم السند / Voucher Number:</Box>
                <Box sx={{ marginLeft: 1, marginRight: "5px" }}>
                  <span style={{ fontWeight: "400", color: "#999090" }}>1</span>
                </Box>
              </Box>
              <Box
                sx={{
                  fontWeight: "bold",
                  color: "#555",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box>التاريخ / Date:</Box>
                <Box sx={{ marginLeft: 1, marginRight: "5px" }}>
                  <span style={{ fontWeight: "400", color: "#999090" }}>
                    {date}
                  </span>
                </Box>
              </Box>
              <Box
                sx={{
                  fontWeight: "bold",
                  color: "#555",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box>الوقت / Time:</Box>
                <Box sx={{ marginLeft: 1, marginRight: "5px" }}>
                  <span style={{ fontWeight: "400", color: "#999090" }}>
                    {time}
                  </span>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            {/* Table Section */}
            <Table
              sx={{
                border: "1px solid #b2b0b0",
                marginBottom: 3,
                "& .MuiTableCell-root": {
                  border: "1px solid #b2b0b0",
                  padding: "12px",
                  textAlign: "center",
                },
                backgroundColor: "white",
              }}
            >
              <TableBody>
                {/* Inputs for Machine and Mechanism Names */}
                <TableRow>
                  <TableCell
                    colSpan={2}
                    sx={{
                      fontWeight: "bold",
                      width: "110px",
                      textAlign: "right",
                      backgroundColor: "#ddd",
                    }}
                  >
                    اسم الماكينة / Machine Name
                  </TableCell>
                  <TableCell colSpan={1}>
                    <input
                      type="text"
                      value={machineName}
                      onChange={(e) => setMachineName(e.target.value)}
                      style={{ border: "none", outline: "none", width: "100%" }}
                    />
                  </TableCell>
                  <TableCell colSpan={4}>
                    <input
                      type="text"
                      value={machineInfo}
                      onChange={(e) => setMachineInfo(e.target.value)}
                      style={{ border: "none", outline: "none", width: "100%" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={2}
                    sx={{
                      fontWeight: "bold",
                      width: "110px",
                      textAlign: "right",
                      backgroundColor: "#ddd",
                    }}
                  >
                    اسم الميكانيزم / Mechanism Name
                  </TableCell>
                  <TableCell colSpan={1}>
                    <input
                      type="text"
                      value={mechanismName}
                      onChange={(e) => setMechanismName(e.target.value)}
                      style={{ border: "none", outline: "none", width: "100%" }}
                    />
                  </TableCell>
                  <TableCell colSpan={4}>
                    <input
                      type="text"
                      value={mechanismInfo}
                      onChange={(e) => setMechanismInfo(e.target.value)}
                      style={{ border: "none", outline: "none", width: "100%" }}
                    />
                  </TableCell>
                </TableRow>
                {/* Headers for Items */}
                <TableRow
                  sx={{
                    "& .MuiTableCell-root": { border: "none" },
                    backgroundColor: "#ddd",
                  }}
                >
                  <TableCell sx={{ fontWeight: "bold", width: "auto" }}>
                    <AddIcon
                      onClick={addRow}
                      sx={{
                        cursor: "pointer",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", width: "auto" }}>
                    اسم الصنف / Item Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", width: "auto" }}>
                    الرمز / Barcode
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", width: "auto" }}>
                    الكمية / Quantity
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", width: "auto" }}>
                    السعر / Price
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", width: "auto" }}>
                    إجمالى السعر / Total Price
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", width: "auto" }}>
                    بيان / Description
                  </TableCell>
                </TableRow>
                {/* Rows for Data */}
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        width: "auto",
                        textAlign: "center",
                        position: "relative",
                      }}
                    >
                      {row.counter}
                      <IconButton
                        variant="contained"
                        color="error"
                        onClick={() => removeRow(index)}
                        sx={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          position: "absolute",
                          right: "-35px",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ width: "auto", textAlign: "center" }}>
                      <input
                        type="text"
                        value={row.itemName}
                        onChange={(e) =>
                          handleInputChange(index, "itemName", e.target.value)
                        }
                        style={{ border: "none", outline: "none" }}
                        ref={rowRefs.current[index]?.[0]}
                        onKeyDown={(e) => handleKeyDown(e, index, 0)}
                      />
                    </TableCell>
                    <TableCell sx={{ width: "auto", textAlign: "center" }}>
                      <input
                        type="text"
                        value={row.itemsBar}
                        onChange={(e) =>
                          handleInputChange(index, "itemsBar", e.target.value)
                        }
                        style={{ border: "none", outline: "none" }}
                        ref={rowRefs.current[index]?.[1]}
                        onKeyDown={(e) => handleKeyDown(e, index, 1)}
                      />
                    </TableCell>
                    <TableCell sx={{ width: "auto", textAlign: "center" }}>
                      <input
                        type="number"
                        value={row.quantity}
                        onChange={(e) =>
                          handleInputChange(index, "quantity", e.target.value)
                        }
                        style={{ border: "none", outline: "none" }}
                        ref={rowRefs.current[index]?.[2]}
                        onKeyDown={(e) => handleKeyDown(e, index, 2)}
                      />
                    </TableCell>
                    <TableCell sx={{ width: "auto", textAlign: "center" }}>
                      <input
                        type="number"
                        value={row.price}
                        onChange={(e) =>
                          handleInputChange(index, "price", e.target.value)
                        }
                        style={{ border: "none", outline: "none" }}
                        ref={rowRefs.current[index]?.[3]}
                        onKeyDown={(e) => handleKeyDown(e, index, 3)}
                      />
                    </TableCell>
                    <TableCell sx={{ width: "auto", textAlign: "center" }}>
                      {row.quantity && row.price
                        ? (row.quantity * row.price).toFixed(2)
                        : "0"}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "auto",
                        textAlign: "center",
                      }}
                    >
                      <input
                        type="text"
                        value={row.description}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        style={{ border: "none", outline: "none" }}
                        ref={rowRefs.current[index]?.[4]}
                        onKeyDown={(e) => handleKeyDown(e, index, 4)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          {/* Total Amount Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <Box
              sx={{
                padding: "8px 16px",
                borderRadius: "8px",
                display: "flex",
                gap: 1,
                backgroundColor: "white",
                border: "1px solid #ddd",
              }}
            >
              <Box sx={{ fontSize: "1rem", fontWeight: "600" }}>
                الإجمالي / Total:
              </Box>
              <Box
                sx={{
                  marginLeft: 1,
                  fontSize: "1rem",
                  fontWeight: "400",
                  color: "#1976d2",
                }}
              >
                {totalAmount}
              </Box>
            </Box>
          </Box>

          {/* Comment Field */}
          {showCommentField && (
            <Box>
              <TextField
                multiline
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{
                  marginTop: 2,
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-input": {
                    textAlign: "center",
                  },
                  "& .MuiInputBase-root": { height: "auto" },
                }}
              />
            </Box>
          )}

          {/* Information Section */}
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                marginBottom: 2,
                gap: 2,
                flexDirection: "column",
              }}
            >
              <Box sx={{ fontWeight: "bold", color: "#555" }}>
                اسم الموظف / Employee Name
              </Box>
              <Box sx={{ color: "#555" }}>{user.username}</Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                marginBottom: 2,
                gap: 2,
                flexDirection: "column",
              }}
            >
              <Box sx={{ fontWeight: "bold", color: "#555" }}>
                اسم المستلم / Client Name
              </Box>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  height: "40px",
                  textAlign: "center",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                marginBottom: 2,
                gap: 2,
                flexDirection: "column",
              }}
            >
              <Box sx={{ fontWeight: "bold", color: "#555" }}>
                مدير المخازن / Warehouse Manager
              </Box>
              <input
                type="text"
                value={warehouseManager}
                onChange={(e) => setWarehouseManager(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  height: "40px",
                  textAlign: "center",
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Buttons Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            marginTop: 3,
          }}
        >
          {/* Add Comment Button */}
          {!showCommentField ? (
            <Button
              variant="contained"
              color="success"
              onClick={handleAddComment}
              sx={{
                padding: "12px 24px",
                borderRadius: "12px",
                fontWeight: "bold",
                backgroundColor: "#4CAF50",
                "&:hover": { backgroundColor: "#45a049" },
              }}
            >
              تعليق / Comment
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="error"
              onClick={handleCancelComment}
              sx={{
                padding: "10px 20px",
                borderRadius: "12px",
                fontWeight: "bold",
                borderColor: "#e57373",
                "&:hover": { borderColor: "#d32f2f" },
              }}
            >
              الغاء / Cancel
            </Button>
          )}

          {/* Sure Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{
              padding: "12px 24px",
              borderRadius: "12px",
              fontWeight: "bold",
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            تأكيد / Save
          </Button>

          {/* Print Button */}
          <Button
            variant="contained"
            color="info"
            onClick={handlePrint}
            sx={{
              padding: "12px 24px",
              borderRadius: "12px",
              fontWeight: "bold",
              backgroundColor: "#00bcd4",
              "&:hover": { backgroundColor: "#0097a7" },
            }}
          >
            طباعة / Print
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          zIndex: "99999999999999999999999999999999999999",
        }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackBarType}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
