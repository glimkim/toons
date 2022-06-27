export interface User {
  email: string | null;
  token: string | null;
}

type ActionType = 'user/setUser' | 'user/unsetUser';

interface ActionObj {
  type: ActionType;
  user?: User;
}

// action creation
export const setUser = (user: User): ActionObj => {
  console.log(user, 'action creation');
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
    default: {
      return state;
    }
  }
}
