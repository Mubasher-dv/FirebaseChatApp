

export const getRoomId = (userId1, userId2) => {
    const sortedIds = [userId1, userId2].sort();

    const roomId = sortedIds.join('-');
    return roomId;
}

export const formatDate = (date) => {
    let day = date.getDate();
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let month = monthNames[date.getMonth()];

    let formattedDate = day + ' ' + month;
    return formattedDate;
}