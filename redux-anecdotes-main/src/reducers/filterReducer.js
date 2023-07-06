
export const updateFilter = (content) => {
  return {
    type: 'NEW_FILTER',
    payload: content
  }
}

const reducer = (state='', action) => {

  switch (action.type) {
    case 'NEW_FILTER':
      return action.payload
    default: return state
  }
}

export default reducer