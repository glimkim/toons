export interface User {
  email: string | null;
  token: string | null;
  tokenTimeout?: number;
}

type ActionType = 'user/setUser' | 'user/unsetUser' | 'user/setTimeout';

interface ActionObj {
  type: ActionType;
  user?: User;
  timeout?: NodeJS.Timeout;
}

// action creation
export const setUser = (user: User): ActionObj => {
  return {
    type: 'user/setUser',
    user,
  };
};
export const unsetUser = (): ActionObj => {
  return {
    type: 'user/unsetUser',
  };
};

export const setTokenTimeout = (timeout: NodeJS.Timeout): ActionObj => {
  return {
    type: 'user/setTimeout',
    timeout,
  };
};

const initialUserState: User = {
  email: null,
  token: null,
};

export default function user(
  state: User = initialUserState,
  action: ActionObj,
) {
  switch (action.type) {
    case 'user/setUser': {
      return { ...action.user };
    }
    case 'user/unsetUser': {
      return initialUserState;
    }
    case 'user/setTimeout': {
      return { ...state, tokenTimeout: action.timeout };
    }
    default: {
      return state;
    }
  }
}
