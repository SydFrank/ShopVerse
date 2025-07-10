/**
 * Sends an HTTP response with the specified status code and JSON data.
 *
 * @param {object} res - Express response object used to send the HTTP response.
 * @param {number} code - HTTP status code to set for the response (e.g., 200, 400, 500).
 * @param {object} data - The payload to send as JSON in the response body.
 * @returns {object} The Express response object after sending the JSON response.
 *
 * This utility function standardizes HTTP responses by encapsulating
 * the status setting and JSON response sending in one reusable method.
 */

module.exports.responseReturn = (res, code, data) => {
  return res.status(code).json(data);
};
