import { Layout } from "./Layout";
import { Admin, Resource } from "react-admin";
import dataProvider from "./dataProvider";
import { UserList } from "./users/UserList";
import { UserEdit } from "./users/UserEdit";
import { UserCreate } from "./users/UserCreate";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}
    />
  </Admin>
);
