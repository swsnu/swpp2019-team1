import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import ChatRoom from './ChatRoom';
import getMockStore from '../../test-utils/getMockStore';
import { history } from '../../store/store';
import * as matchActionCreators from '../../store/actions/match';

jest.mock('stream-chat-react');
jest.mock('stream-chat');

const stubUser = {
  currentUser: {
    id: 1,
    username: 'TEST_USER',
  },
};
const stubNoUser = {
  currentUser: null,
};
const stubMatch = {
  selected: {
    id: 1,
    hostUser: {
      id: 1,
      username: 'TEST_HOST_USER',
    },
    title: 'TEST_TITLE',
    matchThumbnail: 'TEST_THUMBNAIL',
  },
};
const mockStore = getMockStore(stubUser, stubMatch);
const mockStoreNoUser = getMockStore(stubNoUser, stubMatch);

describe('<ChatRoom />', () => {
  let chatRoom;
  let chatRoomNoUser;
  let spyGetMatch;
  let spyHistoryPush;
  beforeEach(() => {
    const matchParams = {
      params: { id: 1 },
      path: '/match/:id/chatroom',
      url: '/match/1/chatroom',
    };
    chatRoom = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <ChatRoom match={matchParams} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    chatRoomNoUser = (
      <Provider store={mockStoreNoUser}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <ChatRoom match={matchParams} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetMatch = jest
      .spyOn(matchActionCreators, 'getMatch')
      .mockImplementation(() => {
        return () => {
          return new Promise(resolve => {
            resolve();
          });
        };
      });
    spyHistoryPush = jest.spyOn(history, 'push').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', async () => {
    const component = mount(chatRoom);
    await new Promise(resolve => setTimeout(resolve, 100));
    component.update();
    const wrapper = component.find('.ChatRoom');
    expect(wrapper.length).toBe(1);
    expect(spyGetMatch).toBeCalledTimes(1);
  });

  it('should call push when user is not authorized', async () => {
    const component = mount(chatRoomNoUser);
    await new Promise(resolve => setTimeout(resolve, 100));
    component.update();
    expect(spyHistoryPush).toBeCalledTimes(1);
  });
});
