import React from 'react'
import { ReactSVG } from 'react-svg'
import { cFC } from '../helpers/helpers'

// Create an array with key: damage type, value: actual path to svg
const reqSVGs = require.context('../../svgs/', true, /\.svg$/)
const svgs = reqSVGs.keys().reduce(
  (images, path) => {
    const key = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'))
    images[key] = reqSVGs(path)
    return images
  }, {}
)

class Icon extends React.Component {
  render() {
    return (
      <ReactSVG
        src = {svgs[this.props.title]}
        className = "item-icon"
        role = "img"
        aria-label = {this.props.title}
        beforeInjection = {
          svg => {
            svg.setAttribute('height', '28px')

            const title = document.createElementNS('http://www.w3.org/2000/svg', 'title')
            title.innerHTML = cFC(this.props.title)
            svg.prepend(title)
          }
        }
      />
    )
  }
}

export default Icon
