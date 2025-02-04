import * as actionTypes from "./actionTypes";
import axios from "../../axios-events";

export const singleEventReset = () => ({
  type: actionTypes.SINGLE_EVENT_RESET
});

export const fetchEventStart = payload => ({
  type: actionTypes.FETCH_SINGLE_EVENT_START,
  payload
});

export const fetchEventSuccess = (
  data,
  foodIngredients,
  drinkIngredients,
  link
) => ({
  type: actionTypes.FETCH_SINGLE_EVENT_SUCCESS,
  payload: {
    data: data,
    foodIngredients: foodIngredients,
    drinkIngredients: drinkIngredients,
    link: link ? link : null
  }
});

export const fetchEventFail = error => ({
  type: actionTypes.FETCH_SINGLE_EVENT_FAIL,
  payload: {
    error: error
  }
});

export const fetchSingleCreatedEvent = eventId => {
  return dispatch => {
    dispatch(fetchEventStart());
    axios
      .get("fetchSingleCreatedEvent/" + eventId)
      .then(response => {
        localStorage.setItem("eventId", response.data.event._id);
        let foodIngredients = {};
        let drinkIngredients = {};
        response.data.event.foodIngredients.map(ingredient => {
          return (foodIngredients[ingredient] = 0);
        });
        response.data.event.drinkIngredients.map(ingredient => {
          return (drinkIngredients[ingredient] = 0);
        });
        dispatch(
          fetchEventSuccess(
            response.data.event,
            foodIngredients,
            drinkIngredients,
            response.data.link.link
          )
        );
      })
      .catch(error => {
        dispatch(fetchEventFail(error));
      });
  };
};

export const fetchSingleUserEvent = eventId => {
  return dispatch => {
    dispatch(fetchEventStart());
    axios
      .get("fetchSingleUserEvent/" + eventId)
      .then(response => {
        localStorage.setItem("eventId", response.data.event._id);
        let foodIngredients = {};
        let drinkIngredients = {};
        response.data.event.foodIngredients.map(ingredient => {
          return (foodIngredients[ingredient] = 0);
        });
        response.data.event.drinkIngredients.map(ingredient => {
          return (drinkIngredients[ingredient] = 0);
        });
        dispatch(
          fetchEventSuccess(
            response.data.event,
            foodIngredients,
            drinkIngredients
          )
        );
      })
      .catch(error => {
        dispatch(fetchEventFail(error.response.data.message));
      });
  };
};

export const addUserChoicesStart = () => ({
  type: actionTypes.ADD_USER_CHOICES_START,
  payload: {}
});

export const addUserChoicesSuccess = (
  event,
  foodIngredients,
  drinkIngredients
) => ({
  type: actionTypes.ADD_USER_CHOICES_SUCCESS,
  payload: {
    event: event,
    foodIngredients: foodIngredients,
    drinkIngredients: drinkIngredients
  }
});

export const addUserChoicesFail = () => ({
  type: actionTypes.ADD_USER_CHOICES_FAIL,
  payload: {}
});

export const addFoodChoice = (userChoice, eventId) => {
  return dispatch => {
    dispatch(addUserChoicesStart());
    const data = {
      foodChoice: { choice: userChoice },
      eventId: eventId
    };
    axios
      .put("addFoodChoices", data)
      .then(response => {
        let foodIngredients = {};
        let drinkIngredients = {};
        response.data.event.foodIngredients.map(ingredient => {
          return (foodIngredients[ingredient] = 0);
        });
        response.data.event.drinkIngredients.map(ingredient => {
          return (drinkIngredients[ingredient] = 0);
        });
        dispatch(
          addUserChoicesSuccess(
            response.data.event,
            foodIngredients,
            drinkIngredients
          )
        );
      })
      .catch(error => {
        dispatch(addUserChoicesFail(error.response.data.message));
      });
  };
};

