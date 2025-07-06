import logo from "../assets/Artboard 12@3x 2.png";
import Sider from "antd/es/layout/Sider";
import { Menu, type MenuProps } from "antd";
import img_user from "../assets/Vector.png";
import logout from "../assets/Vector (1).png";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      label: (
        <div className="flex flex-row items-center gap-3">
          <img src={img_user} />
          <div className="text-[#112D75] font-[600] text-[16px]">User List</div>
        </div>
      ),
      key: 1,
    },
  ];

  return (
    <Sider className="!min-w-[260px] rounded-tr-[36px] !mt-[43px] !h-[calc(100vh-43px)]">
      <img
        src={logo}
        alt="Logo"
        className="flex !mt-[52px] w-auto h-auto !mx-auto"
      />
      <Menu
        className="!w-[243px] absolute !mt-[57px] rounded-l-[26px] right-[0px]"
        mode="inline"
        items={items}
      />
      <div
        onClick={() => navigate("/")}
        className="flex flex-row absolute bottom-[50px] left-[70px] gap-3 items-center text-white text-[16px] cursor-pointer"
      >
        <img src={logout} />
        <div>Logout</div>
      </div>
    </Sider>
  );
}

export default Sidebar;
