import * as S from './common.style';
import { EXPIRATION_PERIOD } from '../../constants/cardSection';
import InputSection from '../InputSection';
import Input from '../composables/Input';
import InputLabel from '../composables/InputLabel';
import { MAX_LENGTH } from '../../constants/rules';
import { useCardExpirationDate } from 'nakta-react-payments-hooks';

interface Props {
  cardExpirationDate: ReturnType<typeof useCardExpirationDate>;
}

export default function ExpirationDateInput({ cardExpirationDate }: Props) {
  const { month, year, expirationDateError, expirationDateErrorMessage } = cardExpirationDate;

  // const goYearStep = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.value.length === MAX_LENGTH.expirationDate) {
  //     year.ref.current?.focus();
  //   }
  // };

  return (
    <S.Wrapper>
      <InputSection
        title={EXPIRATION_PERIOD.title}
        description={EXPIRATION_PERIOD.description}
        inputTitle={EXPIRATION_PERIOD.inputTitle}
      >
        <InputLabel htmlFor={'month'} description={'월 입력'} />
        <Input
          isAutoFocus={true}
          id={'month'}
          placeholder={'MM'}
          type="text"
          value={month.value}
          maxLength={MAX_LENGTH.expirationDate}
          onChange={month.onChange}
          onBlur={month.onBlur}
          isError={month.error.state || expirationDateError.state}
        />
        <InputLabel htmlFor={'year'} description={'년도 입력'} />
        <Input
          id={'year'}
          placeholder={'YY'}
          type="text"
          maxLength={MAX_LENGTH.expirationDate}
          value={year.value}
          onChange={year.onChange}
          onBlur={year.onBlur}
          isError={year.error.state || expirationDateError.state}
        />
      </InputSection>
      <S.ErrorWrapper>
        {expirationDateError && <S.ErrorMessage>{expirationDateErrorMessage}</S.ErrorMessage>}
      </S.ErrorWrapper>
    </S.Wrapper>
  );
}
