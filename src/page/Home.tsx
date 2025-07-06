import { Button, Input, Layout, Modal } from "antd";
import { useState } from "react";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import TableList, { type DataType } from "../component/TableList";
import { Content } from "antd/es/layout/layout";
import Sidebar from "../component/Sidebar";
import profile from "../assets/Vector (2).png";
import { Select } from "antd";
import FormAdd from "../component/FormAdd";
import { mockData } from "../data/MockData";

export interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  dateofbirth: string;
  phone: string;
  role: string;
  title: string;
}

function Home() {
  {/***ShowModalAdd***/}
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const showModalAdd = () => {
    setIsModalAddOpen(true);
  };

  {/***Select***/}
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const handleChange = (value: string) => {
    setRoleFilter(value);
  };

  {/***Search***/}
  const [searchText, setSearchText] = useState<string>("");
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const [searchValue, setSearchValue] = useState<string>("");
  const handleSearch = () => {
    setSearchValue(searchText);
  };

  {/***AddUser***/}
  const [users, setUsers] = useState(mockData);
  const handleAddUser = (user: User) => {
    setUsers((prevUsers) => {
      const newUser = {
        ...user,
        key: prevUsers.length + 1,
      };
      return [...prevUsers, newUser];
    });
  };

  {/***DeleteUser***/}
  const handleDeleteUser = (userKey: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.key !== userKey));
  };
  
  {/***EditUser***/}
  const handleEditUser = (editedUser: DataType) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.key === editedUser.key ? { ...user, ...editedUser } : user
      )
    );
  };
  
  return (
    <Layout className="home">
      <Sidebar />
      <Content>
        <div className="home min-h-screen w-full h-full !pt-[50px] !px-[34px] !pb-[20px]">
          {/***Header***/}
          <div className="flex flex-row items-center justify-between">
            <div className="font-[600] text-[32px] text-[#112D75] mb-4">
              User List
            </div>
            <div className="flex gap-[9px]">
              <img src={profile} />
              <div className="text-[#112D75] text-[16px] font-medium">
                Nantiya Kaewta
              </div>
            </div>
          </div>

          {/***Action***/}
          <div className="!mt-[34px] flex justify-between items-center !mb-[26px] gap-[15px]">
            <Select
              className="w-[270px] !h-[40px] min-w-[270px] selectrole"
              defaultValue={"All"}
              onChange={handleChange}
              value={roleFilter}
              options={[
                { value: "All", label: "All" },
                { value: "Entrepreneur", label: "Entrepreneur" },
                { value: "Investor", label: "Investor" },
                {
                  value: "Investor/Entrepreneur",
                  label: "Investor/Entrepreneur",
                },
              ]}
            />

            <Input
              className="!w-full !h-[40px] !rounded-[20px] !px-[23px]"
              placeholder="Search"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={handleSearchInput}
              allowClear
            />
            <Button className="buttongradiant" onClick={handleSearch}>
              Search
            </Button>

            <Button className="buttongradiant" onClick={showModalAdd}>
              <PlusCircleOutlined /> Add User
            </Button>
          </div>

          {/***Table***/}
          <TableList
            roleFilter={roleFilter}
            searchValue={searchValue}
            dataSource={users}
            onDeleteUser={handleDeleteUser}
            onEditUser={handleEditUser}
          />
        </div>

        {/***Modal***/}
        <Modal
          title="Add User"
          open={isModalAddOpen}
          footer={null}
          onCancel={() => setIsModalAddOpen(false)}
          className="formadd"
        >
          <FormAdd
            onCancel={() => setIsModalAddOpen(false)}
            onAddUser={handleAddUser}
          />
        </Modal>
      </Content>
    </Layout>
  );
}

export default Home;
