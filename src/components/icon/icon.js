import React from 'react'
import { ReactSVG } from 'react-svg'

class Icon extends React.Component {
  render() {
    return (
      <ReactSVG
        src = {"svgs/" + this.props.title + ".svg"}
        className = "item-icon"
        role = "img"
        aria-label = {this.props.title}
        beforeInjection = {
          svg => {
            var path = svg.firstChild
            const title = document.createElement('title')
            title.innerHTML = this.props.title
            svg.prepend(title)
            path.appendChild(title)

            svg.setAttribute('height', '28px')
          }
        }
      />
    )
  }
}

export default Icon
