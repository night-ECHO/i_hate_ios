import { Page, Text, Button, Box } from "zmp-ui";
import { useNavigate } from "react-router-dom";

export default function Confirm() {
  const navigate = useNavigate();
  const data = JSON.parse(sessionStorage.getItem("loanData") || "{}");

  const submit = () => {
    // ----> NO BACK-END CALL <----
    sessionStorage.removeItem("loanData");
    navigate("/success");
  };

  return (
    <Page className="bg-white">
      <div className="bg-green-600 text-white text-center py-4">
        <Text className="text-xl font-bold">FE Credit</Text>
      </div>

      <div className="flex justify-around border-b px-6">
        <Text className="py-3 text-gray-500">Thông tin</Text>
        <Text className="py-3 font-bold border-b-4 border-green-600">
          Xác nhận
        </Text>
        <Text className="py-3 text-gray-500">Hoàn tất</Text>
      </div>

      <Box className="px-6 pt-6">
        <div className="flex justify-between items-center mb-6">
          <Text className="text-xl font-bold">Thông tin người vay</Text>
          <Text
            className="text-blue-600 underline text-sm cursor-pointer"
            onClick={() => navigate("/loan")}
          >
            Chỉnh sửa
          </Text>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between">
            <Text>Họ và tên</Text>
            <Text className="font-bold">{data.name}</Text>
          </div>
          <div className="flex justify-between">
            <Text>Số điện thoại</Text>
            <Text className="font-bold">{data.phone}</Text>
          </div>
          <div className="flex justify-between">
            <Text>Số CCCD</Text>
            <Text className="font-bold">{data.cccd}</Text>
          </div>
        </div>

        <Text className="text-xl font-bold mb-4">Thông tin gói vay</Text>
        <div className="bg-gray-100 rounded-xl p-5 space-y-4">
          <div className="flex justify-between">
            <Text>Số tiền cần vay</Text>
            <Text className="font-bold">{data.amount}</Text>
          </div>
          <div className="flex justify-between">
            <Text>Kỳ hạn vay</Text>
            <Text className="font-bold">{data.term}</Text>
          </div>
          <div className="flex justify-between">
            <Text>Lãi suất từ</Text>
            <Text className="font-bold">{data.rate}</Text>
          </div>
          <div className="flex justify-between">
            <Text>Ước tính trả mỗi tháng</Text>
            <Text className="font-bold">{data.monthly}</Text>
          </div>
        </div>

        <div className="mt-8 space-y-3 text-sm">
          <Text>• Tôi xác nhận các thông tin trên là chính xác</Text>
          <Text>
            • Tôi đồng ý với các điều khoản Thỏa thuận sử dụng và Chính sách
            bảo mật.
          </Text>
        </div>

        <Button
          className="w-full bg-green-600 text-white font-bold text-lg rounded-full mt-10"
          size="large"
          onClick={submit}
        >
          Đồng ý
        </Button>
      </Box>
    </Page>
  );
}