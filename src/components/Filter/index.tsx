import React from 'react';
import { Box, Flex, Text } from 'rebass';

import { Icon, IconNames, IconName } from 'src/components/Icon';

import { colors, dimensions } from 'src/styles/variables';

export interface IFilter {
  name: string;
  icon: IconName;
  isActive: boolean;
  bg: string;
  onClick(): void;
}

export const Filter: React.FunctionComponent<IFilter> = React.memo(({ bg, name, icon, isActive, onClick }) => {
  return (
    <Box px="15px">
      <Flex
        alignItems="center"
        justifyContent="center"
        bg={isActive ? bg : colors.filter}
        mb="5px"
        width="52px"
        css={{
          borderRadius: '50%',
          height: '52px',
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        <Icon icon={IconNames[icon]} color={isActive ? colors.white : colors.black} />
      </Flex>

      <Text textAlign="center" color={colors.filterText} fontSize={dimensions.fontSize.sm}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </Text>
    </Box>
  );
});
