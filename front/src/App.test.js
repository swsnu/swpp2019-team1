import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import App from './App';
import getMockStore from './test-utils/getMockStore';
import { history } from './store/store';

const stubInitUser = {
  currentUser: null,
  selectedUser: null,
};
const stubInitNoUser = {
  currentUser: { id: 1 },
  selectedUser: null,
};
const stubInitMatch = {
  hot: [],
  new: [],
  recommend: [],
  category: '',
  location: '',
  title: '',
};
const mockStore = getMockStore(stubInitUser, stubInitMatch);
const mockStoreNoUser = getMockStore(stubInitNoUser, stubInitMatch);

describe('App', () => {
  beforeEach(() => {
    jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });
  it('should render', async () => {
    const app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
    const appNoUser = (
      <Provider store={mockStoreNoUser}>
        <App history={history} />
      </Provider>
    );
    const component = mount(app);
    await new Promise(resolve => setTimeout(resolve, 100)).catch(() => {});

    expect(component.find('.App').length).toBe(1);
    expect(component.find('.HomePage').length).toBe(1);

    const componentNoUser = mount(appNoUser);
    await new Promise(resolve => setTimeout(resolve, 100)).catch(() => {});

    expect(componentNoUser.find('.App').length).toBe(1);
    expect(componentNoUser.find('.HomePage').length).toBe(1);
  });
});
