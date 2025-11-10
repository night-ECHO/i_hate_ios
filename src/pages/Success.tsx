import { Page, Text, Button, Box } from 'zmp-ui';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();

  return (
    <Page className="bg-white flex flex-col items-center justify-center px-6">
      <Box className="text-center">
        <div className="text-8xl mb-6 text-green-500">Checkmark</div>
        <Text className="text-2xl font-bold mb-4">Gửi hồ sơ thành công!</Text>
        <Text className="text-gray-600 mb-10">
          Chúng tôi sẽ liên hệ Quý khách trong vòng 24h tới.
        </Text>
        <Button
          className="w-full bg-green-600 text-white font-bold rounded-full"
          size="large"
          onClick={() => navigate('/')}
        >
          Về trang chủ
        </Button>
      </Box>
    </Page>
  );
}