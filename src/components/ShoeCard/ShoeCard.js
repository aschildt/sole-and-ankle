import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const bannerCopy = variant === 'on-sale'
    ? 'Sale'
    : variant === 'new-release'
      ? 'Just Released!'
      : ''

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          {(variant === 'on-sale' || variant === 'new-release') && (
            <Banner variant={variant}>{bannerCopy}</Banner>
          )}
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price variant={variant}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' && (<SalePrice>{formatPrice(price)}</SalePrice>)}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Banner = styled.div`
  position: absolute;
  top: 10px;
  right: -10px;
  width: fit-content;
  padding: 7px 9px;
  border-radius: 2px;
  font-weight: 700;
  color: white;
  text-align: center;
  background-color: ${p => p.variant === 'on-sale' ? COLORS.primary : COLORS.secondary};
`
const Link = styled.a`
  text-decoration: none;
  color: inherit;
  min-width: 300px;
  max-width: 500px;
  flex: 1;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: ${p => (p.variant === 'on-sale' ? COLORS.gray[700] : COLORS.gray[900])};
  text-decoration: ${p => (p.variant === 'on-sale' ? 'line-through' : 'none')};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
