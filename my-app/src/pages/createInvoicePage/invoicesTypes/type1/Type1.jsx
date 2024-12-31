import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  TextField,
  TableHead,
} from "@mui/material";
import logo from "../logo.png";

export default function Type1() {
  const [rows, setRows] = useState([
    {
      counter: 1,
      itemsBar: "",
      itemName: "",
      quantity: "",
      description: "",
    },
  ]);
  const [machineName, setMachineName] = useState("");
  const [mechanismName, setMechanismName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [comment, setComment] = useState("");
  const [showCommentField, setShowCommentField] = useState(false);

  const handleAddComment = () => {
    setShowCommentField(true);
  };

  const handleCancelComment = () => {
    setShowCommentField(false);
    setComment("");
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        const activeElement = document.activeElement;
        if (
          activeElement.tagName === "INPUT" || // تحقق من العنصر الذي تم التفاعل معه
          activeElement.tagName === "TEXTAREA"
        ) {
          addRow(); // هنا يتم إضافة صف جديد عند الضغط على Enter
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress); // إضافة event listener

    // تنظيف event listener عند فك الارتباط
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [rows]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString({
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = today.toLocaleTimeString({
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setDate(formattedDate);
    setTime(formattedTime);
  }, []);

  const addRow = () => {
    setRows([
      ...rows,
      {
        counter: rows.length + 1,
        itemsBar: "",
        itemName: "",
        quantity: "",
        description: "",
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handlePrint = () => {
    const confirmPrint = window.confirm("هل تريد طباعة هذه الصفحة؟");
    if (confirmPrint) {
      // إضافة CSS للطباعة لإخفاء العناصر الأخرى
      const style = document.createElement("style");
      style.innerHTML = `
        @media print {
          body * {
            visibility: hidden; /* إخفاء جميع العناصر */
          }
          .printable-box, .printable-box * {
            visibility: visible; /* إظهار العنصر المحدد فقط */
          }
          .printable-box {
            position: absolute;
            left: 0;
            top: 0;
          }
          @page {
            size: landscape;
          }
        }
      `;
      document.head.appendChild(style);

      // بدء الطباعة
      window.print();

      // إزالة الـ CSS بعد الطباعة لإظهار العناصر مرة أخرى
      document.head.removeChild(style);
    }
  };

  return (
    <Box
      sx={{
        direction: "rtl",
        padding: 4,
        border: "1px solid #ddd",
        borderRadius: "8px",
        height: "80vh",
        overflowY: "auto",
      }}
    >
      <Box className="printable-box">
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 3,
          }}
        >
          <Box>
            <img
              src={logo}
              alt="Logo"
              style={{ width: "120px", height: "auto" }}
            />
          </Box>
          <Box sx={{ textAlign: "center", flex: 1 }}>
            <Box variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
              CUBII
            </Box>
            <Box sx={{ fontSize: "16px", color: "#555" }}>
              INDUSTRIAL SOLUTIONS
            </Box>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Box sx={{ fontWeight: "bold", color: "#555" }}>
              نوع العملية/ Operation type :
              <span
                style={{
                  fontWeight: "400",
                  color: "#999090",
                }}
              >
                اضافة / Add
              </span>
            </Box>
            <Box
              sx={{
                fontWeight: "bold",
                color: "#555",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "inline" }}>رقم السند / Voucher Number:</Box>
              <Box
                sx={{ display: "inline", marginLeft: 1, marginRight: "5px" }}
              >
                <span
                  style={{
                    fontWeight: "400",
                    color: "#999090",
                  }}
                >
                  1
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
              <Box sx={{ display: "inline" }}>التاريخ / Date:</Box>
              <Box
                sx={{ display: "inline", marginLeft: 1, marginRight: "5px" }}
              >
                <span
                  style={{
                    fontWeight: "400",
                    color: "#999090",
                  }}
                >
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
              <Box sx={{ display: "inline" }}> الوقت / Time:</Box>
              <Box
                sx={{ display: "inline", marginLeft: 1, marginRight: "5px" }}
              >
                <span
                  style={{
                    fontWeight: "400",
                    color: "#999090",
                  }}
                >
                  {time}
                </span>
              </Box>
            </Box>
          </Box>
        </Box>

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
          }}
        >
          <TableBody>
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
              <TableCell colSpan={4}>
                <input
                  type="text"
                  onChange={(e) => setMachineName(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    width: "100%", // Make input field take 100% width
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={2}
                sx={{
                  textAlign: "right",
                  fontWeight: "bold",
                  backgroundColor: "#ddd",
                  width: "110px",
                }}
              >
                اسم الميكانيزم / Mechanism Name
              </TableCell>
              <TableCell colSpan={4}>
                <input
                  type="text"
                  onChange={(e) => setMechanismName(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    width: "100%",
                  }}
                />
              </TableCell>
            </TableRow>

            <TableRow
              sx={{
                "& .MuiTableCell-root": { border: "none" },
                backgroundColor: "#ddd",
              }}
            >
              <TableCell sx={{ fontWeight: "bold", width: "50px" }}>
                عداد / Counter
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "200px" }}>
                شريط العناصر / Items Bar
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "200px" }}>
                اسم الصنف / Item Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "50px" }}>
                الكمية / Quantity
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                بيان / Description
              </TableCell>
            </TableRow>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    width: "50px",
                  }}
                >
                  <Box>{row.counter}</Box>
                </TableCell>

                <TableCell
                  sx={{
                    width: "200px",
                  }}
                >
                  <input
                    type="text"
                    onChange={(e) =>
                      handleInputChange(index, "itemsBar", e.target.value)
                    }
                    style={{
                      border: "none",
                      outline: "none",
                      width: "100%",
                    }}
                  />
                </TableCell>

                <TableCell
                  sx={{
                    width: "200px",
                  }}
                >
                  <input
                    type="text"
                    onChange={(e) =>
                      handleInputChange(index, "itemName", e.target.value)
                    }
                    style={{
                      border: "none",
                      outline: "none",
                      width: "100%",
                    }}
                  />
                </TableCell>

                <TableCell
                  sx={{
                    width: "50px",
                  }}
                >
                  <input
                    type="text"
                    onChange={(e) =>
                      handleInputChange(index, "quantity", e.target.value)
                    }
                    style={{
                      border: "none",
                      outline: "none",
                      width: "100%",
                    }}
                  />
                </TableCell>

                <TableCell>
                  <input
                    type="text"
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                    style={{
                      border: "none",
                      outline: "none",
                      width: "100%",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

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
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
                "& .MuiInputBase-root": {
                  height: "auto", // لضبط الحجم التلقائي
                },
              }}
            />
          </Box>
        )}

        {/* Information */}
        <Box
          sx={{ marginTop: 3, display: "flex", justifyContent: "space-around" }}
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
            <Box sx={{ color: "#555" }}>Ahmed</Box>
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
            <Box sx={{ color: "#555" }}>Mohammed</Box>
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
            <Box sx={{ color: "#555" }}>Manager</Box>
          </Box>
        </Box>
      </Box>
      {/* Add Comment Button */}
      {!showCommentField ? (
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 5 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddComment}
            sx={{
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: "bold",
              backgroundColor: "#4CAF50",
              "&:hover": {
                backgroundColor: "#45a049",
              },
            }}
          >
            تعليق / Comment
          </Button>
        </Box>
      ) : (
        <Box sx={{ marginTop: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleCancelComment}
            sx={{
              padding: "8px 16px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            الغاء / Cancel
          </Button>
        </Box>
      )}

      {/* Print Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 5 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrint}
          sx={{
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          طباعة / Print
        </Button>
      </Box>
    </Box>
  );
}
