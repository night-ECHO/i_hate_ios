import { useState } from 'react';
import { Page, Text, Input, Button, Box } from 'zmp-ui';
import { useNavigate } from "react-router-dom";

export default function Form2() {
  const [cmnd, setCmnd] = useState('');
  const [income, setIncome] = useState('');
  const navigate = useNavigate();
  const step1 = JSON.parse(sessionStorage.getItem('step1') || '{}');

  const next = () => {
    const data = { ...step1, cmnd, income: Number(income) };
    sessionStorage.setItem('FINAL', JSON.stringify(data));
    navigate('/submit');
  };

  return (
    <Page className="p-6">
      <Text.Header>Bước 2: CMND & Thu nhập</Text.Header>
      <Box mt={4} className="space-y-4">
        <Input
          label="Số CMND/CCCD"
          value={cmnd}
          onChange={(e) => setCmnd(e.target.value)}
          placeholder="123456789"
        />
        <Input
          label="Thu nhập/tháng (VNĐ)"
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="15000000"
        />
        <Button
          type="highlight"
          size="large"
          onClick={next}
          disabled={!cmnd || !income}
          className="w-full"
        >
          Xem lại & Gửi
        </Button>
      </Box>
    </Page>
  );
}