import React, { Component, PropTypes } from 'react'
//import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Glyphicon, Modal, Button } from 'react-bootstrap'

import Dispatcher from 'utils/dispatcher'
import { setActiveBlastForm, unsetActiveBlastForm, saveTwilioMessage } from 'actions'


import _ from 'lodash'
import t from 'tcomb-form'
import Select2 from 'react-select2-wrapper'
import './styles.less'

const TCombForm = t.form.Form
const select2Template = t.form.Form.templates.select.clone({
  renderSelect: (locals) => {
    return (
      <Select2
        multiple
        data={locals.options}
        className="form-control"
        ref="to-patients"
        name={locals.attrs.name}
        id={locals.attrs.id}
        options={{ placeholder: 'To' }}
        onChange={
          function (ev) {
            let options = []
            _.map(ev.target.selectedOptions, (option) => {
              options.push(option.value)
            })
            locals.onChange(options)
          }
        }
      />
    )
  }
})

const leadSourcehObj = {
  '1': 'TV',
  '2': 'Radio',
  '3': 'Print',
  '4': 'Digital',
  '5': 'Other'
}

const order = [
  'toPatients',
  'message'
]

const options = {
  order,
  auto: 'none',
  fields: {
    message: {
      type: 'textarea',
      required: '',
      attrs: {
        autoFocus: true,
        rows: 12
      }
    },
    toPatients: {
      factory: t.form.Select,
      required: '',
      template: select2Template
    }
  }
}

export default class BlastForm extends Component {
  static propTypes = {
    authorization: PropTypes.any,
    activeBlastForm: PropTypes.object,
    setActiveBlastForm: PropTypes.func,
    unsetActiveBlastForm: PropTypes.func,
    saveTwilioMessage: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.namespace = 'nsp'
    this.appDispatcher = new Dispatcher()
    this.formData = {
      message: ''
    }
    this.state = {
      showModal: false
    }
  }

  connect (nameSpace, cb) {
    let authData = this.props.authorization.authData
    //console.log(authData)
    if (authData) {
      if (!this.io) {
        this.io = io(`${HOST_URL}/${nameSpace}`)
        this.io.on('connect', () => {
          cb()
        })
      } else {
        cb()
      }
    } else {
      if (this.io) {
        this.io.disconnect()
        this.io = null
      }
    }
  }

  componentDidMount () {
    let scope = this
    this.appDispatcher.register(function (payload) {
      if (payload.actionType === 'setActiveBlastForm') {
        switch (payload.data.blastType) {
          case 'text':
            scope.open(payload)
            scope.connect(scope.namespace, () => {})
            break
          default:
            break
        }
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    const { patientsByStudy } = nextProps
    let patienstArr = []

    _.forEach(patientsByStudy, (pbs) => {
      _.map(pbs.patients, (patient) => {
        patienstArr.push(patient)
      })
    })

    let toPatients = t.enums(this.select2Format(patienstArr), 'toPatients')
    this.formData.toPatients = this.select2Format(patienstArr)
    this.schema = t.struct({
      message: t.maybe(t.String),
      toPatients: t.list(toPatients)
    })
  }

  select2Format (arr) {
    let obj = {}
    for (let item of arr) {
      obj[item['id']] = item['firstName'] + ' ' + item['lastName']
    }

    return obj
  }

  getPatientObj (selectedPatients) {
    const { patientsByStudy } = this.props
    let patienstArr = []
    let resultArr = []

    _.forEach(patientsByStudy, (pbs) => {
      _.map(pbs.patients, (patient) => {
        patienstArr.push(patient)
      })
    })

    _.forEach(selectedPatients, (item) => {
      resultArr.push(_.find(patienstArr, { id: parseInt(item) }))
    })

    return resultArr
  }

  close () {
    const { unsetActiveBlastForm } = this.props
    this.setState({ showModal: false }, () => {
      unsetActiveBlastForm()
    })
  }

  open (payload) {
    const { setActiveBlastForm } = this.props
    this.setState({ showModal: true }, () => {
      setActiveBlastForm(payload)
    })
  }

  returnToPrevState () {
    console.log('returnToPrevState')
  }

  onSubmit (ev) {
    ev.preventDefault()
    const { saveTwilioMessage } = this.props
    const validateResult = this.refs.form.validate()
    if (validateResult.errors.length > 0) {
      for (let err of validateResult.errors) {
        console.log(err)
      }
    } else {
      const { value } = validateResult
      if (value.message && value.toPatients.length > 0) {
        let options = {
          body: value.message,
          studyId: this.props.studyId,
          patients: this.getPatientObj(value.toPatients)
        }
        saveTwilioMessage(this.io, options, (err, data, cb) => {
          cb(err, data)
        })
      } else {
        console.error('has empty fields')
      }
    }
  }

  onChange (value) {
    const { comp } = this.ctx.context
    console.log(value)
  }

  render () {
    const { schema, formData, onChange } = this
    const { patientCategories } = this.props
    let listSources = []
    let listCategories = patientCategories.map((item, index) => (
      <li key={index} className={'category-' + item.id}>
        {item.name}
      </li>
    ))

    _.map(leadSourcehObj, (source, key) => {
      listSources.push(<li key={key} className={'source-' + key}>
        {source}
      </li>)
    })

    return (
      <div className="">
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}
               dialogClassName="blast-modal">
          <Modal.Body>
            <div className="blast-part part-left">
              <Glyphicon
                className="return-to-prev"
                glyph="menu-left"
                onClick={this.returnToPrevState.bind(this)}
              />
              <h4>
                Category
              </h4>
              <div>
                <ul>
                  {listCategories}
                </ul>
              </div>
              <h4>
                Source
              </h4>
              <div>
                <ul>
                  {listSources}
                </ul>
              </div>
            </div>
            <div className="blast-part part-right">
              <Modal.Header closeButton>
                <Modal.Title>
                  TEXT BLAST
                </Modal.Title>
              </Modal.Header>
              <form
                className="form-blast"
                onSubmit={this.onSubmit.bind(this)}
              >
                <div className="row">
                  <div className="col-md-12">
                    <TCombForm
                      ref="form"
                      type={schema}
                      options={options}
                      value={formData}
                      context={{ comp: this }}
                      onChange={onChange}
                    />
                    <fieldset className="fieldset">
                      <div className="form-group">
                        <Button
                          disabled
                          type="submit"
                          className="pull-left"
                          bsStyle="default"
                        >
                          <Glyphicon
                            className=""
                            glyph="folder-open"
                          />
                          Select Template
                        </Button>
                        <Button
                          disabled
                          type="submit"
                          className="pull-left"
                          bsStyle="default"
                        >
                          <Glyphicon
                            className=""
                            glyph="floppy-disk"
                          />
                          Save as Template
                        </Button>
                        <Button
                          type="submit"
                          className="pull-right"
                          bsStyle="primary"
                        >
                          Send
                        </Button>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authorization: state.authorization,
  activeBlastForm: state.activeBlastForm
})
const mapDispatchToProps = {
  setActiveBlastForm,
  unsetActiveBlastForm,
  saveTwilioMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlastForm)
