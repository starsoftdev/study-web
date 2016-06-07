import React from 'react'
import ReactDOM from 'react-dom'
import Sortable from 'sortablejs'

const store = {
    nextSibling: null,
    activeComponent: null
}

const extend = (target, ...sources) => {
    target = target || {}
    for (let index = 0; index < sources.length; index++) {
        let obj = sources[index]
        if (!obj) {
            continue
        }
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                target[key] = obj[key]
            }
        }
    }
    return target
}

module.exports = class extends React.Component {
    static propTypes = {
        options: React.PropTypes.object,
        onChange: React.PropTypes.func,
        tag: React.PropTypes.string
    };
    static defaultProps = {
        options: {},
        tag: 'div'
    };

    sortable = null

    componentDidMount () {
        const options = extend({}, this.props.options)

        [
            'onStart',
            'onEnd',
            'onAdd',
            'onSort',
            'onUpdate',
            'onRemove',
            'onFilter',
            'onMove'
        ].forEach((name) => {
            const eventHandler = options[name]

            options[name] = (evt) => {
                if (name === 'onStart') {
                    store.nextSibling = evt.item.nextElementSibling
                    store.activeComponent = this
                } else if ((name === 'onAdd' || name === 'onUpdate') && this.props.onChange) {
                    const items = this.sortable.toArray()
                    const remote = store.activeComponent
                    const remoteItems = remote.sortable.toArray()

                    evt.from.insertBefore(evt.item, store.nextSibling)

                    if (remote !== this) {
                        const remoteOptions = remote.props.options || {}

                        if ((typeof remoteOptions.group === 'object') && (remoteOptions.group.pull === 'clone')) {
                            // Remove the node with the same data-reactid
                            evt.item.parentNode.removeChild(evt.item)
                        }

                        remote.props.onChange && remote.props.onChange(remoteItems, remote.sortable)
                    }

                    this.props.onChange && this.props.onChange(items, this.sortable)
                }

                setTimeout(() => {
                    eventHandler && eventHandler(evt)
                }, 0)
            }
        })

        this.sortable = Sortable.create(ReactDOM.findDOMNode(this), options)
    }
    render () {
        const { children, className, tag } = this.props
        return React.DOM[tag]({ className }, children)
    }
}
