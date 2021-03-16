import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";
import PropTypes from "prop-types"

const NotificationAlert = ({alertType, alertText}) => {
  return (
    <div>
      <Alert mb="3 " status={alertType}>
        <AlertIcon />
        {alertText}
      </Alert>
    </div>
  );
};

NotificationAlert.propTypes = {
    alertType : PropTypes.string.isRequired,
    alertText : PropTypes.string.isRequired
}

export default NotificationAlert;
