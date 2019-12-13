import React from 'react';
import PropTypes from 'prop-types';
import { Button, Cascader, Icon } from 'antd';
import { categories } from '../../../store/staticData/categories';

const Interests = ({
  isEdit,
  isEditable,
  buttonText,
  onChangeInterest,
  onClickButton,
  valueList,
}) => (
  <div className="Interests">
    <span>
      <Cascader
        options={categories}
        defaultValue={valueList[0]}
        changeOnSelect
        onChange={onChangeInterest(0)}
        disabled={!isEdit}
        style={{ color: 'black' }}
        allowClear={isEdit}
        placeholder="Not Selected"
        suffixIcon={
          isEdit ? (
            false
          ) : (
            <Icon type="heart" theme="twoTone" twoToneColor="#ffffff" />
          )
        }
      />
      <p />
    </span>
    <span>
      <Cascader
        options={categories}
        defaultValue={valueList[1]}
        changeOnSelect
        onChange={onChangeInterest(1)}
        disabled={!isEdit}
        style={{ color: 'black' }}
        allowClear={isEdit}
        placeholder="Not Selected"
        suffixIcon={
          isEdit ? (
            false
          ) : (
            <Icon type="heart" theme="twoTone" twoToneColor="#ffffff" />
          )
        }
      />
      <p />
    </span>
    <span>
      <Cascader
        options={categories}
        defaultValue={valueList[2]}
        changeOnSelect
        onChange={onChangeInterest(2)}
        disabled={!isEdit}
        style={{ color: 'black' }}
        allowClear={isEdit}
        placeholder="Not Selected"
        suffixIcon={
          isEdit ? (
            false
          ) : (
            <Icon type="heart" theme="twoTone" twoToneColor="#ffffff" />
          )
        }
      />
    </span>
    {isEditable && (
      <Button type="primary" onClick={() => onClickButton(valueList)}>
        {buttonText}
      </Button>
    )}
  </div>
);
Interests.propTypes = {
  valueList: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  isEditable: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
  onChangeInterest: PropTypes.func.isRequired,
  onClickButton: PropTypes.func.isRequired,
};
Interests.defaultProps = {};

export default Interests;
