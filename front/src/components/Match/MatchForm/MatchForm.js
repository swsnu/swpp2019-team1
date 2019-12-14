import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { Form, Input, FormItem, InputNumber } from 'formik-antd';
import { Cascader, Button, DatePicker } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';

import './MatchForm.css';
import GoogleMap from '../../Map/GoogleMap';

import { categories } from '../../../store/staticData/categories';
import ImageUpload from '../../ImageUpload/ImageUpload';
// const { RangePicker } = DatePicker;

const MatchSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  category: Yup.array(Yup.number().required('Required'))
    .nullable()
    .required('Required'),
  capacity: Yup.number()
    .nullable()
    .required('Required'),
  locationText: Yup.string(),
  additionalInfo: Yup.string(),
  timeBegin: Yup.object()
    .nullable()
    .required('Required!'),
  timeEnd: Yup.object()
    .nullable()
    .required('Required!'),
});
export const disableDate = (beginValue, endValue) => {
  if (!beginValue || !endValue) {
    return false;
  }
  return beginValue.valueOf() > endValue.valueOf();
};
const MatchForm = ({
  title,
  // matchThumbnail,
  category,
  capacity,
  locationText,
  // latitude and longitude will be implemented or removed after applying Google Map API
  locationLatitude,
  locationLongitude,
  timeBegin,
  timeEnd,
  additionalInfo,
  clickSubmit,
  submitButton,
  clickCancel,
}) => {
  return (
    <div className="MatchForm">
      <Formik
        initialValues={{
          title,
          category,
          capacity,
          locationText,
          timeBegin,
          timeEnd,
          // timeRange: [moment(timeBegin), moment(timeEnd)],
          additionalInfo,
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          clickSubmit(values);
        }}
        validationSchema={MatchSchema}
      >
        {({ setFieldValue, values }) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Form>
            <div className="MatchFormItem">
              <FormItem name="title" label="Title">
                <Input name="title" id="title" placeholder="Match Title" />
              </FormItem>
              <Form.Item name="matchThumbnail" label="Thumbnail" hasFeedback>
                <ImageUpload
                  fieldName="matchThumbnail"
                  setFieldValue={file => setFieldValue('matchThumbnail', file)}
                />
              </Form.Item>
              <Form.Item name="category" label="Category" hasFeedback>
                <Cascader
                  name="category"
                  options={categories}
                  defaultValue={category}
                  changeOnSelect
                  onChange={value => {
                    setFieldValue('category', value);
                  }}
                />
              </Form.Item>
              <FormItem name="capacity" label="Max Capacity">
                Up to
                <InputNumber name="capacity" min={2} />
                people
              </FormItem>
              <FormItem name="additionalInfo" label="Additional Info">
                <Input.TextArea
                  name="additionalInfo"
                  rows={4}
                  placeholder="Details"
                />
              </FormItem>
              <Form.Item name="locationText" label="Location" hasFeedback>
                <GoogleMap
                  center={{ lat: locationLatitude, lng: locationLongitude }}
                  height="400px"
                  width="400px"
                  zoom={15}
                  setFieldValue={setFieldValue}
                  locationText={locationText}
                  isForm
                />
              </Form.Item>
              <div className="timeRange">
                <Form.Item name="timeBegin" label="Time" hasFeedback>
                  <DatePicker
                    name="timeBegin"
                    disabledDate={value => disableDate(value, values.timeEnd)}
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    defaultValue={timeBegin}
                    placeholder="Start Time"
                    onChange={date => {
                      setFieldValue('timeBegin', date);
                    }}
                  />
                </Form.Item>
                <Form.Item name="timeEnd" hasFeedback>
                  <DatePicker
                    name="timeEnd"
                    disabledDate={value => disableDate(values.timeBegin, value)}
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    defaultValue={timeEnd}
                    placeholder="End Time"
                    onChange={date => {
                      setFieldValue('timeEnd', date);
                    }}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="Buttons">
              {submitButton}
              <Button id="cancel-button" type="danger" onClick={clickCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export const MatchPropTypes = {
  title: PropTypes.string,
  // matchThumbnail,
  category: PropTypes.arrayOf(PropTypes.number),
  capacity: PropTypes.number.isRequired,
  isOnline: PropTypes.bool,
  locationText: PropTypes.string.isRequired,
  // latitude and longitude will be implemented or removed after applying Google Map API
  // locationLatitude: PropTypes.number.isRequired,
  // locationLongitude: PropTypes.number.isRequired,
  timeBegin: momentPropTypes.momentObj,
  timeEnd: momentPropTypes.momentObj,
  additionalInfo: PropTypes.string,
  isPeriodic: PropTypes.bool,
  period: PropTypes.number,
  isAgeRestricted: PropTypes.bool,
  restrictAgeFrom: PropTypes.number,
  restrictAgeTo: PropTypes.number,
  isGenderRestricted: PropTypes.bool,
  // restrictMale and restrictFemale will be implemented later with CSS
  // restrictMale: PropTypes.bool.isRequired,
  // restrictFemale: PropTypes.bool.isRequired,
};

MatchForm.propTypes = {
  ...MatchPropTypes,
};

MatchForm.defaultProps = {
  title: '',
  timeBegin: null,
  timeEnd: null,
};

export default MatchForm;
