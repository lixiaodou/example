import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { addItem, getHomeList } from '../store/home/action'

const Home = ({ home, onAddNewHome, getHomeList }) => {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    console.log('--------------', home)
    getHomeList()
  }, [])

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

// const mapDispatchToProps = dispatch => {
//   return {
//     getHomeList() {
//       dispatch(getHomeList())
//     }
//   }
// }

const mapDispatchToProps = dispatch => ({
  addItem() {
    dispatch(addItem())
  },
  getHomeList() {
    dispatch(getHomeList())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
