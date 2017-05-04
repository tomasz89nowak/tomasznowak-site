import React from 'react';
import {getDate} from '../../utilities';
import Link from 'next/link';

import {deleteSkill} from '../../ducks/skills';

class SkillsList extends React.Component {
  static getInitialProps() {
    return {};
  }

  delSkill = (id) => {
    this.props.dispatch(deleteSkill(id));
  };

  render() {
    const {skills = []} = this.props;
    return (
      <div className="admin__skills-list">
        <Link href="/create-skill"><a className="btn-primary form-group">Utwórz nowy</a></Link>
        {skills.map(skill => {
          return (
            <Skill
              key={skill._id}
              skill={skill}
              delSkill={this.delSkill}
            />
          )
        })}
      </div>
    )
  }
}

const Skill = ({skill, delSkill}) => {

  function del() {
    delSkill(skill._id);
  }

  return (
    <div className="panel">
      <div className="admin__skill">
        <b>{skill.title}</b>
        <small>Utworzono: {getDate(skill.createdAt)}</small>
        <small>Zaktualizowano: {getDate(skill.updatedAt)}</small>
        <div><b>Nazwa: {skill.name}</b></div>
        <div><b>Progress: {skill.progress}</b></div>

      </div>
      <div className="panel-footer text-right">
        <Link href={`/edit-skill?id=${skill._id}`}><a className="btn-primary">Edytuj</a></Link>
        <button className="btn-secondary" onClick={del}>Usuń</button>
      </div>
    </div>
  )
};

export default SkillsList;