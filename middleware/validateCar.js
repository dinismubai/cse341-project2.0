const validator = require('../helpers/validate');

const saveCar = (req, res, next) => {
    const validationRule = {
        make: 'required|string',
        model: 'required|string',
        color: 'required|string',
        numberOfseats: 'required|integer',
        fuelType: 'required|string'
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
    saveCar
};