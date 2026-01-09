import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Popconfirm,
  message,
  Typography
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useAddUserMutation,
  useUpdateUserMutation
} from "../store/services/usersApi";
import type { User } from "../types/User";
import UserForm from "./UserForm";
import type { FormValues } from "./UserForm";
import UserDetail from "./UserDetail";
import { useDebounce } from "../hooks/useDebounce";

const { Title } = Typography;
const { Search } = Input;

const UserList: React.FC = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Filter users based on search text
  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedSearchText.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id).unwrap();
      message.success("User deleted successfully");
    } catch (error) {
      console.error("Delete failed", error);
      message.error("Failed to delete user");
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleView = (user: User) => {
    setViewingUser(user);
    setIsDetailOpen(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (values: FormValues) => {
    setFormLoading(true);
    try {
      const { companyName, ...rest } = values;
      const userData = {
        ...rest,
        company: {
          name: companyName,
          catchPhrase: editingUser?.company?.catchPhrase || "",
          bs: editingUser?.company?.bs || ""
        }
      };

      if (editingUser) {
        await updateUser({ id: editingUser.id, ...userData }).unwrap();
        message.success("User updated successfully");
      } else {
        await addUser(userData).unwrap();
        message.success("User added successfully");
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Submit failed", error);
      message.error("Failed to save user");
    } finally {
      setFormLoading(false);
    }
  };

  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Company",
      dataIndex: ["company", "name"],
      key: "company"
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            className="text-blue-500 hover:text-blue-700"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="text-green-500 hover:text-green-700"
          />
          <Popconfirm
            title="Delete the user"
            description="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      )
    }
  ];

  if (isError) return <div>Error loading users.</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <Title level={2} className="!m-0">
          User Management
        </Title>
        <div className="flex gap-4 w-full md:w-auto">
          <Search
            placeholder="Search by name or email"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
            className="w-full md:w-64"
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Add User
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
        scroll={{ x: true }}
      />

      <UserForm
        open={isFormOpen}
        onCancel={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialValues={editingUser}
        loading={formLoading}
      />

      <UserDetail
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        user={viewingUser}
      />
    </div>
  );
};

export default UserList;
