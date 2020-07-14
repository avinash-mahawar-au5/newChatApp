import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { sendChatMessages } from "../actions/app";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import "../styles/Chat.css";
class Chat extends Component {
  state = {
    textValue: "",
  };

  changeTextValue(e) {
    this.setState({
      textValue: e.target.value,
    });
  }

  submitChat = () => {
    const messageInfo = {
      message: this.state.textValue,
      username: this.props.username,
      currentChannel: this.props.currentChannel.value,
    };
    this.props.sendChatMessages(messageInfo);
  };
  render() {
    return (
      <div className=" chat">
        <div className=" row chatHeader">
          <h3 className="ml-5">{this.props.currentChannel.value}</h3>
        </div>
        <div className="row card d-flex ml-3 chatScreen">
          {[{ from: "user", msg: "Hello" }].map((chat, i) => {
            return (
              <div key={i} className="  indiChat d-flex align-items-center m-3">
                <Chip label={chat.from} className="m-2" />
                <Typography variant="h6">{chat.msg} </Typography>
              </div>
            );
          })}
        </div>
        <div className="chatbox row mt-2 card ml-3">
          <div className="chatInput col-10 align-items-center">
            <TextareaAutosize
              type="text"
              className="form-control"
              placeholder="type here..."
              onChange={(e) => this.changeTextValue(e)}
            />
          </div>
          <div className="chatButton col-2">
            <Button
              variant="contained"
              color="primary"
              endIcon={<SendIcon></SendIcon>}
              onClick={() => this.submitChat()}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const stateToProps = (state) => (
  console.log(state),
  {
    username: state.app.logged.username,
    currentChannel: state.app.currentChannel,
  }
);

const dispathToProps = (dispatch) => {
  return bindActionCreators({ sendChatMessages }, dispatch);
};
export default connect(stateToProps, dispathToProps)(Chat);
