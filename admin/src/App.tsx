import { Layout } from "./Layout";
import { Admin, Resource } from "react-admin";
import dataProvider from "./dataProvider";
import { UserList } from "./users/UserList";
import { UserEdit } from "./users/UserEdit";
import { UserCreate } from "./users/UserCreate";
import authProvider from "./AuthProvider";
// import { MyLayout } from "./CustomLayout";

export const App = () => (
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
);
