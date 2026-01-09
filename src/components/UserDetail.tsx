import React from "react";
import { Drawer, Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import type { User } from "../types/User";

interface UserDetailProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
}

const UserDetail: React.FC<UserDetailProps> = ({ user, open, onClose }) => {
  const items: DescriptionsProps["items"] = user
    ? [
        { label: "Name", children: user.name },
        { label: "Email", children: user.email },
        { label: "Phone", children: user.phone },
        { label: "Website", children: user.website },
        { label: "Company", children: user.company?.name },
        { label: "Catch Phrase", children: user.company?.catchPhrase },
        { label: "BS", children: user.company?.bs }
      ].filter((item) => item.children)
    : [];

  return (
    <Drawer title="User Details" open={open} onClose={onClose} width={500}>
      {user && <Descriptions column={1} bordered items={items} />}
    </Drawer>
  );
};

export default UserDetail;
