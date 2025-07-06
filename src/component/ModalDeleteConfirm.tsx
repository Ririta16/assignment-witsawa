import { Button, Modal, Result } from "antd";

export interface ModalDeleteConfirmProps {
  onOk: () => void;
  open: boolean;
}

function ModalDeleteConfirm({ onOk, open }: ModalDeleteConfirmProps) {
  return (
    <Modal closable={false} footer={null} open={open}>
      <Result
        status="success"
        title="User Deleted"
        subTitle="User has been successfully deleted."
        extra={
          <Button
            onClick={onOk}
            className="w-[276px] !mt-[20px] !bg-[#20BA5B] !font-[600] !text-white !rounded-[20px] !h-[38px]"
          >
            OK
          </Button>
        }
      />
    </Modal>
  );
}

export default ModalDeleteConfirm;
