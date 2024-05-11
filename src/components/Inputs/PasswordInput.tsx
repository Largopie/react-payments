import * as S from './common.style';
import { PASSWORD } from '../../constants/cardSection';
import InputSection from '../InputSection';
import Input from '../composables/Input';
import InputLabel from '../composables/InputLabel';
import { MAX_LENGTH } from '../../constants/rules';
import { useCardPassword } from 'nakta-react-payments-hooks';

interface Props {
  password: ReturnType<typeof useCardPassword>;
}

export default function PasswordInput({ password }: Props) {
  return (
    <S.Wrapper>
      <InputSection title={PASSWORD.title} inputTitle={PASSWORD.inputTitle}>
        <InputLabel htmlFor={'password'} description={'비밀번호 입력'} />
        <Input
          isAutoFocus={true}
          id="password"
          maxLength={MAX_LENGTH.password}
          onChange={password.onChange}
          onBlur={password.onBlur}
          isError={password.error.state}
          placeholder={PASSWORD.placeholder}
          type="password"
          value={password.value}
        />
      </InputSection>
      <S.ErrorWrapper>
        {password.error.state && <S.ErrorMessage>{password.error.message}</S.ErrorMessage>}
      </S.ErrorWrapper>
    </S.Wrapper>
  );
}
