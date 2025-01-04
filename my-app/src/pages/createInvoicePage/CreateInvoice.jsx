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
import styles from "./CreateInvoice.module.css";

export default function Type1() {
  // getUserName
  const [user, setUser] = useState({});
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

  // Get Last ID
  const [voucherNumber, setVoucherNumber] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.error("No access token found.");
        return;
      }
      try {
        const response = await fetch("http://127.0.0.1:5000/invoices/last-id", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }
        const id = await response.json();
        setVoucherNumber(id);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserData();
  }, [voucherNumber]);
  const operationTypes = ["صرف", "أمانات", "مرتجع", "توالف", "حجز"];
  const [operationType, setOperationType] = useState("");

  const purchasesTypes = ["إضافة"];
  const [purchasesType, setPurchasesType] = useState("");

  const [rows, setRows] = useState([
    {
      counter: 1,
      itemsBar: "",
      itemName: "",
      quantity: 0,
      ...(purchasesType && { price: 0 }),
      description: "",
      ...(purchasesType && { total: 0 }),
    },
  ]);
  const rowRefs = useRef([]);
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
        quantity: 0,
        ...(purchasesType && { price: 0 }),
        description: "",
        ...(purchasesType && { total: 0 }),
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
      (row) => row.itemName.trim() !== ""
    );
    setItems(
      filteredItems.map((row) => ({
        ...row,
        total: row.total,
      }))
    );
  }, [rows]);

  const handleSave = async () => {
    // Validate that at least one item is entered
    if (items.length === 0) {
      console.log(items);
      setOpenSnackbar(true);
      setSnackbarMessage("يرجى إضافة عنصر واحد على الأقل");
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
      Employee_Name: user.username,
      items: items.map((item) => ({
        name: item.itemName,
        item_bar: item.itemsBar,
        quantity: item.quantity ? parseFloat(item.quantity) : 0,
        price: item.price ? parseFloat(item.price) : 0,
        total_price: item.totalPrice ? parseFloat(item.totalPrice) : 0,
        description: item.description,
      })),
    };

    try {
      const accessToken = localStorage.getItem("access_token");

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
      setSnackbarMessage("تم إنشاء الفاتورة بنجاح");
      setSnackBarType("success");
      setRows([
        {
          counter: 1,
          itemsBar: "",
          itemName: "",
          quantity: 0,
          ...(purchasesType && { price: 0 }),
          description: "",
          ...(purchasesType && { total: 0 }),
        },
      ]);
      setMachineName("");
      setMachineInfo("");
      setMechanismName("");
      setMechanismInfo("");
      setClientName("");
      setWarehouseManager("");
      handleCancelComment();
    } catch (error) {
      console.error("Error creating invoice:", error);
      setOpenSnackbar(true);
      setSnackbarMessage(error.message || "خطأ في إنشاء الفاتورة");
      setSnackBarType("error");
    }
  };

  const [lastSelected, setLastSelected] = useState(""); // لتتبع آخر اختيار

  useEffect(() => {
    if (operationType !== "") {
      setLastSelected(operationType);
      setPurchasesType("");
    }
  }, [operationType]);

  useEffect(() => {
    if (purchasesType !== "") {
      setLastSelected(purchasesType);
      setOperationType("");
    }
  }, [purchasesType]);

  return (
    <Box className={styles.mainBox}>
      {/* Operation Type Selection */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <div className={styles.operationTypeSelection}>
          <label className={styles.operationTypeLabel}>مشتريات</label>
          <FormControl className={styles.operationTypeFormControl}>
            <Select
              className={styles.operationTypeSelect}
              value={purchasesType}
              onChange={(e) => setPurchasesType(e.target.value)}
              displayEmpty
            >
              {purchasesTypes.map((type, index) => (
                <MenuItem
                  sx={{
                    direction: "rtl",
                  }}
                  key={index}
                  value={type}
                >
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={styles.operationTypeSelection}>
          <label className={styles.operationTypeLabel}>عمليات</label>
          <FormControl className={styles.operationTypeFormControl}>
            <Select
              className={styles.operationTypeSelect}
              value={operationType}
              onChange={(e) => setOperationType(e.target.value)}
              displayEmpty
            >
              {operationTypes.map((type, index) => (
                <MenuItem
                  sx={{
                    direction: "rtl",
                  }}
                  key={index}
                  value={type}
                >
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Box>

      {operationType === "" && purchasesType === "" ? (
        <div>برجاء تحديد نوع الفاتورة</div>
      ) : (
        <Box className={styles.outerBox}>
          <Box className={`printable-box ${styles.printableBox}`}>
            {/* Header Section */}
            <Box className={styles.headerSection}>
              <Box className={styles.logoBox}>
                <img src={logo} alt="Logo" className={styles.logoImage} />
              </Box>
              <Box className={styles.operationTypeBox}>
                <Box className={styles.operationTypeText}>نوع العملية</Box>
                <Box className={styles.operationTypeName}>{lastSelected}</Box>
              </Box>
              <Box className={styles.infoBox}>
                <Box className={styles.infoItem}>
                  <Box className={styles.infoLabel}>رقم السند:</Box>
                  <Box className={styles.infoValue}>
                    {voucherNumber && voucherNumber.last_id}
                  </Box>
                </Box>
                <Box className={styles.infoItem}>
                  <Box className={styles.infoLabel}>التاريخ</Box>
                  <Box className={styles.infoValue}>{date}</Box>
                </Box>
                <Box className={styles.infoItem}>
                  <Box className={styles.infoLabel}>الوقت</Box>
                  <Box className={styles.infoValue}>{time}</Box>
                </Box>
              </Box>
            </Box>

            {/* Table Section */}
            <Box className={styles.tableSection}>
              <Table
                className={styles.customTable}
                sx={{
                  "& .MuiTableCell-root": {
                    border: "1px solid #b2b0b0",
                    padding: "12px",
                    textAlign: "center",
                  },
                }}
              >
                <TableBody>
                  {/* Inputs for Machine and Mechanism Names */}
                  <TableRow className={styles.tableRow}>
                    <TableCell className={styles.tableCell} colSpan={2}>
                      اسم الماكينة
                    </TableCell>
                    <TableCell className={styles.tableInputCell} colSpan={1}>
                      <input
                        type="text"
                        value={machineName}
                        onChange={(e) => setMachineName(e.target.value)}
                        className={styles.cellInput}
                      />
                    </TableCell>
                    <TableCell className={styles.tableInputCell} colSpan={4}>
                      <input
                        type="text"
                        value={machineInfo}
                        onChange={(e) => setMachineInfo(e.target.value)}
                        className={styles.cellInput}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow className={styles.tableRow}>
                    <TableCell className={styles.tableCell} colSpan={2}>
                      اسم الميكانيزم
                    </TableCell>
                    <TableCell className={styles.tableInputCell} colSpan={1}>
                      <input
                        type="text"
                        value={mechanismName}
                        onChange={(e) => setMechanismName(e.target.value)}
                        className={styles.cellInput}
                      />
                    </TableCell>
                    <TableCell className={styles.tableInputCell} colSpan={4}>
                      <input
                        type="text"
                        value={mechanismInfo}
                        onChange={(e) => setMechanismInfo(e.target.value)}
                        className={styles.cellInput}
                      />
                    </TableCell>
                  </TableRow>
                  {/* Headers for Items */}
                  <TableRow>
                    <TableCell className={styles.tableCell}>
                      <AddIcon onClick={addRow} className={styles.addIcon} />
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      اسم الصنف
                    </TableCell>
                    <TableCell className={styles.tableCell}>الرمز</TableCell>
                    <TableCell className={styles.tableCell}>الكمية</TableCell>
                    {purchasesType && (
                      <>
                        <TableCell className={styles.tableCell}>
                          السعر
                        </TableCell>
                        <TableCell className={styles.tableCell}>
                          إجمالي السعر
                        </TableCell>
                      </>
                    )}
                    <TableCell
                      colSpan={purchasesType ? 1 : 2}
                      className={styles.tableCell}
                    >
                      بيان
                    </TableCell>
                  </TableRow>
                  {/* Rows for Data */}
                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell
                        sx={{
                          position: "relative",
                        }}
                        className={styles.tableCellRow}
                      >
                        {row.counter}
                        <IconButton
                          variant="contained"
                          color="error"
                          onClick={() => removeRow(index)}
                          className={styles.clearIcon}
                        >
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      </TableCell>

                      <TableCell className={styles.tableCellRow}>
                        <input
                          type="text"
                          value={row.itemName}
                          onChange={(e) =>
                            handleInputChange(index, "itemName", e.target.value)
                          }
                          className={styles.cellInput}
                          ref={rowRefs.current[index]?.[0]}
                          onKeyDown={(e) => handleKeyDown(e, index, 0)}
                        />
                      </TableCell>
                      <TableCell className={styles.tableCellRow}>
                        <input
                          type="text"
                          value={row.itemsBar}
                          onChange={(e) =>
                            handleInputChange(index, "itemsBar", e.target.value)
                          }
                          className={styles.cellInput}
                          ref={rowRefs.current[index]?.[1]}
                          onKeyDown={(e) => handleKeyDown(e, index, 1)}
                        />
                      </TableCell>
                      <TableCell className={styles.tableCellRow}>
                        <input
                          type="number"
                          value={row.quantity}
                          onChange={(e) =>
                            handleInputChange(index, "quantity", e.target.value)
                          }
                          className={styles.cellInput}
                          ref={rowRefs.current[index]?.[2]}
                          onKeyDown={(e) => handleKeyDown(e, index, 2)}
                        />
                      </TableCell>

                      {purchasesType && (
                        <>
                          <TableCell className={styles.tableCellRow}>
                            <input
                              type="number"
                              value={row.price}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "price",
                                  e.target.value
                                )
                              }
                              className={styles.cellInput}
                              ref={rowRefs.current[index]?.[3]}
                              onKeyDown={(e) => handleKeyDown(e, index, 3)}
                            />
                          </TableCell>
                          <TableCell className={styles.tableCellRow}>
                            {row.quantity && row.price
                              ? (row.quantity * row.price).toFixed(2)
                              : "0"}
                          </TableCell>
                        </>
                      )}
                      <TableCell
                        colSpan={purchasesType ? 1 : 2}
                        className={styles.tableCellRow}
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
                          className={styles.cellInput}
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
            {purchasesType && (
              <Box className={styles.totalAmountSection}>
                <Box className={styles.totalAmountBox}>
                  <Box className={styles.totalAmountLabel}>الإجمالي:</Box>
                  <Box className={styles.totalAmountValue}>{totalAmount}</Box>
                </Box>
              </Box>
            )}

            {/* Comment Field */}
            {showCommentField && (
              <Box className={styles.commentFieldBox}>
                <TextField
                  multiline
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  variant="outlined"
                  fullWidth
                  className={styles.commentTextField}
                  sx={{
                    "& .MuiOutlinedInput-input": {
                      textAlign: "center",
                    },
                  }}
                />
              </Box>
            )}

            {/* Information Section */}
            <Box className={styles.infoSection}>
              <Box className={styles.infoItemBox}>
                <Box className={styles.infoLabel}>اسم الموظف</Box>
                <Box className={styles.infoValue}>{user.username}</Box>
              </Box>
              <Box className={styles.infoItemBox}>
                <Box className={styles.infoLabel}>اسم المستلم</Box>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className={styles.infoInput}
                />
              </Box>
              <Box className={styles.infoItemBox}>
                <Box className={styles.infoLabel}>مدير المخازن </Box>
                <input
                  type="text"
                  value={warehouseManager}
                  onChange={(e) => setWarehouseManager(e.target.value)}
                  className={styles.infoInput}
                />
              </Box>
            </Box>
          </Box>

          {/* Buttons Section */}
          <Box className={styles.buttonsSection}>
            {/* Add Comment Button */}
            {!showCommentField ? (
              <Button
                variant="contained"
                color="success"
                onClick={handleAddComment}
                className={`${styles.addCommentButton} ${styles.infoBtn}`}
              >
                تعليق
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="error"
                onClick={handleCancelComment}
                className={`${styles.cancelCommentButton} ${styles.infoBtn}`}
              >
                الغاء
              </Button>
            )}

            {/* Sure Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              className={`${styles.saveButton} ${styles.infoBtn}`}
            >
              تأكيد
            </Button>

            {/* Print Button */}
            <Button
              variant="contained"
              color="info"
              onClick={handlePrint}
              className={`${styles.printButton} ${styles.infoBtn}`}
            >
              طباعة
            </Button>
          </Box>
        </Box>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        className={styles.snackbar}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackBarType}
          className={styles.alert}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
