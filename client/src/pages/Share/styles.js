const styles = theme => ({
    profile: {

        padding: '36px 10px',
        [theme.breakpoints.up('md')]: {
            padding: '36px 60px',
        },
        [theme.breakpoints.up('lg')]: {
            padding: '36px 200px'
        }
    },

});

export default styles;
