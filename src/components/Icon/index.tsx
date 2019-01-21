import React from 'react';

import { Flex } from 'rebass';

export type IconName =
  | 'all'
  | 'arrowDown'
  | 'arrowUp'
  | 'baby'
  | 'caret'
  | 'foodie'
  | 'girly'
  | 'green'
  | 'kids'
  | 'logo'
  | 'manly'
  | 'music'
  | 'outdoorsy'
  | 'pets'
  | 'romantic'
  | 'sporty'
  | 'techie';

export const IconNames: { [key: string]: IconName } = {
  all: 'all',
  arrowDown: 'arrowDown',
  arrowUp: 'arrowUp',
  baby: 'baby',
  caret: 'caret',
  foodie: 'foodie',
  girly: 'girly',
  green: 'green',
  kids: 'kids',
  logo: 'logo',
  manly: 'manly',
  music: 'music',
  outdoorsy: 'outdoorsy',
  pets: 'pets',
  romantic: 'romantic',
  sporty: 'sporty',
  techie: 'techie',
};

export interface IIcon {
  icon: IconName;
  color?: string;
  css?: any;
  onClick?: () => void;
}

export const Icon: React.FunctionComponent<IIcon> = React.memo(({ icon, ...props }) => {
  const Component = require(`./${icon.charAt(0).toUpperCase() + icon.slice(1)}`).default;

  return (
    <Flex {...props} alignItems="center" justifyContent="center">
      <Component color={props.color} />
    </Flex>
  );
});
