import { CARD_BRAND_IMAGE } from '../../assets/images';
import * as S from './CardPreview.style';

type CardBrand = keyof typeof CARD_BRAND_IMAGE;

type CreditCardProps = {
  isFlip: boolean;
  cardNumbers: string[];
  month: string;
  year: string;
  name: string;
  cvc: string;
  brand: string;
  cardColor: string;
};

const getCardBrandImage = (brand: CardBrand): string => {
  return CARD_BRAND_IMAGE[brand];
};

export default function CardPreview({
  isFlip,
  cardNumbers,
  month,
  year,
  name,
  cvc,
  brand,
  cardColor = '',
}: CreditCardProps) {
  return (
    <S.Container>
      <S.CardContainer $bgColor={cardColor}>
        <S.Front $isFlip={isFlip}>
          <S.CardHeader>
            <S.CardHeaderContentWrapper>
              <S.IcChip />
            </S.CardHeaderContentWrapper>
            <S.CardHeaderContentWrapper>
              {brand ? <S.CardBrand src={getCardBrandImage(brand as CardBrand)} /> : null}
            </S.CardHeaderContentWrapper>
          </S.CardHeader>
          <S.CardInfoWrapper>
            <S.NumbersContainer>
              {cardNumbers.map((cardNumber, index) => {
                if (index === 0)
                  return <S.NumbersWrapper key={index}>{cardNumber}</S.NumbersWrapper>;
                else
                  return (
                    <S.NumbersWrapper key={index}>{'*'.repeat(cardNumber.length)}</S.NumbersWrapper>
                  );
              })}
            </S.NumbersContainer>
            <S.Text>{month + `${month || year ? '/' : ''}` + year}</S.Text>
            <S.Text>{name}</S.Text>
          </S.CardInfoWrapper>
        </S.Front>
        <S.Back $isFlip={isFlip}>
          <S.MagneticStripe>
            <S.CVCNumber>{cvc}</S.CVCNumber>
          </S.MagneticStripe>
        </S.Back>
      </S.CardContainer>
    </S.Container>
  );
}
