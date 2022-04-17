import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { normalize } from "../utils/scaling";

interface IPageFooterProps {
  selectedPage: number;
  pages: number[] | undefined;
  onPageSelect: (page: number) => void;
}

const Wrapper = styled(View)`
  flex-direction: row;
  background-color: red;
`;

const PageItemWrapper = styled(TouchableOpacity)`
  width: ${normalize(30)}px;
  height: ${normalize(30)}px;
  justify-content: center;
  border-width: 1px;
  background-color: gray;
  align-items: center;
`;
export const PageFooter = (props: IPageFooterProps) => {
  const { pages, selectedPage, onPageSelect } = props;
  return (
    <Wrapper>
      {pages?.map((number) => {
        return (
          <PageItemWrapper key={number} onPress={() => onPageSelect(number)}>
            <Text style={{ color: selectedPage == number ? "red" : "black" }}>
              {number.toString()}
            </Text>
          </PageItemWrapper>
        );
      })}
    </Wrapper>
  );
};
