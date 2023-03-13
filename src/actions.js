export const Actions = {
    ADD_MEMBER: "ADD_MEMBER",
    CHANGE_SCREEN: "CHANGE_SCREEN",
    ADD_ITEM: "ADD_ITEM"
};
  
export const AddMemberAction = member => ({
    type: Actions.ADD_MEMBER,
    payload: {
        id: member.id,
        name: member.name
    }
});

export const ChangeScreenAction = screen => ({
    type: Actions.CHANGE_SCREEN,
    payload: screen
})

export const AddItemAction = item => ({
    type: Actions.ADD_ITEM,
    payload: item
})