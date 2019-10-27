import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import App from './App';
import getMockStore from './test-utils/mocks';
import { history } from './store/store';

const stubInitUser = {};
const stubInitMatch = {
  hot: [],
  new: [],
  recommend: [],
};
const mockStore = getMockStore(stubInitUser, stubInitMatch);

describe('App', () => {
  it('renders without crashing', () => {
    const app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
    const component = mount(app);
    expect(component.find('.HomePage').length).toBe(1);
  });
});
