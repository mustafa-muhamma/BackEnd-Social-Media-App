const Ajv = require('ajv').default;
const ajv = new Ajv();

const editProfileSchema = {
    "type": "object",
    "properties": {
        "firstName": {
            "type": "string",

        },
        "lastName": {
            "type": "string",
        },
        "yourPassword": {
            "type": "string",
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
    "required": ["yourPassword"],
    "minProperties": 2,
    "maxProperties": 8
};

module.exports = ajv.compile(editProfileSchema)