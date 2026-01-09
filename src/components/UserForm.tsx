import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import type { User } from "../types/User";

export interface FormValues {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  website: string;
}

interface UserFormProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: FormValues) => Promise<void>;
  initialValues?: User | null;
  loading?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  open,
  onCancel,
  onSubmit,
  initialValues,
  loading
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue({
          ...initialValues,
          companyName: initialValues.company?.name
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields();
    } catch (info) {
      console.log("Validate Failed:", info);
    }
  };

  return (
    <Modal
      title={initialValues ? "Edit User" : "Add User"}
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={loading}
      forceRender
    >
      <Form
        form={form}
        layout="vertical"
        name="userForm"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input the email!" },
            { type: "email", message: "The input is not valid E-mail!" }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: "Please input the phone number!" }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="companyName"
          label="Company"
          rules={[
            { required: true, message: "Please input the company name!" }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="website"
          label="Website"
          rules={[{ required: true, message: "Please input the website!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserForm;
