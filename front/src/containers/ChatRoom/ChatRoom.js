import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import {
  Chat,
  Channel,
  ChannelHeader,
  Thread,
  Window,
  MessageList,
  MessageInput,
} from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import * as actionCreators from '../../store/actions/index';

import 'stream-chat-react/dist/css/index.css';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
    this.client = new StreamChat('cj5mb4hpbmk6');
  }

  componentDidMount() {
    const { match, onGetMatch, onUnAuthorized } = this.props;
    onGetMatch(match.params.id).then(() => {
      const { currentUser } = this.props;
      if (currentUser) {
        const token = sessionStorage.getItem('token');
        this.client.setUser(
          {
            id: `user${currentUser.id}`,
            name: currentUser.username,
            image: currentUser.profilePicture,
          },
          token,
        );
        const { selected } = this.props;
        this.channel = this.client.channel(
          'messaging',
          `finalChannel${selected.id}`,
          {
            image: selected.matchThumbnail,
            name: selected.title,
          },
        );
      } else onUnAuthorized();
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    const { currentUser } = this.props;
    const { isLoading } = this.state;
    if (!currentUser || isLoading) return null;
    return (
      <div className="ChatRoom">
        <Chat client={this.client} theme="messaging light">
          <Channel channel={this.channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    selected: state.match.selected,
    currentUser: state.user.currentUser,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetMatch: mid => dispatch(actionCreators.getMatch(mid)),
    onUnAuthorized: () => dispatch(push(`/signin`)),
  };
};
ChatRoom.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  selected: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    matchThumbnail: PropTypes.string,
    hostUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
  }),
  onGetMatch: PropTypes.func.isRequired,
  onUnAuthorized: PropTypes.func.isRequired,
};
ChatRoom.defaultProps = { selected: undefined, currentUser: null };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatRoom);
