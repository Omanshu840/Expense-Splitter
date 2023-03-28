import { Actions } from "./actions";

const rootReducer = (state, action) => {
    switch (action.type) {
        case Actions.ADD_MEMBER: {
            const newMember = {
                id: action.payload.id,
                name: action.payload.name
            };
            
            return {
                ...state,
                members: [...state.members, newMember]
            }
        }

        case Actions.DELETE_MEMBER: {
            return {
                ...state,
                members: state.members.filter(member => member.id!==action.payload)
            }
        }

        case Actions.CHANGE_SCREEN: {
            return {
                ...state,
                screen: action.payload
            }
        }

        case Actions.ADD_ITEM: {
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        }

        case Actions.DELETE_ITEM: {
            return {
                ...state,
                items: state.items.filter(item => item.id!==action.payload)
            }
        }

        case Actions.CLEAR_ITEMS: {
            return {
                ...state,
                items: []
            }
        }

        case Actions.SET_ALERT: {
            return {
                ...state,
                alert: action.payload
            }
        }

        case Actions.CLOSE_ALERT: {
            return {
                ...state,
                alert: {
                    showAlert: false,
                    alertMessage: ""
                }
            }
        }
  
      default:
        return state;
    }
};

export default rootReducer;
