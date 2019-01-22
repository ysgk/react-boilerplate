import * as React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import GlobalStyle from './styles'

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default
    ReactDOM.render(
      <>
        <GlobalStyle />
        <NewApp />
      </>,
      document.getElementById('root')
    )
  })
}
