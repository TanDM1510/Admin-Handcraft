import { DeleteFilled, EyeFilled, SignatureFilled } from "@ant-design/icons";
import { Space, Table, Tag, Tooltip } from "antd";
import Link from "next/link";
import React from "react";
import formatDate from "@/utils/formatDate";
const { Column } = Table;
const FestivalTable = ({ data, handleDelete }) => {
  return (
    <div>
      <Table dataSource={data} rowKey="id" pagination={false}>
        <Column title="Tên lễ hội" dataIndex="name" key="name" />
        <Column
          title="Ngày bắt đầu"
          dataIndex="start_date"
          key="start_date"
          render={(start_date) => (
            <>
              <p>{formatDate(start_date)}</p>
            </>
          )}
        />
        <Column
          title="Ngày kết thúc"
          dataIndex="end_time"
          key="end_time"
          render={(end_time) => (
            <>
              <p>{formatDate(end_time)}</p>
            </>
          )}
        />

        <Column
          title="Trạng thái lễ hội"
          dataIndex="status"
          key="status"
          render={(status) => (
            <>
              {status === 1 ? (
                <Tag color="green">Hoạt động</Tag>
              ) : (
                <Tag color="red">Tạm ngưng hoạt động</Tag>
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
              <Tooltip title="Xem chi tiết lễ hội">
                <Link href={`festivals/${id}`} className="hover:text-blue-400">
                  <EyeFilled />
                </Link>
              </Tooltip>

              <a
                className="hover:text-red-600"
                onClick={() => handleDelete(id)}
              >
                <Tooltip title="Xóa lễ hội">
                  {" "}
                  <DeleteFilled />
                </Tooltip>
              </a>

              <Tooltip title="Sửa lễ hội">
                <Link
                  className="hover:text-yellow-400"
                  href={`festivals/updateFestival/${id}`}
                >
                  {" "}
                  <SignatureFilled />
                </Link>
              </Tooltip>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default FestivalTable;
