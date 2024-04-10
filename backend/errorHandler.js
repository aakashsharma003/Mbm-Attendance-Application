export const errorHandler = (err, req, res, next) => {
  //   console.log("Error Name:", err.name);
  //   console.log("Error Message:");
  //   console.log("Error Stack:", err.stack);
  console.log(err.errno);
  if (err.errno == 1062) {
    res
      .status(404)
      .json({ message: "Subject with given Subject Code Already exists..!" });
  } else if (err.errno == 1366 || err.errno == 1265) {
    res.status(404).json({ message: "Year should be an Integer..!" });
  } else {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
