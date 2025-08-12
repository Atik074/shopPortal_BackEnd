export const handleEmptyProducts =(res,products,msg)=>{

       if (!products || products.length === 0) {
  return res.status(404).json({ message:msg });
}
}