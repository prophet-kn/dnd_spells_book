import React, { Component } from 'react'

class ScrollToTop extends Component {
  scrollToTopFunc() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }

  render() {
    return (
      <svg onClick={this.scrollToTopFunc.bind(this)} className={'chevron scroll-top'} width="40" height="40" viewBox="0 0 10 16" transform="rotate(180)"><path fillRule="evenodd" d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6l-5 5z"></path></svg>
    )
  }
}

export default ScrollToTop
