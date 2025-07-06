import { Button, DatePicker, Form, Input, Select } from "antd";
import { CalendarOutlined, LockOutlined } from "@ant-design/icons";
import type { User } from "../page/Home";
const { Option } = Select;

interface FormAddProps {
  onCancel: () => void;
  onAddUser: (user: User) => void;
}

function FormAdd({ onCancel, onAddUser }: FormAddProps) {
  const [form] = Form.useForm();

  {
    /***SubmitForm***/
  }
  const onSubmit = (values: User) => {
    onAddUser(values);
    form.resetFields();
    onCancel();
  };

  return (
    <Form form={form} layout="vertical" name="adduser" onFinish={onSubmit}>
      <Form.Item
        name="role"
        label="Role"
        rules={[{ required: true, message: "Please select role" }]}
      >
        <Select placeholder="Select role" className="!h-[40px]">
          <Option value="Entrepreneur">Entrepreneur</Option>
          <Option value="Investor">Investor</Option>
          <Option value="Investor/Entrepreneur">Investor/Entrepreneur</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="title"
        label="Title Name"
        rules={[{ required: true, message: "Please select title name" }]}
      >
        <Select placeholder="Select title name" className="!h-[40px]">
          <Option value="Mr.">Mr.</Option>
          <Option value="Ms.">Ms.</Option>
          <Option value="Mrs.">Mrs.</Option>
        </Select>
      </Form.Item>

      <div className="flex flex-row justify-between">
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your name",
            },
          ]}
        >
          <Input className="!w-[220px] !h-[40px]" placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="surname"
          label="Surname"
          rules={[
            {
              required: true,
              message: "Please input your surname",
            },
          ]}
        >
          <Input className="!w-[220px] !h-[40px]" placeholder="Surname" />
        </Form.Item>
      </div>

      <Form.Item
        label="Date of Birth"
        name="dateofbirth"
        rules={[
          {
            required: true,
            message: "Please input your date of birth",
          },
        ]}
      >
        <DatePicker
          className="w-full !h-[40px]"
          prefix={<CalendarOutlined className="!text-[#112D75]" />}
        />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          { required: true, message: "Please input your phone number" },
          {
            pattern: /^[0-9]{10}$/,
            message: "Phone number must be 10 digits",
          },
        ]}
      >
        <Input placeholder="Phone number" className="h-[40px]" maxLength={10} />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please input your email" },
          { type: "email", message: "Please input a valid email" },
        ]}
      >
        <Input placeholder="Email" className="h-[40px]" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: "Please input your password" },
          {
            min: 6,
            message: "Password must be at least 6 characters",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="!text-[#112D75]" />}
          placeholder="Password"
          className="h-[40px]"
        />
      </Form.Item>

      <Form.Item
        name="confirmpassword"
        label="Confirm Password"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Please confirm your password",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Password do not match"));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="!text-[#112D75]" />}
          placeholder="Password"
          className="h-[40px]"
        />
      </Form.Item>

      <div className="flex flex-row justify-between gap-4 !mt-[35px]">
        <Button
          onClick={() => {
            form.resetFields();
            onCancel();
          }}
          className="w-full !h-[40px] !text-[16px] !rounded-[20px]"
        >
          Cancel
        </Button>
        <Button
          htmlType="submit"
          className="w-full !h-[40px] !text-white !font-[600] !text-[16px] !rounded-[20px] !bg-gradient-to-r from-[#173683] to-[#585ACD]"
        >
          Save
        </Button>
      </div>
    </Form>
  );
}

export default FormAdd;
