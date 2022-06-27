import { AlertProps } from 'toons-components';

export type Alert = AlertProps;

interface ActionObj {
  type: 'alert/setAlert';
  alert?: Alert;
}

export const setAlert = (alert: Omit<Alert, 'open'>): ActionObj => {
  return {
    type: 'alert/setAlert',
    alert: {
      open: true,
      ...alert,
    },
  };
};

const initialAlertState: Alert = {
  open: false,
  alertType: 'INFO',
  alertTitle: '',
  alertContents: '',
};

export default function alert(
  state: Alert = initialAlertState,
  action: ActionObj,
) {
  switch (action.type) {
    case 'alert/setAlert':
      return { ...action.alert };
    default:
      return state;
  }
}
