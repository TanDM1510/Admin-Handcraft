import { DeleteFilled, EyeFilled, SignatureFilled } from "@ant-design/icons";
import { Space, Table, Tag, Tooltip } from "antd";

import Link from "next/link";
const { Column } = Table;
const UsersTable = ({ data, handleDelete }) => {
  return (
    <Table dataSource={data} rowKey="id">
      <Column title="Tên sản phẩm" dataIndex="name" key="name" />
      <Column title="Giá sản phẩm" dataIndex="price" key="price" />
      <Column
        title="Lễ hội"
        dataIndex="festivals"
        key="festivals"
        render={(festivals) => (
          <>
            {festivals.map((festival) => (
              <p key={festival.id}>{festival.name}</p>
            ))}
          </>
        )}
      />
      <Column
        title="Trạng thái sản phẩm"
        dataIndex="status"
        key="status"
        render={(status) => (
          <>
            {status === 1 ? (
              <Tag color="green">Đang bán</Tag>
            ) : (
              <Tag color="red">Ngưng bán</Tag>
            )}
          </>
        )}
      />
      <Column
        title="Action"
        key="action"
        dataIndex="id"
        render={(id, record) => (
          <Space size="middle">
            <Tooltip title="Xem chi tiết sản phẩm">
              <Link href={`products/${id}`} className="hover:text-blue-400">
                <EyeFilled />
              </Link>
            </Tooltip>

            <a className="hover:text-red-600" onClick={() => handleDelete(id)}>
              <Tooltip title="Xóa sản phẩm">
                {" "}
                <DeleteFilled />
              </Tooltip>
            </a>

            <Tooltip title="Sửa sản phẩm">
              <Link
                className="hover:text-yellow-400"
                href={`products/updateProduct/${id}`}
              >
                {" "}
                <SignatureFilled />
              </Link>
            </Tooltip>
          </Space>
        )}
      />
    </Table>
  );
};
export default UsersTable;
