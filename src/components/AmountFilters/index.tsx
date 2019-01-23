import React from 'react';
import { Flex } from 'rebass';

import { Filter } from 'src/components/Filter';
import { IconNames } from 'src/components/Icon';

import { colors } from 'src/styles/variables';

export const AMOUNT_FILTER_ABOVE = 'above';
export const AMOUNT_FILTER_BELOW = 'below';
export const DEFAULT_AMOUNT_FILTER = AMOUNT_FILTER_ABOVE;

export type AmountFilter = 'below' | 'above';

export interface IAmountFilterContext {
  amountFilter: AmountFilter;
  setAmountFilter(amountFilter: AmountFilter): void;
}

export const AmountFilterContext = React.createContext<IAmountFilterContext>({
  amountFilter: AMOUNT_FILTER_BELOW,
  setAmountFilter(amountFilter) {},
});

export const AmountFilterProvider: React.FunctionComponent = ({ children }) => {
  const [amountFilter, setAmountFilter] = React.useState(DEFAULT_AMOUNT_FILTER as AmountFilter);

  return (
    <AmountFilterContext.Provider value={{ amountFilter, setAmountFilter }}>{children}</AmountFilterContext.Provider>
  );
};

export const AmountFilters: React.FunctionComponent = () => {
  const { amountFilter, setAmountFilter } = React.useContext(AmountFilterContext);

  return (
    <Flex>
      <Filter
        name="below"
        icon={IconNames.arrowDown}
        isActive={amountFilter === AMOUNT_FILTER_BELOW}
        bg={colors.amountFilter}
        onClick={() => setAmountFilter(AMOUNT_FILTER_BELOW)}
      />

      <Filter
        name="above"
        icon={IconNames.arrowUp}
        isActive={amountFilter === AMOUNT_FILTER_ABOVE}
        bg={colors.amountFilter}
        onClick={() => setAmountFilter(AMOUNT_FILTER_ABOVE)}
      />
    </Flex>
  );
};
