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
  
      default:
        return state;
    }
};

export default rootReducer;
