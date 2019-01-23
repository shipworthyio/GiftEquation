import React from 'react';
import { Box, Flex, Text } from 'rebass';

import { AmountFilters } from 'src/components/AmountFilters';
import { AmountInput, AmountContext } from 'src/components/AmountInput';
import { CategoryFilters, CategoryFilterContext } from 'src/components/CategoryFilters';
import { Icon, IconNames } from 'src/components/Icon';
import { HeaderContext } from 'src/components/Header';

import { getEmSize } from 'src/styles/mixins';
import { colors, breakpoints } from 'src/styles/variables';

const MobileFilter = () => {
  const { showFilters, toggleFilters } = React.useContext(HeaderContext);
  const { amount } = React.useContext(AmountContext);
  const { category } = React.useContext(CategoryFilterContext);

  // Only show when filters are hidden
  if (showFilters) {
    return null;
  }

  return (
    <Flex
      onClick={toggleFilters}
      alignItems="center"
      css={{
        display: 'none',
        [`@media (max-width: ${getEmSize(breakpoints.md)}em)`]: {
          display: 'flex',
        },
      }}
    >
      <Box
        px="15px"
        my="10px"
        css={{
          boxShadow: '1px 0px 0px 0px lightgrey',
        }}
      >
        ${amount}
      </Box>

      <Flex flex="1" px="15px" my="10px" alignItems="center">
        <Flex
          alignItems="center"
          justifyContent="center"
          bg={colors.category}
          width="35px"
          css={{
            borderRadius: '50%',
            height: '35px',
            cursor: 'pointer',
          }}
        >
          <Icon icon={IconNames[category]} color={colors.white} />
        </Flex>

        <Box ml="10px">{category.charAt(0).toUpperCase() + category.slice(1)}</Box>
      </Flex>
    </Flex>
  );
};

export const Filters = () => {
  const { showFilters } = React.useContext(HeaderContext);
  return (
    <Box
      bg={colors.white}
      css={{
        boxShadow: '0px 2px 4px 0px lightgrey',
      }}
    >
      {showFilters && (
        <Flex flexWrap="wrap">
          <Box width={[1, 1, 1, 1 / 3]} py="20px" css={{ boxShadow: `0px 2px 0px 0px lightgrey` }}>
            <Box pb="15px" pl="15px">
              <Text fontSize={[3]}>Amount</Text>
            </Box>

            <Flex flexWrap="nowrap" pl="15px">
              <AmountInput />

              <AmountFilters />
            </Flex>
          </Box>

          <Box width={[1, 1, 1, 2 / 3]} my="20px" css={{ borderLeft: '2px solid lightgrey', flex: 1 }}>
            <Box pb="15px" pl="15px">
              <Text fontSize={[3]}>Filters</Text>
            </Box>

            <CategoryFilters />
          </Box>
        </Flex>
      )}

      <MobileFilter />
    </Box>
  );
};
