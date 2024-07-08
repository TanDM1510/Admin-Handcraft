import { EyeFilled } from "@ant-design/icons";
import { Space, Table, Tag, Tooltip, Select } from "antd";
import Link from "next/link";

const { Column } = Table;
const { Option } = Select;

const OrdersTable = ({
  data,

  showConfirmModal,
}) => {
  const handleStatusChange = (id, value) => {
    showConfirmModal(id, value);
  };

  return (
    <Table dataSource={data} rowKey="id" pagination={false}>
      <Column title="Tên khách hàng" dataIndex="user_id" key="user_id" />
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
        render={(status, record) => (
          <Select
            defaultValue={status}
            onChange={(value) => handleStatusChange(record.id, value)}
          >
            <Option value={0}>
              <Tag color="red">Đơn hàng đã bị hủy</Tag>
            </Option>
            <Option value={1}>
              {" "}
              <Tag color="blue">Đang xử lý</Tag>
            </Option>
            <Option value={2}>
              <Tag color="green">Xác nhận</Tag>{" "}
            </Option>
            <Option value={3}>
              <Tag color="green">Đã thanh toán (online)</Tag>
            </Option>
            <Option value={4}>
              <Tag color="yellow">Ship code</Tag>
            </Option>
            <Option value={5}>
              <Tag color="red">Đơn hàng đã bị loại</Tag>
            </Option>
            <Option value={6}>
              <Tag color="yellow">Đang hoàn trả </Tag>
            </Option>
            <Option value={7}>
              <Tag color="red">Đã hoàn trả</Tag>
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
