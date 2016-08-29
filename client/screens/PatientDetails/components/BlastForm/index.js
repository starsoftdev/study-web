import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Glyphicon, Modal, Button } from 'react-bootstrap'

import Dispatcher from 'utils/dispatcher'
import saveTwilioMessage from '../../../../actions/saveTwilioMessage'
import setActiveBlastForm from '../../../../actions/setActiveBlastForm'
import unsetActiveBlastForm from '../../../../actions/unsetActiveBlastForm'

import _ from 'lodash'
import t from 'tcomb-form'
import Select2 from 'react-select2-wrapper'
import $ from 'jquery'//need to remove from project
import './styles.less'

const TCombForm = t.form.Form
const select2Template = t.form.Form.templates.select.clone({
  renderSelect: (locals) => {
    return (
      <Select2
        multiple
        data={locals.options}
        className="form-control"
        ref="patients"
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

const options = {
  order: [
    /*'toPatients',*/
    'message'
  ],
  auto: 'none',
  fields: {
    message: {
      type: 'textarea',
      required: '',
      attrs: {
        autoFocus: true,
        rows: 12
      }
    }/*,
    toPatients: {
      factory: t.form.Select,
      required: '',
      template: select2Template
    }*/
  }
}

class BlastForm extends Component {
  static propTypes = {
    socket: PropTypes.any,
    authorization: PropTypes.any,
    activeBlastForm: PropTypes.object,
    setActiveBlastForm: PropTypes.func,
    unsetActiveBlastForm: PropTypes.func,
    saveTwilioMessage: PropTypes.func
  }

  constructor (props) {
    //console.log('constructor', props)
    super(props)
    this.namespace = 'nsp'
    this.appDispatcher = new Dispatcher()
    this.leadSourceObj = {
      1: 'TV',
      2: 'Radio',
      3: 'Print',
      4: 'Digital',
      5: 'Other'
    }
    this.formData = {
      allcategory: false,
      allsource: false,
      message: '',
      toPatients: null
    }
    this.state = {
      showModal: false,
      filter: {
        categories: [],
        sources: []
      }
    }
  }

  componentDidMount () {
    let scope = this
    this.appDispatcher.register(function (payload) {
      if (payload.actionType === 'setActiveBlastForm') {
        if (payload.data.blastType === 'text') {
          scope.open(payload)
        }
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    //console.log('componentWillReceiveProps', nextProps)
    const { patientsByStudy } = nextProps
    let patienstArr = []
    this.patienstArr = []

    _.forEach(patientsByStudy, (pbs) => {
      _.map(pbs.patients, (patient) => {
        patienstArr.push(patient)
      })
    })

    for (let item of patienstArr) {
      this.patienstArr.push({ text: item['firstName'] + ' ' + item['lastName'], id: item['id'] })
    }

    this.formData.toPatients = this.select2Format(patienstArr)
    let toPatients = t.enums(this.select2Format(patienstArr), 'toPatients')
    this.schema = t.struct({
      message: t.maybe(t.String)/*,
      toPatients: t.list(toPatients)*/
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

  getFilteredPatientsId (filter) {
    const { patientsByStudy } = this.props
    let patientArr = []
    let resultArr = []

    _.forEach(patientsByStudy, (pbs) => {
      _.map(pbs.patients, (patient) => {
        patientArr.push(patient)
      })
    })

    _.forEach(filter.categories, (item) => {
      let filtered = _.filter(patientArr, (patient) => {
        return patient.studyPatientCategory.patientCategory.id === parseInt(item)
      })
      if (filtered.length > 0) {
        _.map(filtered, (el) => {
          resultArr.push(el.id)
        })
      }
    })

    _.forEach(filter.sources, (item) => {
      let filtered = _.filter(patientArr, (patient) => {
        return parseInt(patient.source_id) === parseInt(item)
      })

      if (filtered.length > 0) {
        _.map(filtered, (el) => {
          resultArr.push(el.id)
        })
      }
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
      //console.log(this.refs.form)
      //console.log(validateResult)
      if (value.message && value.toPatients.length > 0) {
        let options = {
          body: value.message,
          studyId: this.props.studyId,
          patients: this.getPatientObj(value.toPatients)
        }
        if (!_.isEmpty(this.props.socket)) {
          saveTwilioMessage(this.props.socket, options, (err, data, cb) => {
            this.formData.message = ''
            this.setState({})
            cb(err, data)
          })
        } else {
          console.error('problem with  socket connection')
        }
      } else {
        console.error('has empty fields')
      }
    }
  }

  onChange (value) {
    this.formData.message = value.message
  }

  checkFilter (value) {
    //console.log('checkFilter', value.target)
    const { studySources } = this.props
    const { patientCategories } = this.props

    let filter = _.clone(this.state.filter)
    let target = value.target
    let splitName = target.name.split('-')
    let type = splitName[0]
    let val = splitName[1]
    let fCategory = (type === 'source') ? filter.sources : filter.categories
    let fSource = (type === 'source') ? studySources : patientCategories
    let ref = (type === 'source') ? this.refs.sourceAll : this.refs.categoryAll
    let ucIndex

    if (val !== 'all') {
      if (target.checked) {
        fCategory.push(val)
      } else {
        ucIndex = fCategory.indexOf(val)
        if (ucIndex !== -1) {
          fCategory.splice(ucIndex, 1)
        }
      }
    } else {
      if (target.checked) {
        this.formData['all' + type] = true
        _.map(fSource, (item, index) => {
          let el = item.id
          ucIndex = fCategory.indexOf(_.toString(el))
          if (ucIndex === -1) {
            fCategory.push(_.toString(el))
          }
        })
      } else {
        this.formData['all' + type] = false
        fCategory.length = 0
      }
    }

    if (this.formData['all' + type] && _.toArray(fSource).length !== fCategory.length) {
      this.formData['all' + type] = false
      ref.checked = false
    }

    if (!this.formData['all' + type] && _.toArray(fSource).length === fCategory.length) {
      this.formData['all' + type] = true
      ref.checked = true
    }

    //console.log(filter)
    this.setState({ filter }, () => {
      let filteredPatientsId = this.getFilteredPatientsId(filter)
      if (this.refs.patients) {
        this.refs.patients.el.val(filteredPatientsId).trigger('change')
      } else {
        $('.select2.form-control').val(filteredPatientsId).trigger('change')
      }
    })
  }

  componentDidUpdate (prevProps, prevState) {
    const { filter } = this.state
    let filteredPatientsId = this.getFilteredPatientsId(filter)
    if (this.refs.patients) {
      this.refs.patients.el.val(filteredPatientsId).trigger('change')
    } else {
      $('.select2.form-control').val(filteredPatientsId).trigger('change')
    }
  }

  render () {
    let scope = this
    const { schema, formData, onChange, checkFilter } = this
    const { patientCategories, studySources } = this.props

    let filter = _.clone(this.state.filter)
    let listSources = []
    let listCategories = []

    _.map(patientCategories, (item, index) => (
      listCategories.push(
        <li
          key={index}
          className={'category-' + item.id}
        >
          <label>
            <input
              id={'category-' + item.id}
              value={item.name}
              type="checkbox"
              name={'category-' + item.id}
              onChange={checkFilter.bind(this)}
              checked={(filter.categories.indexOf(_.toString(item.id)) !== -1)}
            />
            {item.name}
          </label>
        </li>
      )
    ))

    _.map(studySources, (source, key) => {
      listSources.push(
        <li
          key={key}
          className={'source-' + source.id}
        >
          <label>
            <input
              id={'source-' + source.id}
              value={source.infoSource.type}
              type="checkbox"
              name={'source-' + source.id}
              onChange={checkFilter.bind(this)}
              checked={(filter.sources.indexOf(_.toString(source.id)) !== -1)}
            />
            {source.infoSource.type}
          </label>
        </li>
      )
    })

    return (
      <div className="blast-form">
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
              <ul className="category-filter">
                <li>
                  <label>
                    <input
                      ref="categoryAll"
                      type="checkbox"
                      id="category-all"
                      value="all"
                      name="category-all"
                      onChange={this.checkFilter.bind(this)}
                      checked={formData.allcategory}
                    />
                    All
                  </label>
                </li>
                {listCategories}
              </ul>
              <h4>
                Source
              </h4>
              <ul className="source-filter">
                <li>
                  <label>
                    <input
                      ref="sourceAll"
                      type="checkbox"
                      id="source-all"
                      value="all"
                      name="source-all"
                      onChange={checkFilter.bind(this)}
                      checked={formData.allsource}
                    />
                    All
                  </label>
                </li>
                {listSources}
              </ul>
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
                    <fieldset className="fieldset">
                      <div className="form-group form-group-toPatients">
                        <Select2
                          multiple
                          data={this.patienstArr}
                          className="select2 form-control"
                          ref="patients"
                          options={{ placeholder: 'To' }}
                          onChange={function (ev) {
                            let options = []
                            _.map(ev.target.selectedOptions, (option) => {
                              options.push(option.value)
                            })
                            scope.onChange(options)
                          }}
                        />
                      </div>
                    </fieldset>
                    <TCombForm
                      ref="form"
                      type={schema}
                      options={options}
                      value={formData}
                      context={{ comp: this }}
                      onChange={onChange.bind(this)}
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
  socket: state.socket,
  authorization: state.authorization,
  activeBlastForm: state.activeBlastForm
})
const mapDispatchToProps = {
  setActiveBlastForm,
  unsetActiveBlastForm,
  saveTwilioMessage
}

let exportUnit
if (process.env.NODE_ENV) {
  exportUnit = BlastForm
} else {
  exportUnit = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(BlastForm)
}

export default exportUnit
