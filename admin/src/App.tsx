import { Layout } from "./Layout";
import { Admin, Resource } from "react-admin";
import dataProvider from "./dataProvider";
import { UserList } from "./users/UserList";
import { UserEdit } from "./users/UserEdit";
import { UserCreate } from "./users/UserCreate";
import authProvider from "./authProvider";

import { BrowserRouter } from "react-router-dom"; // ✅ Import Router
import IdleTimer from "./utils/IdleTimer"; // Import idle timer

// import { MyLayout } from "./CustomLayout";

export const App = () => (
  <BrowserRouter>
    <IdleTimer /> {/* This will track user activity */}
    <Admin
      layout={Layout}
      authProvider={authProvider}
      dataProvider={dataProvider}
    >
      <Resource
        name="users"
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
      />
    </Admin>
  </BrowserRouter>
);
