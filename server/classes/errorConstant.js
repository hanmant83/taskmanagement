const errorType = { 
    ERROR_FROM_USER: { 
        message: "Error while creating user", 
        statusCode: 404, 
        status:"error" 
    }, 
    ERROR_FROM_PLATFORM_SERVICE: { 
            message: "Internal Server Error", 
            statusCode: 404, 
            status:"error" 
    }, 
    DATA_UPDATED:{ 
        message: "Data updated successfully",
        statusCode: 200, 
        status : "success" 
    }, 
    DATA_DELETED:{ 
        message: "Data deleted successfully", 
        statusCode: 200, 
        status : "success" 
    }, 
    DATA_ADDED:{ 
        message: "Data added successfully", 
        statusCode: 200, 
        status : "success" 
    }, 
    BAD_REQUEST:{ 
        message: "Bad Request", 
        statusCode: 500, 
        status:"error" 
    }, 
    SYNTAX_ERROR:{ 
        message: "Syntax Error: Incorrect Syntax", 
        statusCode: 500, 
        status:"error" 
    },
    INPUT_REQUIRED:{ 
        message: "Input parameter required", 
        statusCode: 404, 
        status:"error" 
    },
    USER_EXISTS:{ 
        message: "User with same email address already exists", 
        statusCode: 404, 
        status:"error" 
    },
    SOMETHING_WRONG:{ 
        message: "Something went wrong", 
        statusCode: 404, 
        status:"error" 
    }
}
const errorName = { 
    ERROR_FROM_USER: 'ERROR_FROM_USER', 
    DATA_NOT_FOUND: 'DATA_NOT_FOUND', 
    ERROR_FROM_PLATFORM_SERVICE: "ERROR_FROM_PLATFORM_SERVICE", 
    DATA_UPDATED: "DATA_UPDATED", 
    DATA_DELETED: "DATA_DELETED", 
    DATA_ADDED: "DATA_ADDED", 
    BAD_REQUEST: "BAD_REQUEST", 
    SYNTAX_ERROR:"SYNTAX_ERROR",
    INPUT_REQUIRED:"INPUT_REQUIRED",
    USER_EXISTS:"USER_EXISTS"
}
const getErrorCode = errorName =>{ 
    return errorType[errorName] 
}
module.exports = {errorName, errorType, getErrorCode};