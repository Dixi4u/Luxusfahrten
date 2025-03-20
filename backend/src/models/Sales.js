import { Schema, model } from "mongoose";

const salesSchema = new Schema({
    idBrand : {
        type : Schema.Types.ObjectId,
        ref : "brands",
        required : true
    },
    idClient : {
        type : Schema.Types.ObjectId,
        ref : "clients",
        required : true
    },
    idVehicle : {
        type : Schema.Types.ObjectId,
        ref : "vehicles",
        required : true
    },
    saleDate : {
        type : Date,
        default : Date.now
    },
    salePrice : {
        type : Number,
        required : true
    },
    saleStatus : {
        type : String,
        enum : ["pending", "approved", "rejected"],
        default : "pending",
        required : true
    },
    finalSalePrice : {
        type : Number,
        required : true
    }
},{
    timestamps : true,
    strict : false
});

export default model("sales", salesSchema);