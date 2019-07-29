const styles = theme => ({

    root: {
        height: '470px',
    },
    media: {
        height: '200px',
    },

    userInfo: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    avatar: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
    },
    meta: {
        marginLeft: '15px',
        marginBottom: '5px'
    },
    fullName: {
        color: 'black',
    },
    itemTitle: {
        color: 'black',
        fontSize: '24px',
    },
    itemTags: {
        marginTop: '8px',
        marginBottom: '4px',
    },
    itemInfo: {
        marginTop: '36px',
    },
    itemDescription: {
        color: 'black',
        fontSize: '16px',
    },
    borrowButton: {
        borderRadius: '5px',
        border: '1px solid lightgray',
    }

});

export default styles;