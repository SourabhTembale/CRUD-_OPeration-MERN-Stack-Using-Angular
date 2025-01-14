import User from "../models/user.js";


export const test = (req, res) => {
    res.json({
      message: 'Api route is working!',
    });
  };


export const add = async (req, res, next) => {
    const { name, email, password ,age,address} = req.body;
    const newUser = new User({ name, email, password,age,address });
    try {
      await newUser.save();
      res.status(201).json('User created successfully!');
    } catch (error) {
      next(error);
    }
  };
  


  export const updateUser = async (req, res, next) => {
      try {
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age,
            address: req.body.address,
          },
        },
        { new: true }
      );
  
      const { password, ...rest } = updatedUser._doc;
  
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteUser = async (req, res, next) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.clearCookie('access_token');
      res.status(200).json('User has been deleted!');
    } catch (error) {
      next(error);
    }
  };
  

  
  export const getUser = async (req, res, next) => {
    try {
      const user = await User.find();
    
      if (!user) return next(404, 'User not found!');
    
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  export const getUserId = async (req, res, next) => {
    try {
      const { id } = req.params; 
  
      const user = await User.findById(id); 
  
      if (!user) return next(404, 'User not found!');
  
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };