import { Button, Form, Input, type FormProps } from "antd";
import logo from "../assets/Artboard 12@3x 2.png";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

function Login() {
  type FieldType = {
    email?: string;
    password?: string;
  };

  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = () => {
    navigate("/home");
  };

  return (
    <div className="loginpage w-full min-h-screen h-full flex flex-row items-center">
      {/* Leftside*/}
      <div className="leftside w-full min-h-screen flex flex-col items-center justify-center rounded-r-[56px]">
        <div className="text-[#112D75] text-[42px] font-[600] w-[391px]">
          Login
        </div>

        <Form
          className="w-[391px] !mt-[37px] text-center"
          name="login"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email" },
              { type: "email", message: "Please input a valid email" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              className="h-[40px]"
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password" },
              {
                min: 6,
                message: "Password must be at least 6 characters",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              className="h-[40px]"
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              onClick={() => onFinish}
              className="buttonlogin"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Rightside*/}
      <div className="rightside w-full min-h-screen flex items-center justify-center">
        <img src={logo} className="w-[386px]" />
      </div>
    </div>
  );
}

export default Login;
