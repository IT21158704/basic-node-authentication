export const config = {
    mongoUri: process.env.MONGO_URI || 'mongodb+srv://nadundilshan733:tfgsk4VxVWMeNdr4@cluster0.z8f1cps.mongodb.net/zeylonia?retryWrites=true&w=majority',
    port: process.env.PORT || 3002,
    jwtSecret: process.env.JWT_SECRET || 'mnvnadjehfbaskn',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'sandnsandnsandmnsd',
    email: {
      service: 'gmail',
      user: process.env.EMAIL_USER || 'testmyweatherapp@gmail.com',
      pass: process.env.EMAIL_PASS || 'zouwmvmxmlrvjxum',
    },
  };