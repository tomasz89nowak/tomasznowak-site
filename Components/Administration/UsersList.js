import React from 'react';
import {getDate} from '../../utilities';
import Link from 'next/link';

import {deleteUser} from '../../ducks/users';

class UsersList extends React.Component {
  static getInitialProps() {
    return {};
  }

  delUser = (id) => {
    this.props.dispatch(deleteUser(id));
  };

  render() {
    const {users = []} = this.props;
    return (
      <div className="admin__users-list">
        <Link href="/create-user"><a className="btn-primary form-group">Utwórz nowy</a></Link>
        {users.map(user => {
          return (
            <User
              key={user._id}
              user={user}
              delUser={this.delUser}
            />
          )
        })}
      </div>
    )
  }
}

const User = ({user, delUser}) => {

  function del() {
    delUser(user._id);
  }

  return (
    <div className="panel">
      <div className="admin__user">
        <b>{user.email}</b>
        <small>Utworzono: {getDate(user.createdAt)}</small>
        <small>Zaktualizowano: {getDate(user.updatedAt)}</small>
      </div>
      <div className="panel-footer text-right">
        <Link href={`/edit-user?id=${user._id}`}><a className="btn-primary">Edytuj</a></Link>
        <button className="btn-secondary" onClick={del}>Usuń</button>
      </div>
    </div>
  )
};

export default UsersList;