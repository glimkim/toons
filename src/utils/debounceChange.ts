import _ from 'lodash';

export const debounceChange = _.debounce(
  (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  ) => onChange(e),
  250,
);
