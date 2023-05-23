const Ajv = require('ajv').default;

const ajv = new Ajv();

const signUpSchema = {
    "type": "object",
    "properties": {
        "firstName": {
            "type": "string",
            // "pattern": "/^[A-Z][a-z]*$/"

        },
        "lastName": {
            "type": "string",
            // "pattern": "/^[A-Z][a-z]*$/"
        },
        "email": {
            "type": "string",
            // "pattern": ".+\@.+\..+"
        },
        "password": {
            "type": "string",
            "minLength": 8
        },
        "userName": {
            "type": "string"
        },
        "PhoneNumber": {
            "type": "string",
            "minLength": 10,
            "maxLength": 10
        },
        "avatar": {
            "type": "string"
        },
        "cover": {
            "type": "string"
        },
        "gender": {
            "type": "string"
        },
        "address": {
            "type": "string"
        },
        "bio": {
            "type": "string"
        }
    },
    "required": ["firstName", "lastName", "email", "password", "userName", "phoneNumber"],
    "minProperties": 6,
    "maxProperties": 6
};

module.exports = ajv.compile(signUpSchema);
