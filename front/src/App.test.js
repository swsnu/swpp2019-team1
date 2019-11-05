import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import App from './App';
import getMockStore from './test-utils/getMockStore';
import { history } from './store/store';

const stubInitUser = {
  isSignedIn: 0,
};
const stubInitMatch = {
  hot: [],
  new: [],
  recommend: [],
};
const mockStore = getMockStore(stubInitUser, stubInitMatch);

describe('App', () => {
  it('should render', async () => {
    const app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
    const component = mount(app);
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(component.find('.App').length).toBe(1);
    expect(component.find('.HomePage').length).toBe(1);
  });
});
