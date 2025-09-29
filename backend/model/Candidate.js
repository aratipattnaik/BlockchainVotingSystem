import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    role_for_Election: { type: String, required: true }, 


    role: { type: String, enum: ["user", "candidate", "admin"], default: "candidate" },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    image_of_Candidate: { type: String }, 

    name: {
      firstName: { type: String, required: true },
      lastName: { type: String },
    },

    department: String, 
    year: String,       
    age: Number,
    gender: String,

    manifesto: [String], 

    contact: {
      email: String,
      phone: String,
    },

    applicationStatus: {
      type: String,
      enum: ["Pending", "Verified", "Rejected"],
      default: "Pending",
    },

    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    totalVotes: { type: Number, default: 0 },

    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;



