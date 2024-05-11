import * as S from './common.style';
import { CARD_COMPANY } from '../../constants/cardSection';
import InputSection from '../InputSection';
import Select from '../composables/Select';
import { useCardCompany } from 'nakta-react-payments-hooks';

interface Props {
  cardCompany: ReturnType<typeof useCardCompany>;
}

export default function CardBrandSelect({ cardCompany }: Props) {
  return (
    <S.Wrapper>
      <InputSection title={CARD_COMPANY.title} description={CARD_COMPANY.description}>
        <Select
          options={[...CARD_COMPANY.options]}
          value={cardCompany.value}
          placeholder={CARD_COMPANY.placeholder}
          isError={cardCompany.error.state}
          onChange={cardCompany.onChange}
          onBlur={cardCompany.onBlur}
        />
      </InputSection>
      <S.ErrorWrapper>
        {cardCompany.error.state && <S.ErrorMessage>{cardCompany.error.message}</S.ErrorMessage>}
      </S.ErrorWrapper>
    </S.Wrapper>
  );
}
