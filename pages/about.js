import React from 'react';
import Link from 'next/link';
import withRedux from 'next-redux-wrapper';
import {initStore} from '../store';
import {STATIC_URL} from '../ENDPOINTS';

import Head from 'next/head';

import Header from '../Components/Header';
import {Loader} from '../utilities';

import {getAbout} from '../ducks/about';
import {getSkills, deleteSkill} from '../ducks/skills';


class About extends React.Component {
  static getInitialProps(){
    return {};
  }

  componentDidMount(){
    this.props.dispatch(getAbout());
    if(this.props.skills.length === 0) {
      this.props.dispatch(getSkills());
    }
  }

  render(){
    const {url, about, skills, isFetching} = this.props;
    return (
      <div className="container">

        <Head>
          <title>Tomasz Nowak - frontend && javascript developer</title>
          <link href="./static/css/global.css" rel="stylesheet" type="text/css" />
          <link href="./static/css/about.css" rel="stylesheet" type="text/css" />
        </Head>

        <Header url={url.pathname} />
        <article>
          <div className="text-center md-6 md-offset-3 sm-10 sm-offset-1">
            <div className="panel about-panel">
              <div className="panel-heading">
                {about.image &&
                  <img src={STATIC_URL + about.image.path} width="200" height="200" className="about-image" />
                }
              </div>
              <div className="panel-body">
                <h1>{about.name}</h1>
                <h2>{about.title}</h2>
                <p>{about.text}</p>
              </div>
            </div>
          </div>
          <div className="text-center sm-12">
            <h2>Experience</h2>
          </div>
          {skills.map(skill =>
            <div key={skill._id} className="text-center md-4 sm-6">
              <div className="panel">
                <div className="panel-body">
                  <button onClick={()=>this.props.dispatch(deleteSkill(skill._id))}>delete</button>
                  <h3>{skill.name}</h3>
                  <Progress progress={skill.progress} />
                </div>
              </div>
            </div>

          )}
        </article>
        {isFetching && <Loader/>}
      </div>
    )
  }
}

function Progress({progress = 0}){
  return (
    <div className="skill-progress">
      <div className="indicator" style={{left: `${progress}%`}}></div>
      <div className="stage"><span>junior</span></div>
      <div className="stage"><span>regular</span></div>
      <div className="stage"><span>senior</span></div>
    </div>
  )
}

function mapState(state){
  return {
    about: state.about.result || {},
    skills: state.skills.result || [],
    isFetching: state.about.isFetching || state.skills.isFetching
  }
}

export default withRedux(initStore, mapState)(About);