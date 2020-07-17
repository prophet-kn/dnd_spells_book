import React from 'react'
import { ReactSVG } from 'react-svg'

class Icon extends React.Component {
  render() {
    return (
      <ReactSVG
        src = {"svgs/" + this.props.title + ".svg"}
        key = {this.props.key}
        className = "item-icon"
        role = "img"
        aria-label = {this.props.title}
        beforeInjection = {
          svg => {
            var path = svg.firstChild
            const title = document.createElement('title')
            title.innerHTML = this.props.title
            svg.prepend(title)

            const titleq = document.createElement('title')
            titleq.innerHTML = this.props.title
            path.appendChild(titleq)

            svg.setAttribute('height', '28px');
            //svg.setAttribute('viewBox', '0 0 28 28');
            //svg.setAttribute('transform', 'scale(0.1)');
          }
        }
      />
    )
  }
}

export default Icon
