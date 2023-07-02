const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newGOODState = {
        ...state,
        good: state.good +1
      }
      return newGOODState
    case 'OK':
      const newOKState = {
        ...state,
        ok: state.ok +1
      }
      return newOKState
    case 'BAD':
      const newBADState = {
        ...state,
        bad: state.bad +1
      }
      return newBADState
    case 'ZERO':
      const resetState = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return resetState
    default: return state
  }
  
}

export default counterReducer
