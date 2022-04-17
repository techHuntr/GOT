import { View, Text, Image } from "react-native";
import styled from "styled-components";
import { Charector } from "../modals/Charector";
import { normalize } from "../utils/scaling";

interface ICharectorItemProps {
  CharectorItem: Charector;
}

const Container = styled(View)`
  border-color: black;
  border-width: 1px;
  margin-top: 10px;
  margin-bottom: 10px;
  flex-direction: row;
`;

const Column = styled(View)`
  width: ${normalize(50)}px;
  height: ${normalize(50)}px;
  justify-content: center;
  align-items: center;
  border-color: black;
  border-width: 1px;
`;

const TextDisplay = styled(Text)`
  font-size: 14px;
`;

const DisplayImage = styled(Image)`
  width: 50px;
  height: 50px;
`;

export const CharectorItem = (props: ICharectorItemProps) => {
  const { CharectorItem } = props;

  return (
    <Container>
      <Column>
        <TextDisplay>{CharectorItem.id}</TextDisplay>
      </Column>
      <Column>
        <DisplayImage
          source={{
            uri: CharectorItem.imageUrl,
          }}
          resizeMode="contain"
        />
      </Column>
      <Column>
        <TextDisplay numberOfLines={1}>{CharectorItem.firstName}</TextDisplay>
      </Column>
      <Column>
        <TextDisplay numberOfLines={1}>{CharectorItem.lastName}</TextDisplay>
      </Column>
      <Column>
        <TextDisplay numberOfLines={1}>{CharectorItem.title}</TextDisplay>
      </Column>
      <Column>
        <TextDisplay numberOfLines={1}>{CharectorItem.family}</TextDisplay>
      </Column>
    </Container>
  );
};

export default CharectorItem;
