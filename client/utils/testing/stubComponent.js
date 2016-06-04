import React from 'react'

let rewires

export default function stubComponent (module, componentName) {
  rewires = rewires || []

  module.__Rewire__(componentName, class extends React.Component {
    render () {
      return <div {...this.props}></div>
    }
  })
  rewires.push({ module, componentName })
}

afterEach(() => {
  if (!rewires) {
    return
  }

  rewires.forEach(({ module, componentName }) => {
    module.__ResetDependency__(componentName)
  })

  rewires = null
})
