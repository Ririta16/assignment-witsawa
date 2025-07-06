import { Dropdown, Modal, Table } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import type { TableProps } from "antd";
import { useState } from "react";
import { mockData } from "../data/MockData";
import ModalDelete from "./ModalDelete";
import ModalDeleteConfirm from "./ModalDeleteConfirm";
import FormEdit from "./FormEdit";
import ModalEdit from "./ModelEdit";
import ModalEditConfirm from "./ModalEditConfirm";

export interface TableListProps {
  roleFilter?: string;
  searchValue?: string;
  dataSource?: DataType[];
  onDeleteUser?: (userKey: number) => void;
  onEditUser?: (user: DataType) => void;
}

export interface DataType {
  key: number;
  title: string;
  name: string;
  surname: string;
  role: string;
  phone: string;
  email: string;
}

function TableList({
  roleFilter,
  searchValue,
  dataSource,
  onDeleteUser,
  onEditUser,
}: TableListProps) {
  const data = dataSource || mockData;
  const [selectedUser, setSelectedUser] = useState<DataType | null>(null);

  {/***Modal Delete***/}
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalDeleteConfirmOpen, setIsModalDeleteConfirmOpen] =
    useState(false);
  const showModalDelete = (user: DataType) => {
    setSelectedUser(user);
    setIsModalDeleteOpen(true);
  };
  const handleDeleteCancel = () => {
    setIsModalDeleteOpen(false);
    setSelectedUser(null);
  };
  const handleConfirmDeleteUser = () => {
    if (selectedUser && onDeleteUser) {
      onDeleteUser(selectedUser.key);
    }
    setIsModalDeleteConfirmOpen(false);
    setSelectedUser(null);
  };

  {/***Modal Edit***/}
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalEditConfirmOpen, setIsModalEditConfirmOpen] = useState(false);
  const [valueEditUser, setValueEditUser] = useState<DataType | null>(null);

  const showModalEdit = (user: DataType) => {
    setSelectedUser(user);
    setIsEditFormOpen(true);
  };
  const handleFormEditSave = (editedUser: DataType) => {
    setValueEditUser(editedUser);
    setIsEditFormOpen(false);
    setIsModalEditOpen(true);
  };
  const handleModalEditSave = () => {
    if (valueEditUser && onEditUser) {
      onEditUser(valueEditUser);
    }
    setIsModalEditOpen(false);
    setIsModalEditConfirmOpen(true);
    setValueEditUser(null);
    setSelectedUser(null);
  };
  const handleEditConfirmOk = () => {
    setIsModalEditConfirmOpen(false);
  };

  {/***Munu Dropdown***/}
  const items = (user: DataType): MenuProps["items"] => [
    {
      label: (
        <div
          onClick={() => showModalEdit(user)}
          className="text-[16px] flex flex-row items-center gap-[10px] h-[56px]"
        >
          <EditOutlined />
          <div>Edit</div>
        </div>
      ),
      key: 0,
    },
    {
      label: (
        <div
          onClick={() => showModalDelete(user)}
          className="text-[red] text-[16px] flex flex-row items-center gap-[10px] h-[56px]"
        >
          <DeleteOutlined />
          <div>Delete</div>
        </div>
      ),
      key: 1,
    },
  ];

  {/***Select Filter***/}
  let filteredData =
    !roleFilter || roleFilter === "All"
      ? data
      : data.filter((item) => item.role === roleFilter);

  {/***Search***/}
  if (searchValue && searchValue.trim() !== "") {
    filteredData = filteredData.filter((item) =>
      item.name.toLowerCase().includes(searchValue.trim().toLowerCase())
    );
  }

  {/***Table***/}
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "No.",
      key: "index",
      render: (_, _record, index) => index + 1,
    },
    {
      title: "Name",
      render: (_, record) => {
        const fullName = `${record.title || ""} ${record.name} ${
          record.surname || ""
        }`;
        return fullName.trim();
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone: string) => {
        if (!phone) return "";
        const cleaned = phone.replace(/\D/g, "");
        if (cleaned.length !== 10) return phone;
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
          6
        )}`;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Dropdown
          menu={{ items: items(record) }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <button className="flex gap-4 cursor-pointer text-[#5D59EB] text-[18px]">
            <EllipsisOutlined />
          </button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <Table<DataType> columns={columns} dataSource={filteredData} />
      <ModalDelete
        isModalDeleteOpen={isModalDeleteOpen}
        onCancel={handleDeleteCancel}
        onDeleteUser={() => {
          setIsModalDeleteOpen(false);
          setIsModalDeleteConfirmOpen(true);
        }}
        user={selectedUser}
      />
      <ModalDeleteConfirm
        onOk={handleConfirmDeleteUser}
        open={isModalDeleteConfirmOpen}
      />

      <Modal
        title="Edit User"
        open={isEditFormOpen}
        footer={null}
        onCancel={() => setIsEditFormOpen(false)}
        className="formedit"
      >
        <FormEdit
          onCancel={() => setIsEditFormOpen(false)}
          user={selectedUser}
          onEditUser={handleFormEditSave}
        />
      </Modal>
      <ModalEdit
        isModalEditOpen={isModalEditOpen}
        onCancel={() => setIsModalEditOpen(false)}
        onSave={handleModalEditSave}
      />
      <ModalEditConfirm
        onOk={handleEditConfirmOk}
        open={isModalEditConfirmOpen}
      />
    </div>
  );
}

export default TableList;
