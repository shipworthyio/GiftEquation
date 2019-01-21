import memoize from 'fast-memoize';
import React from 'react';
import { Image, Text, Link, Flex } from 'rebass';

import { AmountFilterContext, AmountFilter } from 'src/components/AmountFilters';
import { AmountContext } from 'src/components/AmountInput';
import { CategoryFilterContext, Category } from 'src/components/CategoryFilters';

import { colors, dimensions, heights, widths } from 'src/styles/variables';

export interface IProduct {
  product: string;
  affiliatelink: string;
  tags: string[];
  category: Category;
  price: number;
  imageurl: string;
}

export const Product: React.FunctionComponent<IProduct> = React.memo(({ product, price, affiliatelink, imageurl }) => {
  if (!price || !imageurl) {
    return null;
  }

  return (
    <Flex m="10px" alignItems="center" justifyContent="center">
      <Link
        href={affiliatelink}
        width={widths.product}
        bg={colors.white}
        p="20px"
        css={{
          height: heights.product,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          textDecoration: 'none',
          boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
          '&:hover': {
            boxShadow: '0 22px 43px rgba(0,0,0,0.15)',
            transform: 'translateY(-4px)',
            transition: '0.3s',
          },
          userSelect: 'none',
        }}
      >
        <Image height="66%" src={imageurl} alt={product} />

        <Flex alignItems="center" flex="1">
          <Text
            mt="20px"
            color={colors.gray.calm}
            fontSize={dimensions.fontSize.base}
            css={{
              flex: 1,
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {product}
          </Text>
        </Flex>

        <Flex alignItems="center">
          <Text my="10px" color={colors.green} fontSize={dimensions.fontSize.md}>
            {price || '$11.99'}
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
});

export interface IProducts {
  products: IProduct[];
}

export const filterProducts = memoize(
  (products: IProduct[], amount: number, amountFilter: AmountFilter, categoryFilter: Category): IProduct[] => {
    return products
      .filter(({ price, category = 'all', imageurl }) => {
        if (!price || !imageurl) {
          return false;
        }

        let cost = price;
        if (typeof price === 'string') {
          cost = Number(price.replace('$', ''));
        }

        let inCategory = true;
        if (categoryFilter && categoryFilter !== 'all') {
          const categories = category ? category.split(',').map(c => c.toLowerCase().trim()) : [];
          inCategory = categories.includes(categoryFilter);
        }

        let inRange = true;
        if (amountFilter === 'below') {
          inRange = cost <= amount;
        } else {
          inRange = cost >= amount;
        }

        return inRange && inCategory;
      })
      .sort((a, b) => {
        const priceA = Number(a.price.replace('$', ''));
        const priceB = Number(b.price.replace('$', ''));

        return priceA > priceB ? 1 : -1;
      });
  }
);

export const Products: React.FunctionComponent<IProducts> = React.memo(({ products }) => {
  const { amount } = React.useContext(AmountContext);
  const { category: categoryFilter } = React.useContext(CategoryFilterContext);
  const { amountFilter } = React.useContext(AmountFilterContext);

  const filteredProducts = filterProducts(products, amount, amountFilter, categoryFilter);

  if (filteredProducts.length < 1) {
    return (
      <Flex justifyContent="center" alignItems="center" css={{ height: 300 }}>
        <Text fontSize={dimensions.fontSize.lg}>
          No products found{' '}
          <span css={{ color: colors.amountFilter, textDecoration: 'underline' }}>{amountFilter}</span> ${amount} in the{' '}
          <span css={{ color: colors.category, textDecoration: 'underline' }}>
            {categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}
          </span>{' '}
          category
        </Text>
      </Flex>
    );
  }

  return (
    <Flex flexWrap="wrap" alignItems="center" justifyContent="center">
      {filteredProducts.map((product, index) => (
        <Product key={index} {...product} />
      ))}
    </Flex>
  );
});
