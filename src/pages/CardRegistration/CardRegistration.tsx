import { useEffect, useState } from 'react';
import * as S from './CardRegistration.style';

import CardPreview from '../../components/CardPreview/CardPreview';

import { CARD_COMPANY_COLOR } from '../../constants/cardSection';
import CardNumberInput from '../../components/Inputs/CardNumberInput';
import CardBrandSelect from '../../components/Inputs/CardBrandSelect';
import ExpirationDateInput from '../../components/Inputs/ExpirationDateInput';
import CardOwnerInput from '../../components/Inputs/CardOwnerInput';
import CvcNumberInput from '../../components/Inputs/CvcNumberInput';
import PasswordInput from '../../components/Inputs/PasswordInput';

import {
  useCardCompany,
  useCardExpirationDate,
  useCardNumber,
  useCardOwner,
} from 'nakta-react-payments-hooks';
import useCvcNumber from '../../hooks/useCvcNumber';
import usePassword from '../../hooks/usePassword';

export type CardNumberState = {
  value: string;
  isError: boolean;
  errorMessage: string;
};

export default function CardRegistration() {
  const [isFlip, setIsFlip] = useState(false);
  const [cardBrandDisplay, setCardBrandDisplay] = useState(false);
  const [expirationDateDisplay, setExpirationDateDisplay] = useState(false);
  const [cardOwnerDisplay, setCardOwnerDisplay] = useState(false);
  const [cvcDisplay, setCvcDisplay] = useState(false);
  const [passwordDisplay, setPasswordDisplay] = useState(false);

  const cardNumber = useCardNumber();
  const cardCompany = useCardCompany();
  const cardExpirationDate = useCardExpirationDate();
  const cardOwner = useCardOwner();

  const { cvc, isValidCvc } = useCvcNumber();
  const { password, isValidPassword } = usePassword();

  const isShowConfirmButton =
    cardNumber.isValid &&
    cardCompany.isValid &&
    cardExpirationDate.isExpirationDateValid &&
    cardOwner.isValid &&
    isValidCvc &&
    isValidPassword;

  useEffect(() => {
    if (cardNumber.isValid) setCardBrandDisplay(true);
  }, [cardNumber.isValid]);

  useEffect(() => {
    if (cardCompany.isValid) setExpirationDateDisplay(true);
  }, [cardCompany.isValid]);

  useEffect(() => {
    if (cardExpirationDate.isExpirationDateValid) setCardOwnerDisplay(true);
  }, [cardExpirationDate.isExpirationDateValid]);

  return (
    <>
      <S.SubContainer>
        <S.CardPreviewWrapper>
          <CardPreview
            isFlip={isFlip}
            cardNumbers={cardNumber.value.split('-')}
            month={cardExpirationDate.month.value}
            year={cardExpirationDate.year.value}
            name={cardOwner.value.toUpperCase()}
            cvc={cvc.value}
            brand={cardNumber.brand}
            cardColor={CARD_COMPANY_COLOR[cardCompany.value]}
          />
        </S.CardPreviewWrapper>
        <S.CardInfoContainer>
          {/* 카드 번호 입력 */}
          <CardNumberInput cardNumber={cardNumber} />

          {/* 카드사 선택 */}
          {cardBrandDisplay && <CardBrandSelect cardCompany={cardCompany} />}

          {/* 유효기간 입력 */}
          {expirationDateDisplay && <ExpirationDateInput cardExpirationDate={cardExpirationDate} />}

          {/* 카드 소유자 입력 */}
          {cardOwnerDisplay && (
            <CardOwnerInput cardOwner={cardOwner} setNextContentDisplay={setCvcDisplay} />
          )}

          {/* CVC 번호 입력 */}
          {cvcDisplay && (
            <CvcNumberInput
              cvc={cvc}
              setNextContentDisplay={setPasswordDisplay}
              setIsFlip={setIsFlip}
            />
          )}
          {/* 비밀번호 입력 */}
          {passwordDisplay && <PasswordInput password={password} />}
        </S.CardInfoContainer>
      </S.SubContainer>
      {isShowConfirmButton && (
        <S.ConfirmLink
          to="/confirm"
          state={{ cardNumber: cardNumber.value.split('-')[0], cardCompany: cardCompany.value }}
        >
          확인
        </S.ConfirmLink>
      )}
    </>
  );
}
