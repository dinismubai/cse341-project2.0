const validator = require('../helpers/validate');

const saveDriver = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        birthday: 'required|string',
        yearsDriving: 'required|integer',
        email: 'required|string',
        phone: 'required|string',
        licenseNumber: 'required|string'
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
};

module.exports = {
    saveDriver
};