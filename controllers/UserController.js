module.exports = {
    userRegister: async function (req, res, next) {
        try {
            let { firstName, lastName, email, password, } = req.body;
            console.log(req.body,999999999999999999);
            
            await DB.User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            });
            return res.redirect('/login');
        }
        catch (error) {
            console.log(error);
            return res.redirect('/login');
            // return ({ status: false, message: 'Something Wrong!' });
        }
    },
};