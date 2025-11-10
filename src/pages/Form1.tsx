import { useState } from 'react';
import { Page, Text, Input, Button, Box } from 'zmp-ui';
import { useNavigate } from "react-router-dom";

export default function Form1() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const next = () => {
    sessionStorage.setItem('step1', JSON.stringify({ name, phone }));
    navigate('/form2');
  };

  return (
    <Page className="p-6">
      <Text.Header>Bước 1: Thông tin cá nhân</Text.Header>
      <Box mt={4} className="space-y-4">
        <Input
          label="Họ và tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nguyễn Văn A"
        />
        <Input
          label="Số điện thoại"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="0901234567"
        />
        <Button
          type="highlight"
          size="large"
          onClick={next}
          disabled={!name || !phone}
          className="w-full"
        >
          Tiếp theo
        </Button>
      </Box>
    </Page>
  );
}