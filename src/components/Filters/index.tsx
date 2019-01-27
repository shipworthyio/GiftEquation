import React from 'react';
import { Box, Flex, Text } from 'rebass';

import { AmountFilters } from 'src/components/AmountFilters';
import { AmountInput, AmountContext } from 'src/components/AmountInput';
import { CategoryFilters, CategoryFilterContext } from 'src/components/CategoryFilters';
import { Icon, IconNames } from 'src/components/Icon';
import { HeaderContext } from 'src/components/Header';

import { colors, breakpoints, dimensions } from 'src/styles/variables';

const MobileFilter = () => {
  const { showFilters, toggleFilters } = React.useContext(HeaderContext);
  const { amount } = React.useContext(AmountContext);
  const { category } = React.useContext(CategoryFilterContext);

  return (
    <div
      onClick={toggleFilters}
      css={{
        display: 'none',
        padding: '15px 24px',
        alignItems: 'center',
        backgroundColor: colors.white,
        [`@media (max-width: ${breakpoints.md}px)`]: {
          display: 'flex',
          marginTop: showFilters ? '-400px' : 0,
          transition: 'margin 0.5s ease-in-out',
          boxShadow: showFilters ? 'none' : '0px 2px 4px 0px lightgrey',
          borderBottomRightRadius: '8px',
          borderBottomLeftRadius: '8px',
        },
      }}
    >
      <Box
        pr="24px"
        fontSize={dimensions.fontSize.large}
        css={{
          boxShadow: '1px 0px 0px 0px lightgrey',
        }}
      >
        ${amount}
      </Box>

      <Flex flex="1" pl="24px" alignItems="center">
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
    </div>
  );
};

export const Filters = () => {
  const { showFilters } = React.useContext(HeaderContext);
  return (
    <Box
      bg={colors.white}
      css={{
        flex: '1',
        boxShadow: '0px 2px 4px 0px lightgrey',
        [`@media (max-width: ${breakpoints.md}px)`]: {
          boxShadow: 'none',
        },
      }}
    >
      <Flex
        flexWrap="wrap"
        bg={colors.white}
        css={{
          marginTop: showFilters ? 0 : '-300px',
          transition: 'margin 0.5s ease-in-out',
          [`@media (max-width: ${breakpoints.md}px)`]: {
            boxShadow: showFilters ? '0px 2px 4px 0px lightgrey' : 'none',
          },
        }}
      >
        <Box
          width={[1, 1, 1, 1 / 3]}
          pt="25px"
          pb="20px"
          pl="24px"
          pr="15px"
          css={{ boxShadow: `0px 2px 0px 0px lightgrey` }}
        >
          <Box pb="15px">
            <Text fontWeight="bold" fontSize={dimensions.fontSize.large}>
              <label for="amount">Amount</label>
            </Text>
          </Box>

          <Flex flexWrap="nowrap">
            <AmountInput />

            <AmountFilters />
          </Flex>
        </Box>

        <Box width={[1, 1, 1, 2 / 3]} mt="25px" mb="20px" css={{ borderLeft: '2px solid lightgrey', flex: 1 }}>
          <Box>
            <Text pb="15px" pl="24px" fontWeight="bold" fontSize={dimensions.fontSize.large}>
              Filters
            </Text>

            <CategoryFilters />
          </Box>
        </Box>
      </Flex>

      <MobileFilter />
    </Box>
  );
};
