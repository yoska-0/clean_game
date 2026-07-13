import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose.connect(process.env.DB_CONECTION).then((connt) => {
    console.log(`Database connected with ${connt.connection.host}`);
  });
};
