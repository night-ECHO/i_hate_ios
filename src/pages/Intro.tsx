import { Page, Text, Button, Box } from "zmp-ui";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();

  return (
    <Page className="bg-gradient-to-b from-green-600 to-green-700 text-white">
      <Box className="flex-1 flex flex-col justify-end pb-20 px-6">
        <Text className="text-4xl font-bold text-center mb-6">FE CREDIT</Text>
        <Text className="text-xl text-center mb-12">
          Vay vốn chỉ trong 3 phút qua Zalo
        </Text>
        <Button
          className="bg-white text-green-600 font-bold text-lg rounded-full"
          size="large"
          onClick={() => navigate("/terms")}
        >
          Bắt đầu ngay
        </Button>
      </Box>
    </Page>
  );
}