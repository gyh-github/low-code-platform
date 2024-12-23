const checkAuth = async (req, res, next) => {
    try {
        const token = req.header.authorization;
        if (token) {
            try {
                console.log(token);
                await next();
            } catch (error) {
                console.log(error);
            }
        }
        await next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = checkAuth;