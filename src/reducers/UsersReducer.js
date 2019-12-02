
export default function (state = ["Server"], action) {
    switch (action.type) {
        case 'USER_JOINED':
        case 'USER_LEFT':
            const us = action.users && action.users.length > 0 ? action.users : [];
            return us;
        default:
    }

    return state;
}