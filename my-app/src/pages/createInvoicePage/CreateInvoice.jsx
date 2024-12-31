import React, { useState } from 'react';
import { Box, Button, Paper } from '@mui/material';
import styles from './CreateInvoice.module.css';
import Type1 from './invoicesTypes/type1/Type1';
import Type2 from './invoicesTypes/type2/Type2';
import Type3 from './invoicesTypes/type3/Type3';

const types = [
  {
    title: "إضافه",
    value: <Type1 />,
  },
  {
    title: "صرف",
    value: <Type2 />,
  },
  {
    title: "امانات",
    value: <Type3 />,
  },
];

export default function CreateInvoice() {
  const [selectedType, setSelectedType] = useState(null); // حالة لتخزين الفاتورة المختارة

  const handleButtonClick = (type) => {
    setSelectedType(type); // تغيير النوع المختار
  };

  return (
    <Box display="flex" sx={{
      direction: "rtl",
      paddingTop: "72px"

    }} justifyContent="space-between" height="100vh">
      {/* أزرار لاختيار النوع على اليمين */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
          width: 200,
          borderRight: '2px solid #1976d2',
          padding: 2,

        }}
      >
        {types.map((type) => (
          <Button
            key={type.title}
            onClick={() => handleButtonClick(type.value)} // عند الضغط على الزر نحدد الفاتورة المختارة
            variant="contained"
            color="primary"
            sx={{ marginBottom: 2, borderRadius: 2 }}
          >
            {type.title}
          </Button>
        ))}
      </Box>

      {/* عرض الفاتورة بناءً على الاختيار */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <Paper elevation={3} sx={{ width: '80%', padding: 3 }}>
          {selectedType} {/* عرض الفاتورة المختارة فقط */}
        </Paper>
      </Box>
    </Box>
  );
}
