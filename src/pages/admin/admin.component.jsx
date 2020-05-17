import React from 'react';
import {
	Admin,
	Resource,
	List,
	Datagrid,
	TextField,
	EmailField,
} from 'react-admin';
import jsonServerProvider from "ra-data-json-server";
import { withRouter } from 'react-router-dom';

import './admin.styles.scss';

const dataProvider =
	jsonServerProvider("https://jsonplaceholder.typicode.com");

const AdminPage = ({ history }) =>  {
	console.log(history)
	return (
		<Admin dataProvider={dataProvider} history={history} >
			<Resource name="users" list={UserList} />
		</Admin>
	);
};

// export default withRouter(AdminPage);

const UserList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="address.street" />
      <TextField source="phone" />
      <TextField source="website" />
      <TextField source="company.name" />
    </Datagrid>
  </List>
);

export default UserList;