import React from 'react';
import { Link } from 'react-router';
import Transmit from 'react-transmit';
import Promise from 'bluebird';
import 後端 from '../../後端';
import './名姓.css';
import { browserHistory } from 'react-router';
var superagent = require('superagent-promise')(require('superagent'), Promise);

import Debug from 'debug';
import { runInThisContext } from 'vm';
var debug = Debug('itaigi:名姓');

class 名姓 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount(){
    if(this.props.params.senn!=""||this.props.params.mia!=""){
      superagent.get('https://miasenn.xn--v0qr21b.xn--kpry57d/%E6%9D%8E/%E5%B0%8D/')
      .then(({ body }) => this.setState(body))
      .catch((err) => debug("error"));
    }
  }
  render() {
      return (
      <div className='mia main ui text container'>
        <form onSubmit={this.tsha.bind(this)}>
          <label htmlFor="senn" >姓</label> 
          <input type="text" name="senn" defaultValue={this.props.params.senn} ref={ input => this.senn = input }/><br/>
          <label htmlFor="mia">名</label>
          <input type="text" name="mia" defaultValue={this.props.params.mia} ref={ input => this.mia = input }/><br/>
          <input type="submit" value="送出"/>
        </form>
        {this.state.Mia}
  
      </div>
      );
  }
  tsha(event) {
    event.preventDefault();
    browserHistory.replace('/name/' + this.senn.value + '/' +  this.mia.value);
    debug(this.senn.value + '/' + this.mia.value);
  }
}

名姓.propTypes = {
  params: React.PropTypes.object,
  查怎樣講: React.PropTypes.func,
};

export default  名姓;
