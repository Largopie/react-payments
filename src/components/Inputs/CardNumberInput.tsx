import * as S from './common.style';
import { CARD_NUMBER } from '../../constants/cardSection';
import InputSection from '../InputSection';
import Input from '../composables/Input';
import InputLabel from '../composables/InputLabel';
import { useCardNumber } from 'nakta-react-payments-hooks';

interface Props {
  cardNumber: ReturnType<typeof useCardNumber>;
}

export default function CardNumberInput({ cardNumber }: Props) {
  return (
    <S.Wrapper>
      <InputSection
        title={CARD_NUMBER.title}
        description={CARD_NUMBER.description}
        inputTitle={CARD_NUMBER.inputTitle}
      >
        <InputLabel htmlFor="cardNumber" description="카드 번호 입력" />
        <Input
          isAutoFocus={true}
          id="cardNumber"
          placeholder="1234"
          type="text"
          value={cardNumber.value}
          onChange={cardNumber.onChange}
          onBlur={cardNumber.onBlur}
          isError={cardNumber.error.state}
        />
      </InputSection>
      <S.ErrorWrapper>
        {cardNumber.error.state && <S.ErrorMessage>{cardNumber.error.message}</S.ErrorMessage>}
      </S.ErrorWrapper>
    </S.Wrapper>
  );
}
