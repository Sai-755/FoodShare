import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "FoodShare API",
    description: "FoodShare Backend REST API Documentation",
    version: "1.0.0",
  },

  host: "localhost:5000",
  schemes: ["http"],

  tags: [
    {
      name: "Authentication",
      description: "User Authentication APIs",
    },
    {
      name: "Donations",
      description: "Donation Management APIs",
    },
    {
      name: "Requests",
      description: "Food Request APIs",
    },
    {
      name: "Dashboard",
      description: "Dashboard APIs",
    },
    {
      name: "Notifications",
      description: "Notification APIs",
    },
    {
      name: "Upload",
      description: "Cloudinary Upload APIs",
    },
  ],

  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Enter JWT token as: Bearer <token>",
    },
  },
};

const outputFile = "./src/swagger-output.json";

const endpointsFiles = [
  "./src/routes/authRoutes.ts",
  "./src/routes/donationRoutes.ts",
  "./src/routes/requestRoutes.ts",
  "./src/routes/dashboardRoutes.ts",
  "./src/routes/notificationRoutes.ts",
  "./src/routes/uploadRoutes.ts",
];

swaggerAutogen()(outputFile, endpointsFiles, doc);