//Utils for aiding http calls

/**
 * Sets and returns a 500 code response for an error scenario
 * @param {*} err 
 * @param {*} response 
 */
export const setErrorResponse = (err, response) =>{
    response.status(500);
    response.json(err);
}

/**
 * Sets and returns a 200 code response for a success scneario
 * @param {*} obj 
 * @param {*} response 
 */
export const setSuccessResponse = (obj, response) =>{
    response.status(200);
    response.json(obj);
}

/**
 * Sets and returns a 401 response for an unauthorized scenario
 * @param {*} obj 
 * @param {*} response 
 */
export const setUnauthorizedResponse = (obj, response) =>{
    response.status(401);
    response.json(obj);
}

/**
 * Sets and returns a 403 response for a forbidden scenario
 * @param {*} obj 
 * @param {*} response 
 */
export const setForbiddenResponse = (obj, response) =>{
    response.status(403);
    response.json(obj);
}

/**
 * Sets and returns a 409 response for a forbidden scenario
 * @param {*} obj 
 * @param {*} response 
 */
export const setConflictResponse = (obj, response) => {
    response.status(409);
    response.json(obj);
}