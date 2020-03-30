module.exports = (req, res, next) => {
    // if (!req.user.credits < 10) {
    //     return res.status(405).send({error: 'You don\'t have enough credits'})
    // }

    next()
};