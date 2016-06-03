import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import t from 'tcomb-form'
import selectn from 'selectn'
import { Link } from 'react-router'

import { login } from 'actions'
import history from 'utils/history'

import './styles.less'

let Form = t.form.Form

let LoginFields = t.struct({
  username: t.Str,
  password: t.Str,
})

let loginValues = {
  username: null,
  password: null,
}

let loginTemplate = function (locals) {
  return (
    <div>
      <div className="row">
        <div className="col-sm-12">
          {locals.inputs.username}
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <br />
          {locals.inputs.password}
        </div>
      </div>
    </div>
  )
}

let loginOptions = {
  template: loginTemplate,
  auto: 'placeholders',
  fields: {
    username: {
      error: '',
      attrs: {
        autoFocus: true,
        placeholder: 'User Name',
      }
    },
    password: {
      type: 'password',
      error: 'Need a hand?',
      attrs: {
        placeholder: 'Password',
      }
    }
  }
}

class Login extends React.Component {

  static propTypes = {
    onLogin: PropTypes.func,
    authorization: PropTypes.object,
    location: PropTypes.object,
  }

  static contextTypes = {
    router: PropTypes.any
  }

  componentDidUpdate (prevProps) {
    let justAuthorized = (
      prevProps.authorization.authorized === false &&
      this.props.authorization.authorized === true
    )
    if (justAuthorized) {
      let previousPath = selectn('state.previousPathname', this.props.location)
      let path = previousPath ? previousPath : '/dashboard'
      history.push(path)
    }
  }

  login (e) {
    e.preventDefault()
    const value = this.refs.form.getValue()
    if (value) {
      this.props.onLogin(value)
    }
  }

  render () {
    let authorization = this.props.authorization
    return (
      <div className="login-page-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-push-4">
          <div className="login-block">
          <div className="text-center">
            <h3>StudyKik Login</h3>
          </div>
          <br />
          <form className="login-form" onSubmit={(e) => this.login(e)}>
                <Form
                  ref="form"
                  type={LoginFields}
                  options={loginOptions}
                  value={loginValues}
                />
              <br />
              {authorization.error && (
                <div className="alert alert-danger">
                  Oops! we had trouble logging you in. Did you forget your password? <Link to="forgot_password" className="forgot-password-link">Reset Your Password</Link>
                </div>
              )}
              <div className="row">
              <div className="col-sm-12">
                  <button className="btn btn-success btn-block" type="submit" disabled={authorization.authorizing}>
                    {authorization.authorizing ? <i className="fa fa-repeat fa-spin" /> : 'Login'}
                  </button>
              </div>
              </div>
          </form>
          </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authorization: state.authorization,
  location: state.location,
})
const mapDispatchToProps = {
  onLogin: login,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
