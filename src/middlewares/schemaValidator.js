export function validateSchema(schema) {
    return (req, res, next) => { 
      console.log(req.body)
      const {error} = schema.validate(req.body, {abortEarly: false});
      if (error) {
        return res.status(422).send(error.message);
      }
  
      res.locals = req.body
      next();
    }
  }