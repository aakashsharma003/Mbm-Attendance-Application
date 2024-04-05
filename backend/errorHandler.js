export const errorHandler = (err, req, res, next) => {
  //   console.log("Error Name:", err.name);
  //   console.log("Error Message:");
  //   console.log("Error Stack:", err.stack);
  res.status(500).send(err);
};
