export const Actions = {
    ADD_MEMBER: "ADD_MEMBER",
    DELETE_MEMBER: "DELETE_MEMBER",
    CHANGE_SCREEN: "CHANGE_SCREEN",
    ADD_ITEM: "ADD_ITEM",
    DELETE_ITEM: "DELETE_ITEM",
    SET_ALERT: "SET_ALERT",
    CLOSE_ALERT: "CLOSE_ALERT",
    CLEAR_ITEMS: "CLEAR_ITEMS",
};
  
export const AddMemberAction = member => ({
    type: Actions.ADD_MEMBER,
    payload: {
        id: member.id,
        name: member.name
    }
});

export const DeleteMember = uuid => ({
    type: Actions.DELETE_MEMBER,
    payload: uuid
})

export const ChangeScreenAction = screen => ({
    type: Actions.CHANGE_SCREEN,
    payload: screen
})

export const AddItemAction = item => ({
    type: Actions.ADD_ITEM,
    payload: item
})

export const DeleteItemAction = uuid => ({
    type: Actions.DELETE_ITEM,
    payload: uuid
})

export const ClearItemsAction = () => ({
    type: Actions.CLEAR_ITEMS
})

export const SetAlertAction = alert => ({
    type: Actions.SET_ALERT,
    payload: alert
})

export const CloseAlertAction = () => ({
    type: Actions.CLOSE_ALERT
})