import React from 'react';
import { Modal, Descriptions } from 'antd';
import type { User } from '../types/User';

interface UserDetailProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
}

const UserDetail: React.FC<UserDetailProps> = ({ user, open, onClose }) => {
  return (
    <Modal
      title="User Details"
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      {user && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
          <Descriptions.Item label="Website">{user.website}</Descriptions.Item>
          <Descriptions.Item label="Company">
            {user.company?.name}
          </Descriptions.Item>
          {user.company?.catchPhrase && (
             <Descriptions.Item label="Catch Phrase">
               {user.company.catchPhrase}
             </Descriptions.Item>
          )}
           {user.company?.bs && (
             <Descriptions.Item label="BS">
               {user.company.bs}
             </Descriptions.Item>
          )}
        </Descriptions>
      )}
    </Modal>
  );
};

export default UserDetail;
