import React, { Component } from "react";
import "../styles/Profile.css";
import { Paper, Link } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import { fetchRooms } from "../actions/app";
import { createNewChannel } from "../actions/app";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Route } from "react-router";
import Chat from "../components/Chat";
import { setChannelName } from "../actions/app";
class Profile extends Component {
  state = {
    currentChannel: "",
  };

  componentDidMount() {
    this.props.fetchRooms();
  }
  // xfvgxffffffffffff
  changeInChannel(e) {
    this.setState({
      channer: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newRoom = {
      channel: this.state.channel,
    };
    console.log(newRoom);
    this.props.createNewChannel(newRoom);
  }
  // fffffffffff

  setCurrentChannel(havachannel) {
    this.props.setChannelName(havachannel);
  }

  render() {
    // console.log(this.props);
    return (
      <div className="profile">
        <div className="new">
          <div className="row appheader  ">
            <h4>Chat App</h4>
          </div>
          <Paper elevation={2} className="paper">
            <div className="col-4 m-2 channels ">
              {this.props.rooms &&
                this.props.rooms.map((room) => {
                  return (
                    <ListItem key={room._id} button>
                      <ListItemText
                        primary={room.roomName}
                        className="btn btn-primary"
                        onClick={(name) =>
                          this.setCurrentChannel(room.roomName)
                        }
                      />
                    </ListItem>
                  );
                })}
              <form onSubmit={this.handleSubmit}>
                <div className="row ml-5">
                  <TextField
                    name="channel"
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    onChange={(e) => this.changeInChannel(e)}
                  />
                </div>

                <div className="row ml-5">
                  <Button
                    variant="contained"
                    color="primary"
                    className="m-2"
                    type="submit"
                    startIcon={<Icon className="fa fa-plus-circle"></Icon>}
                  >
                    Send
                  </Button>
                </div>
              </form>
            </div>
            <div className="col-8 chat">
              {this.props.currentChannel || this.props.currentChannel ? (
                <div>
                  <Chat />
                </div>
              ) : (
                <div>
                  <h4>No Chat is available</h4>
                </div>
              )}
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

const stateToProps = (state) =>
  // console.log("staet in profile", state.app.logged.username),
  ({
    rooms: state.app.rooms,
    username: state.app.logged.username,
    currentChannel: state.app.currentChannel,
  });

const dispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchRooms,
      createNewChannel,
      setChannelName,
    },
    dispatch
  );
};

export default connect(stateToProps, dispatchToProps)(Profile);
