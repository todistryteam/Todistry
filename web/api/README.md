### Base setup of Node.js structure
    |-- Assets # Images
    |-- Config # General Configurations
    |   | constants   
    |   | encrypt   # Encryption methods are defined here
    |   | globals   # Variables that needs to global (which can be accessed without import)
    |   | Response Handler   # Global response handler function (Check file to check how to use)
    |-- Controllers
    |-- Models
    |-- Routes
    |   | index   # Entry point for routes
    |-- SSL # https certificates
    |-- Utils
    |   | helpers       # Utility Functions
    |-- Views
    | server # entry point for project


### Features :
- Global Response Handler.
- Global Variables.
- By default Multi Language Support.
- Most of the status codes are available.
- HTTPs support
- Switching from Https to Http Available
- Global Error Handler
- Sequelize and Mongo DB configured (Available in different branch) 

### Things To Consider :
- All of Folder and Component names must be in Pascal Case.
- All of File names must be in Camel Case.
- All of function name must be in Pascal Case / Camel Case.
- Size of Any File Should not exceed 1000 lines.
- Size of Any function Should not exceed 250 lines.
- Include function comments and line comments to wherever possible.
- There should not be any errors or warning in console.
- All of the images must be uploaded to Azure / AWS buckets. In folders images are not allowed.
