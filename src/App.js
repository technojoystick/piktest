import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = true;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = true;
  }
  if (!values.date) {
    errors.date = true;
  } else {
    const mydate = Date.parse(values.date);
    const timeInMs = Date.now();
    const eighteen = 568118400000;
    const seventyFour = 2334000000000;
    if (seventyFour < timeInMs - mydate || timeInMs - mydate < eighteen) {
      errors.date = 'Ипотечный кредит предоставляется гражданам РФ в возрасте от 18 до 74 лет';
    }
  }
  return errors
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className='input'>
    <label>{label}</label>
    <div className={touched && error ? '_error' : ''}>
      <input {...input} type={type}/>
      {touched && ((error && typeof error === 'string' && <span>{error}</span>))}
    </div>
  </div>
);

class SimpleForm extends Component {
  constructor(props) {
    super(props);

    this.props = props;
    this.state = {textAreaRows: 1};
  }

  textAreaChange = (e) => {
    const { scrollHeight, clientHeight } = e.currentTarget;
    if ( scrollHeight > clientHeight ) {
      this.setState({textAreaRows: this.state.textAreaRows + 1});
    }
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="username" type="text" component={renderField} label="Имя"/>
        <Field name="email" type="email" component={renderField} label="Email"/>
        <Field name="date" type="date" component={renderField} label="Дата рождения"/>
        <div className='textarea'>
          <label>Сообщение</label>
          <div>
            <Field name="notes" component="textarea" rows={this.state.textAreaRows} onChange={this.textAreaChange} />
          </div>
        </div>
        <div>
          <button className='btn' type="submit" disabled={submitting}>Submit</button>
          <button className='btn btn_blue' type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
    )
  }
};

export default reduxForm({
  form: 'syncValidation',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
})(SimpleForm);
