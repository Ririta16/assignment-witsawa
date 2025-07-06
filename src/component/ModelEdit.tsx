import { Button, Modal, Result } from "antd";

export interface ModalEditProps {
  isModalEditOpen: boolean;
  onCancel: () => void;
  onSave: () => void;
}

function ModalEdit({ isModalEditOpen, onCancel, onSave }: ModalEditProps) {
  return (
    <Modal closable={false} footer={null} open={isModalEditOpen}>
      <Result
        title="Save Changes?"
        subTitle="Do you want to save your user updates?"
        extra={
          <div className="flex flex-row gap-4">
            <Button
              onClick={onCancel}
              className="w-full !rounded-[20px] !h-[38px]"
            >
              Cancel
            </Button>
            <Button
              onClick={onSave}
              className="!bg-[#F87247] w-full !h-[38px] !rounded-[20px] !font-[600] !text-white"
            >
              Save
            </Button>
          </div>
        }
      />
    </Modal>
  );
}

export default ModalEdit;
