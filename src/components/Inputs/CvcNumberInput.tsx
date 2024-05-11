import * as S from './common.style';
import { CVC_NUMBER } from '../../constants/cardSection';
import InputSection from '../InputSection';
import Input from '../composables/Input';
import InputLabel from '../composables/InputLabel';
import { MAX_LENGTH } from '../../constants/rules';
import { useCardCVC } from 'nakta-react-payments-hooks';

interface Props {
  cvc: ReturnType<typeof useCardCVC>;
  setIsFlip: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CvcNumberInput({ cvc, setIsFlip }: Props) {
  return (
    <S.Wrapper>
      <InputSection title={CVC_NUMBER.title} inputTitle={CVC_NUMBER.inputTitle}>
        <InputLabel htmlFor={'cvc'} description={'CVC 번호 입력'} />
        <Input
          isAutoFocus={true}
          id="cvc"
          maxLength={MAX_LENGTH.cvcNumber}
          onChange={cvc.onChange}
          onBlur={(e) => {
            cvc.onBlur(e);
            setIsFlip(false);
          }}
          isError={cvc.error.state}
          placeholder={CVC_NUMBER.placeholder}
          onFocus={() => {
            setIsFlip(true);
          }}
          type="text"
          value={cvc.value}
        />
      </InputSection>
      <S.ErrorWrapper>
        {cvc.error.state && <S.ErrorMessage>{cvc.error.message}</S.ErrorMessage>}
      </S.ErrorWrapper>
    </S.Wrapper>
  );
}
