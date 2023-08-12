export const detailsReducer = (state, action) => {
  switch (action.type) {
    case "GET_USER_DETAILS":
      return action.payload;
    case "ADD_DETAIL":
      return [...state, action.payload];
    case "EDIT_DETAIL":
      return [
        ...state.filter((userDetail) => userDetail.id !== action.payload.id),
        action.payload,
      ];
    case "DELETE_DETAIL":
      return state.filter((userDetail) => userDetail.id !== action.payload);
    default:
      return state;
  }
};
