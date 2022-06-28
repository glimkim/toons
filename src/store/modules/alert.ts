import { AlertProps } from 'toons-components';

export type Alert = AlertProps;

type ActionType = 'alert/setAlert' | 'alert/unsetAlert';
interface ActionObj {
  type: ActionType;
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

export const unsetAlert = (): ActionObj => {
  return {
    type: 'alert/unsetAlert',
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
    case 'alert/unsetAlert':
      return { ...state, open: false };
    default:
      return state;
  }
}
