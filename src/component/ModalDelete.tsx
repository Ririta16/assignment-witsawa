import { Button, Modal, Result } from "antd";
import type { DataType } from "./TableList";

export interface ModalDeleteProps {
  isModalDeleteOpen: boolean;
  onCancel: () => void;
  onDeleteUser: () => void;
  user: DataType | null;
}

function ModalDelete({
  isModalDeleteOpen,
  onCancel,
  onDeleteUser,
}: ModalDeleteProps) {
  return (
    <Modal
      closable={false}
      open={isModalDeleteOpen}
      footer={null}
      onCancel={onCancel}
    >
      <Result
        title="Delete User?"
        subTitle="Are you sure you want to delete this user? This action cannot be undone, and the user will be unable to login."
        extra={
          <div className="flex flex-row gap-4">
            <Button
              onClick={onCancel}
              className="w-full !rounded-[20px] !h-[38px]"
            >
              Cancel
            </Button>
            <Button
              onClick={onDeleteUser}
              className="!bg-[#F87247] w-full !h-[38px] !rounded-[20px] !font-[600] !text-white"
            >
              Delete User
            </Button>
          </div>
        }
      />
    </Modal>
  );
}

export default ModalDelete;
