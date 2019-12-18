import React, { useState } from 'react'
import { connect } from 'react-redux'

import { addItem } from '../store/home/action'

const Home = ({ home, onAddNewHome }) => {
  const [inputValue, setInputValue] = useState('')

  const onChangeInput = () => {
    setInputValue(event.target.value)
  }
  const addANew = () => {
    onAddNewHome(inputValue)
    setInputValue('')
  }

  return <div>
    This is Home list
    <ul>
      {home.map((h, i) => {
        return <li key={i}>{h}</li>
      })}
    </ul>
    <input type="text" value={inputValue} onChange={onChangeInput} />
    <button onClick={addANew}>add a new home</button>
  </div>
}

const mapStateToProps = (state, ownProps) => {
  return {
    home: state.home
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAddNewHome: val => {
      dispatch(addItem(val))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
