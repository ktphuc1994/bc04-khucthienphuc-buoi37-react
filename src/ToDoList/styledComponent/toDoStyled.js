import styled, { css } from "styled-components";
import { Color } from "./styledVariable";

export const Container = styled.div`
  width: ${(props) => props.width || "90%"};
  max-width: ${(props) => props.maxWidth || "1200px"};
  margin: 10px auto;
  padding: 20px;
  ${(props) =>
    props.modal &&
    css`
      position: fixed;
      top: 10%;
      left: 0;
      right: 0;
      max-width: 600px;
      padding: 30px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.1),
        0 2px 6px 2px rgba(60, 64, 67, 0.15);
      z-index: ${(props) => props.zIndex || "2"};
    `}
`;

export const FlexDiv = styled.div`
  position: ${(props) => props.position || "static"};
  top: 0;
  left: 0;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "auto"};
  display: flex;
  flex-direction: ${(props) => props.flexDirection || "column"};
  justify-content: ${(props) => props.justify || "flex-start"};
  align-items: ${(props) => props.alignItems || "stretch"};
  margin: ${(props) => props.margin || "10px 0"};
  padding: ${(props) => props.padding || "0"};
  z-index: ${(props) => props.zIndex || "auto"};
`;

export const NotifyDiv = styled.div`
  position: fixed;
  top: ${(props) => props.top || "65px"};
  left: 50%;
  transform: translate(
    ${(props) => props.translateX || "-50%"},
    ${(props) => props.translateY || "0"}
  );
  padding: ${(props) => props.padding || "15px 20px"};
  border-radius: ${(props) => props.borderRadius || "0"};
  background: ${(props) => props.bgColor || Color.gray800op95};
  color: ${(props) => props.textColor || Color.gray50};
  text-align: center;
  z-index: 3;
`;

export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) => props.bgColor || "gray"};
  opacity: 0.7;
  z-index: ${(props) => props.zIndex || "1"};
`;

export const Button = styled.button`
  background: white;
  padding: 0.5rem 1rem;
  margin: 0.25rem ${(props) => props.mx || "0"};
  border-top-left-radius: ${(props) => props.topLeftRadius || "8px"};
  border-top-right-radius: ${(props) => props.topRightRadius || "8px"};
  border-bottom-left-radius: ${(props) => props.bottomLeftRadius || "8px"};
  border-bottom-right-radius: ${(props) => props.bottomRightRadius || "8px"};
  border: 1px solid ${(props) => props.btnColor || Color.primary};
  color: ${(props) => props.btnColor || Color.primary};
  cursor: pointer;
  ${(props) =>
    props.solid &&
    css`
      background: ${(props) => props.btnColor || Color.primary};
      color: white;
    `}
`;

export const Input = styled.input`
  width: ${(props) => props.width || "100%"};
  padding: 0.5rem;
  margin: 0.25rem 0;
  border: 1px solid ${(props) => props.inputColor || "gray"};
  border-top-left-radius: ${(props) => props.topLeftRadius || "8px"};
  border-top-right-radius: ${(props) => props.topRightRadius || "8px"};
  border-bottom-left-radius: ${(props) => props.bottomLeftRadius || "8px"};
  border-bottom-right-radius: ${(props) => props.bottomRightRadius || "8px"};
  &:focus-visible {
    outline: 0;
    border: 1px solid ${Color.primary};
    ${(props) =>
      props.focusSearch &&
      css`
        &:focus + .fa-magnifying-glass {
          color: tomato;
        }
      `}
  }
`;

export const TableStyled = styled.table`
  width: ${(props) => props.width || "100%"};
  color: ${(props) => props.textColor || Color.gray900};
`;

export const TrStyled = styled.tr`
  background: ${(props) => props.bgColor || Color.gray500};
  color: ${(props) => props.textColor || "inherit"};
  text-align: left;
  text-transform: ${(props) => props.textTranform || "none"};
  font-weight: ${(props) => props.fw || "normal"};
`;

export const AwesomeI = styled.span`
  margin: ${(props) => props.margin || "3px"};
  color: ${(props) => props.textColor || "gray"};
  cursor: ${(props) => props.cursor || "default"};
  position: ${(props) => props.position || "static"};
  top: ${(props) => props.top || "0"};
  right: ${(props) => props.right || "0"};
  transform: translateY(${(props) => props.translateY || "0"});
  font-size: ${(props) => props.fontSize || "1rem"};
`;
