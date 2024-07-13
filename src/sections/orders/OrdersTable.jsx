import { EyeFilled } from "@ant-design/icons";
import { Space, Table, Tag, Tooltip, Select } from "antd";
import Link from "next/link";

const { Column } = Table;
const { Option } = Select;
const getStatusTag = (status) => {
  switch (status) {
    case 0:
      return <Tag color="red">Đơn hàng đã bị hủy</Tag>;
    case 1:
      return <Tag color="blue">Đang xử lý</Tag>;
    case 2:
      return <Tag color="green">Xác nhận</Tag>;
    case 3:
      return <Tag color="green">Thanh toán (online)</Tag>;
    case 4:
      return <Tag color="yellow">Thanh toán khi nhận được hàng</Tag>;
    case 5:
      return <Tag color="red">Đơn hàng đã bị loại</Tag>;
    case 6:
      return <Tag color="yellow">Đang hoàn trả</Tag>;
    case 7:
      return <Tag color="red">Đã hoàn trả</Tag>;
    default:
      return null;
  }
};
const OrdersTable = ({ data, showConfirmModal }) => {
  const handleStatusChange = (id, value) => {
    showConfirmModal(id, value);
  };

  return (
    <Table dataSource={data} rowKey="id" pagination={false}>
      <Column title="Tên khách hàng" dataIndex="username" key="username" />
      <Column title="Địa chỉ khách hàng" dataIndex="address" key="address" />
      <Column
        title="Tổng tiền đơn hàng"
        dataIndex="total_price"
        key="total_price"
      />

      <Column
        title="Trạng thái đơn hàng"
        dataIndex="status"
        key="status"
        render={(status) => getStatusTag(status)}
      />
      <Column
        title="Xác nhận đơn hàng"
        dataIndex="is_admin_confirm"
        key="is_admin_confirm"
        render={(is_admin_confirm, record) => (
          <Select
            defaultValue={is_admin_confirm}
            onChange={(value) => handleStatusChange(record.id, value)}
          >
            <Option value={false}>
              <Tag color="red">Chưa được xác nhận</Tag>
            </Option>
            <Option value={true}>
              {" "}
              <Tag color="green">Đã được xác nhận</Tag>
            </Option>
          </Select>
        )}
      />
      <Column
        title="Action"
        key="action"
        dataIndex="id"
        render={(id, record) => (
          <Space size="middle">
            <Tooltip title="Xem chi tiết đơn hàng">
              <Link href={`orders/${id}`} className="hover:text-blue-400">
                <EyeFilled />
              </Link>
            </Tooltip>
          </Space>
        )}
      />
    </Table>
  );
};

export default OrdersTable;
