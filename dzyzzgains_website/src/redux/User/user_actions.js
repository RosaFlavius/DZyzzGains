import { LOG_IN, LOG_OUT } from "./user_types";

export const logIn = (
  userId,
  firstName,
  lastName,
  email,
  dateOfBirth,
  phone,
  country,
  city,
  address,
  admin,
  isLoggedIn
) => {
  return (dispatch) => {
    dispatch({
      type: LOG_IN,
      userId,
      firstName,
      lastName,
      email,
      dateOfBirth,
      phone,
      country,
      city,
      address,
      admin,
      isLoggedIn,
    });
  };
};

export const logOut = (email) => {
  return (dispatch) => {
    dispatch({ type: LOG_OUT, email });
  };
};
