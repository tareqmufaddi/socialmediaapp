const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const SubmittalSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId, 
        ref: "project"
    }, 
    unit: [{
        type: Schema.Types.ObjectId, 
        ref: "unit"
    }],
    from: 
})