import { graphql } from 'gatsby';
import React from 'react';
import { Box } from 'rebass';

import { AmountFilterProvider } from 'src/components/AmountFilters';
import { AmountProvider } from 'src/components/AmountInput';
import { CategoryFilterProvider } from 'src/components/CategoryFilters';
import { Header } from 'src/components/Header';
import { Products, IProduct } from 'src/components/Product';
import SEO from 'src/components/SEO';

import { colors } from 'src/styles/variables';

import 'src/styles/normalize';
import 'modern-normalize';

interface IEdge {
  node: IProduct;
}

interface IPage {
  data: {
    allGoogleSheetProductsRow: {
      edges: IEdge[];
    };
  };
}

const Page: React.FunctionComponent<IPage> = React.memo(({ data }) => {
  return (
    <>
      <SEO />

      <AmountFilterProvider>
        <CategoryFilterProvider>
          <AmountProvider>
            <Box bg={colors.background} css={{ position: 'relative', fontFamily: 'Montserrat' }}>
              <Header />

              <Box mx="auto" py="40px" css={{ maxWidth: 1380 }}>
                <Products products={data.allGoogleSheetProductsRow.edges.map(e => e.node)} />
              </Box>
            </Box>
          </AmountProvider>
        </CategoryFilterProvider>
      </AmountFilterProvider>
    </>
  );
});

export default Page;

export const IndexQuery = graphql`
  query {
    allGoogleSheetProductsRow {
      edges {
        node {
          product
          affiliatelink
          tags
          category
          imageurl
          price
        }
      }
    }
  }
`;
