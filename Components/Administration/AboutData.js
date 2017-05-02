import React from 'react';
import {getDate} from '../../utilities';
import Link from 'next/link';

import {STATIC_URL} from '../../ENDPOINTS';

class AboutData extends React.Component {
  static getInitialProps() {
    return {};
  }

  render() {
    const {about = {}, about: {image = {}}} = this.props;
    return (
      <div className="admin__about-data">
        <Link href="edit-about"><a className="btn-primary">Edit</a></Link>
        <div className="text-center form-group">
          {image.path && <img src={STATIC_URL + image.path} width="200" alt=""/>}
        </div>
        <div>title: {about.title}</div>
        <div>name: {about.name}</div>
        last update: {getDate(about.updatedAt)}
        <hr/>
        <div>github: {about.github}</div>
        <div>facebook: {about.facebook}</div>
        <div>twitter: {about.twitter}</div>
        <div>linkedin: {about.linkedin}</div>
        <hr/>
        {about.text}
      </div>
    )
  }
}

export default AboutData;