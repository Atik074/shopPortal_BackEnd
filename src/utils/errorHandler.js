

export const errorHandler = (res, context, err) => {
  
  console.error(`${context} `, err);
  
  res.status(500).json({
     message: `${context} is failed`,
      error: err.message
     });
};
