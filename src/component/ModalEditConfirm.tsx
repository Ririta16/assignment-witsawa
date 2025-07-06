import { Button, Modal, Result } from "antd";

export interface ModalEditConfirmProps {
  onOk: () => void;
  open: boolean;
}

function ModalEditConfirm({ onOk, open }: ModalEditConfirmProps) {
  return (
    <Modal closable={false} footer={null} open={open}>
      <Result
        status="success"
        title="User Updated"
        subTitle="Your changes have been saved successfully."
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

export default ModalEditConfirm;
