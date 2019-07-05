import React, { Component } from 'react'
import Axios from 'axios';

export default class extends Component {
  constructor(props) {
    super(props);
    // console.log('hhhh', props);

    this.state = {
      optionList: [
        {
          roomname: '1234',
          roomid: '1234'
        },
        {
          roomname: '1235',
          roomid: '1235'
        },
        {
          roomname: '1236',
          roomid: '1236'
        }
      ],
      value: '',
      optionValue: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  };
  componentDidMount() {
    this.getOptions();
  }
  onChange(e) {
    console.log(e.target.value)
    this.setState({
      value: e.target.value
    })
    this.props.setRoomId(e.target.value);
  };
  onSelectChange(e) {
    this.setState({
      value: e.target.value
    })
    this.props.setRoomId(e.target.value);
  }
  getOptions() {
    const url = 'http://125.124.143.31:8888/ssm/getroom';
    Axios.get(url).then(res => {
      console.log(res.data);
      console.log("发送请求成功");
      this.setState({
        optionList: res.data
      });
      console.log("获取房间号", res.data);
    }).catch(err => {
      console.log(err);
    });
  };

  render() {
    const {
      placeholder,
    } = this.props;
    return (
      <div>
        {/* <input style={
          {
            width: '105px',
            height: '25px',
            border: '1px solid #00CED1',
          }
        } 
        onChange={this.onSelectChange} 
        value={this.state.value} /> */}

        <input
          style={
            {
              position: 'absolute',
              width: '105px',
              height: '25px',
              border: '1px solid #00CED1',
            }
          }
          onChange={this.onSelectChange} 
          value={
            this.state.value
          }
          placeholder={
            placeholder
          }
        />
        <select style={{ width: '120px', height: '25px' }} defaultValue={""} onChange={this.onSelectChange} value={this.state.value} >
          <option value={""} disabled style={{display:'none'}}></option>
          {this.state.optionList.map(ele => {
            return (
              <option key={ele.roomid} value={ele.roomid}> 
                {`${ele.roomname}`}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
};