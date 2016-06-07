import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Sortable from 'components/MySortable'
import PatientCardItem from './PatientCardItem'

export default class PatientColItem extends Component {
  static propTypes = {
    items: PropTypes.array,
    category: PropTypes.string,
    categoryId: PropTypes.number,
    onDragAndDrop: PropTypes.func
  }

  render () {
    const { items, category, categoryId, onDragAndDrop } = this.props
    const listContent = items.map((item, index) => (
      <PatientCardItem item={item} key={index} />
    ))

    const dragEnd = (evt) => {
      onDragAndDrop(evt.item, categoryId)
    }

    return (
      <div className="column">
        <div className="header">
          <span className="counter">{items.length}</span>{category}
        </div>
        <Sortable
            // See all Sortable options at https://github.com/RubaXa/Sortable#options
            options={{
                group: 'shared',
                onAdd: dragEnd
            }}
            tag="ul"
        >
            {listContent}
        </Sortable>
      </div>
    )
  }
}
