export const screens = {
    "ADD_MEMBERS": {
        name: 'ADD_MEMBERS',
        next: 'ADD_EXPENSE',
        prev: ''
    },
    "ADD_EXPENSE": {
        name: 'ADD_EXPENSE',
        next: 'RESULTS',
        prev: 'ADD_MEMBERS'
    },
    "RESULTS": {
        name: 'RESULTS',
        next: '',
        prev: 'ADD_EXPENSE'
    }
}