export const addDrinksChoice = (userChoice, eventId) => {
  return dispatch => {
    dispatch(addUserChoicesStart());
    const data = {
      drinksChoice: { choice: userChoice },
      eventId: eventId
    };
    axios
      .put("addDrinkChoices", data)
      .then(response => {
        let foodIngredients = {};
        let drinkIngredients = {};
        response.data.event.foodIngredients.map(ingredient => {
          return (foodIngredients[ingredient] = 0);
        });
        response.data.event.drinkIngredients.map(ingredient => {
          return (drinkIngredients[ingredient] = 0);
        });
        dispatch(
          addUserChoicesSuccess(
            response.data.event,
            foodIngredients,
            drinkIngredients
          )
        );
      })
      .catch(error => {
        dispatch(addUserChoicesFail(error.response.data.message));
      });
  };
};

export const addIngredient = (ingredientName, type) => ({
  type: actionTypes.ADD_INGREDIENT,
  payload: { ingredientName: ingredientName, type: type }
});

export const removeIngredient = (ingredientName, type) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  payload: { ingredientName: ingredientName, type: type }
});

export const updateChoiceReset = () => ({
  type: actionTypes.UPDATE_CHOICE_RESET
});

export const updateUserChoiceInit = (type, userChoice, event) => {
  let updatedIngs = {};
  for (let ing of event[type]) {
    updatedIngs = Object.assign(updatedIngs, {
      [ing]: userChoice[ing] ? userChoice[ing] : 0
    });
  }
  return {
    type: actionTypes.UPDATE_USER_CHOICE_IN_EVENT_INIT,
    payload: {
      type: type,
      userChoice: updatedIngs
    }
  };
};

export const updateUserChoiceStart = () => ({
  type: actionTypes.UPDATE_USER_CHOICE_IN_EVENT_START,
  payload: {}
});

export const updateUserChoiceSuccess = (
  event,
  foodIngredients,
  drinkIngredients
) => ({
  type: actionTypes.UPDATE_USER_CHOICE_IN_EVENT_SUCCESS,
  payload: {
    event: event,
    foodIngredients: foodIngredients,
    drinkIngredients: drinkIngredients
  }
});

export const updateUserChoiceFail = choice => ({
  type: actionTypes.UPDATE_USER_CHOICE_IN_EVENT_FAIL,
  payload: {
    userChoice: choice
  }
});

export const updateUserChoice = (
  updatedChoices,
  type,
  choiceLocationId,
  eventId
) => {
  return dispatch => {
    dispatch(updateUserChoiceStart());
    const data = {
      type: type,
      choices: updatedChoices,
      choiceLocationId: choiceLocationId,
      eventId: eventId
    };
    axios
      .put("updateUserChoice", data)
      .then(response => {
        let foodIngredients = {};
        let drinkIngredients = {};
        response.data.event.foodIngredients.map(ingredient => {
          return (foodIngredients[ingredient] = 0);
        });
        response.data.event.drinkIngredients.map(ingredient => {
          return (drinkIngredients[ingredient] = 0);
        });
        dispatch(
          updateUserChoiceSuccess(
            response.data.event,
            foodIngredients,
            drinkIngredients
          )
        );
      })
      .catch(error => {
        dispatch(updateUserChoiceFail(error.response.data.message));
      });
  };
};

export const publishEventStart = () => ({
  type: actionTypes.PUBSLISH_EVENT_START,
  payload: {}
});

export const publishEventSuccess = link => ({
  type: actionTypes.PUBSLISH_EVENT_SUCCESS,
  payload: {
    link: link
  }
});

export const publishEventFail = errMessage => ({
  type: actionTypes.PUBSLISH_EVENT_FAIL,
  payload: {
    error: errMessage
  }
});

export const publishEvent = eventId => {
  return dispatch => {
    dispatch(publishEventStart());
    const data = {
      eventId: eventId
    };
    axios
      .post("createLinkEvent", data)
      .then(response => {
        dispatch(
          publishEventSuccess(
            "http://localhost:3000/events/addUserToEvent?link=" +
              response.data.link.link
          )
        );
      })
      .catch(error => {
        dispatch(publishEventFail(error.response.data.message));
      });
  };
};