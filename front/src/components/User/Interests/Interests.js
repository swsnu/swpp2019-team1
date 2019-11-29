import React from 'react';
import PropTypes from 'prop-types';
import { Cascader } from 'antd';
import { categories } from '../../../store/staticData/categories';

const Interests = ({ interestArray, onChangeInterest }) => (
  <div className="Interests">
    <span>
      {interestArray[0]}
      &nbsp;
      <Cascader
        options={categories}
        onChange={(value, selectedOptions) =>
          onChangeInterest(value, selectedOptions, 0)
        }
      >
        <button type="button">Change Interest</button>
      </Cascader>
      <p />
    </span>
    <span>
      {interestArray[1]}
      &nbsp;
      <Cascader
        options={categories}
        onChange={(value, selectedOptions) =>
          onChangeInterest(value, selectedOptions, 1)
        }
      >
        <button type="button">Change Interest</button>
      </Cascader>
      <p />
    </span>
    <span>
      {interestArray[2]}
      &nbsp;
      <Cascader
        options={categories}
        onChange={(value, selectedOptions) =>
          onChangeInterest(value, selectedOptions, 2)
        }
      >
        <button type="button">Change Interest</button>
      </Cascader>
    </span>
  </div>
);

Interests.propTypes = {
  interestArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeInterest: PropTypes.func.isRequired,
};

Interests.defaultProps = {};

export default Interests;
