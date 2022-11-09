const { v4 } = require('uuid')
const mongoose = require('mongoose')

let adminSchema = new mongoose.Schema({
    _id:{
        type: String,
        default: v4()
    },
    first_name:{ 
        type: String,
        required: true,
        trim: true

    },
    middle_name:{ 
        type: String,
        trim: true
    },
    last_name:{ 
        type: String,
        required: true,
        trim: true

    },
    country:{ 
        type: String,
        required: true
    },
    location:{ 
        type: String,
        required: true
    },
    phone:{ 
        type: String,
        required: true

    },
},
{
    timestamps: true
}
)