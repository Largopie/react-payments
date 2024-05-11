import * as S from './common.style';
import { OWNER_NAME } from '../../constants/cardSection';
import InputSection from '../InputSection';
import Input from '../composables/Input';
import InputLabel from '../composables/InputLabel';
import { MAX_LENGTH } from '../../constants/rules';
import styled from 'styled-components';
import { useCardOwner } from 'nakta-react-payments-hooks';

const CompleteButton = styled.button`
  padding: 4px 8px;
  color: #fff;
  background-color: #333333;

  border-radius: 4px;

  &:hover {
    opacity: 0.8;
  }
`;

interface Props {
  cardOwner: ReturnType<typeof useCardOwner>;
  setNextContentDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CardOwnerInput({ cardOwner, setNextContentDisplay }: Props) {
  const goNextStep = (e: React.KeyboardEvent<HTMLInputElement>, value: string) => {
    if (value !== '' && e.key === 'Enter') {
      setNextContentDisplay(true);
    }
  };

  return (
    <S.Wrapper>
      <InputSection title={OWNER_NAME.title} inputTitle={OWNER_NAME.inputTitle}>
        <InputLabel htmlFor={'name'} description={'이름 입력'} />
        <Input
          isAutoFocus={true}
          id="name"
          maxLength={MAX_LENGTH.ownerName}
          onChange={cardOwner.onChange}
          onKeyDown={(e) => goNextStep(e, cardOwner.value)}
          onBlur={cardOwner.onBlur}
          isError={cardOwner.error.state}
          placeholder="JOHN DOE"
          type="text"
          value={cardOwner.value.toUpperCase()}
        />
        {cardOwner.isValid && (
          <CompleteButton onClick={() => setNextContentDisplay(true)}>완료</CompleteButton>
        )}
      </InputSection>
      <S.ErrorWrapper>
        {cardOwner.error.state && <S.ErrorMessage>{cardOwner.error.message}</S.ErrorMessage>}
      </S.ErrorWrapper>
    </S.Wrapper>
  );
}
