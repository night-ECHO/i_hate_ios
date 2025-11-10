import { Page, Text, Button, Box } from 'zmp-ui';
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();

  return (
    <Page className="flex flex-col items-center justify-center p-6">
      <Box className="text-center space-y-4">
        <Text.Header>FECredit - Vay Nhanh</Text.Header>
        <Text size="large">Vay vốn chỉ trong 3 phút qua Zalo</Text>
        <Button
          type="highlight"
          size="large"
          onClick={() => navigate('/form1')}
          className="w-full"
        >
          Bắt đầu ngay
        </Button>
      </Box>
    </Page>
  );
}