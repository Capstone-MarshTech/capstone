import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;

loadType(mongoose);

const ClaimsSchema = new Schema(
  {
    claim_number: {
      type: String,
      required: true,
    },
    effective_date: {
      type: String,
      required: true,
    },
    cleansed_policyyear: {
      type: Number,
      required: true,
    },
    total_net_paid: {
      type: mongoose.Types.Currency,
      curreny: "GBP",
      required: true,
    },
    total_net_os: {
      type: mongoose.Types.Currency,
      curreny: "GBP",
      required: true,
    },
    total_net_incurred: {
      type: mongoose.Types.Currency,
      curreny: "GBP",
      required: true,
    },
    open_claim: {
      type: Number,
      required: true,
    },
    closed_claim: {
      type: Number,
      required: true,
    },
    zero_value_claim: {
      type: Number,
      required: true,
    },
    loss_banding: {
      type: String,
      required: true,
    },
    marsh_line_of_business_1: {
      type: String,
      required: true,
    },
    marsh_line_of_business_2: {
      type: String,
      required: true,
    },
  },
  { toJSON: { getters: true } }
);

const ClaimsModel = mongoose.model("Claims", ClaimsSchema);

export default ClaimsModel;