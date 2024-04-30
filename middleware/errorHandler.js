const errorHandler = (err, req, res, next) => {
   if(err.code == 11000){
        err.code = 403;
        err.msg = 'duplicated value'
    }
    let error = err.msg || err.message
    console.log(err)
    res.status(err.code || 500).json({message:error})
};

module.exports = errorHandler