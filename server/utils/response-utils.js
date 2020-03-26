class ResponseUtils {
  static buildErrorJson(message) {
    const result = {
      success: false,
      message
    };

    return result;
  }

  static buildSuccessJson(message, data) {
    const result = {
      success: true,
      message,
      data
    };

    return result;
  }
}

module.exports = {
  ResponseUtils
};
