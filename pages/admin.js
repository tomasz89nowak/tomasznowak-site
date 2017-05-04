import React from 'react';
import { bindActionCreators } from 'redux';
import Link from 'next/link';
import withRedux from 'next-redux-wrapper';
import {initStore} from '../store';

import {Loader} from '../utilities';

import Head from 'next/head';
import Header from '../Components/Header';
import AdminContainer from '../Components/AdminContainer';
import {ArticlesList} from '../Components/Administration';
import {UsersList} from '../Components/Administration';
import {SkillsList} from '../Components/Administration';
import {AboutData} from '../Components/Administration';

import {getArticles} from '../ducks/articles';
import {getUsers} from '../ducks/users';
import {getAbout} from '../ducks/about';
import {getSkills} from '../ducks/skills';


class Admin extends React.Component {
  constructor() {
    super();
    this.getActiveTab = this.getActiveTab.bind(this);
  }
  static getInitialProps({store, isServer}) {
    return {};
  }

  getActiveTab(tabName) {
    if(this.props.url.query.tab === tabName) {
      return 'active';
    }
    return '';
  }

  fetchData = () => {
    const {dispatch} = this.props;
    return {
      articles: dispatch.bind(this, getArticles()),
      users: dispatch.bind(this, getUsers()),
      about: dispatch.bind(this, getAbout()),
      skills: dispatch.bind(this, getSkills())
    }
  };

  componentDidMount(){
    const {url: {query: {tab}}} = this.props;
    if(typeof this.fetchData()[this.props.url.query.tab] === 'function') {
      this.fetchData()[tab]()
    }
  }

  componentWillReceiveProps(nextProps) {
    const tab = this.props.url.query.tab;
    const nextTab = nextProps.url.query.tab;
    if(tab !== nextTab) {
      if(typeof this.fetchData()[nextTab] === 'function') {
        this.fetchData()[nextTab]()
      }
    }
  }


  render() {
    const {url, articles, users, about, skills, dispatch} = this.props;
    return (
      <AdminContainer>
        <div className="sm-4 admin__sidebar">
          <div className="panel">
            <div>
              <Link href="/admin?tab=users"><a className={this.getActiveTab('users')}>użytkownicy</a></Link>
              <Link href="/admin?tab=articles"><a className={this.getActiveTab('articles')}>artykuły</a></Link>
              <Link href="/admin?tab=about"><a className={this.getActiveTab('about')}>O mnie</a></Link>
              <Link href="/admin?tab=skills"><a className={this.getActiveTab('skills')}>Umiejętności</a></Link>
            </div>
          </div>
        </div>

        <div className="sm-8">
          <div className="panel">
            <div className="panel-body">
              <Tab tab={url.query.tab} name={undefined}>Witaj w administracji.</Tab>
              <Tab tab={url.query.tab} name="users"><UsersList users={users} dispatch={dispatch} /></Tab>
              <Tab tab={url.query.tab} name="articles"><ArticlesList articles={articles} dispatch={dispatch} /></Tab>
              <Tab tab={url.query.tab} name="about"><AboutData about={about} dispatch={dispatch} /></Tab>
              <Tab tab={url.query.tab} name="skills"><SkillsList skills={skills} dispatch={dispatch} /></Tab>
            </div>
          </div>
        </div>

      </AdminContainer>
    )
  }
}

const Tab = ({tab, name, children}) => {
  if(tab === name) {
    return <div>{children}</div>;
  } else {
    return null;
  }
};

function mapState(state){
  return {
    auth: state.auth.result,
    articles: state.articles.result || [],
    users: state.users.result || [],
    about: state.about.result || {},
    skills: state.skills.result || []
  }
}

export default withRedux(initStore, mapState)(Admin);