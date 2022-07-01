import styled from 'styled-components';

export const FormGroup = styled.div`
  display: ${(props) => (props.fullWidth ? 'flex' : 'block')};
  flex-direction: ${(props) => (props.fullWidth ? 'column' : null)};
`;

export const FormLabel = styled.label`
  font-weight: normal;
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
  display: block;
`;

export const FormInput = styled.input`
  display: block;
  padding: 0.6rem 0.8rem;
  border: 2px solid grey;
  border-radius: 6px;
  font-weight: bold;
  margin-bottom: 0.8rem;
  &:focus {
    outline: 0;
    border-color: var(--blue);
    box-shadow: 0 0 0 0.2rem #d9f4f5;
  }
`;
