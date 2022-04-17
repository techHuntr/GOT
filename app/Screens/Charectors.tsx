import React, { useCallback, useEffect } from "react";
import { FlatList, SafeAreaView, View, Dimensions, Button } from "react-native";
import styled from "styled-components";
import CharectorItem from "../Components/CharectorItem";
const windowWidth = Dimensions.get("window").width;
import { Charector } from "../modals/Charector";
import { useAppDispatch, useAppSelector } from "../redux/stateHooks";
import {
  selectCharectorApiStatus,
  fetchAllCharectors,
  selectAllCharetctors,
  selectAllPages,
} from "../redux/reducers/startup";
import { API_STATUS, PAGE_SIZE } from "../Constants";
import { PageFooter } from "../Components/PageFooter";
import { normalize } from "../utils/scaling";
import { getCurrentPageItems } from "../utils/helpers";
import SelectDropdown from "react-native-select-dropdown";

const FilterWrapper = styled(View)`
  width: ${windowWidth}px;
  margin-top: ${normalize(50)}px;
  flex-direction: row;
`;

const Column = styled(View)`
  flex: 1;
  height: ${normalize(50)}px;
  margin-left: 5px;
  margin-right: 5px;
  justify-content: center;
`;

const FooterWrapper = styled(View)`
  margin-right: ${normalize(10)}px;
  align-items: flex-end;
  margin-bottom: ${normalize(20)}px;
`;

export interface titles {
  label: string;
  value: string;
}
export const Charectors = (props: any) => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectCharectorApiStatus);
  const charectors = useAppSelector(selectAllCharetctors);
  const pages = useAppSelector(selectAllPages);

  const [selctedTitle, setSelectedTitle] = React.useState("");
  const [selectedFamily, setSelectecFamily] = React.useState("");
  const [families, setFamilies] = React.useState<string[]>([]);
  const [selectedPage, setSelectedPage] = React.useState(1);
  const [currentPageItems, setCurrentPageItems] = React.useState<Charector[]>();

  const [titles, setTitles] = React.useState<string[]>([]);

  const makeCharectorApiRequest = useCallback(() => {
    dispatch<any>(fetchAllCharectors());
  }, [dispatch]);

  useEffect(() => {
    makeCharectorApiRequest();
  }, []);

  useEffect(() => {
    if (status === API_STATUS.SUCCESS) {
      getTitles();
      getFamilies();
      setCurrentPageItems(charectors.slice(0, PAGE_SIZE));
    }
  }, [status, dispatch]);

  const getTitles = () => {
    let titleList: string[] = [];
    try {
      charectors.forEach((charector: Charector) => {
        if (!titles.includes(charector.title)) {
          titleList.push(charector.title);
        }
      });
    } catch (error) {
      console.log(error);
    }
    setTitles(titleList);
  };

  const getFamilies = () => {
    let familyList: string[] = [];
    try {
      charectors.forEach((charector) => {
        if (!families.includes(charector.family)) {
          familyList.push(charector.family);
        }
      });
    } catch (error) {
      console.log(error);
    }
    setFamilies(familyList);
  };

  const onPressFilter = () => {
    let filteredArray: Charector[] = [];
    if (selctedTitle && selectedFamily) {
      filteredArray = charectors.filter((obj) => {
        return obj.title === selctedTitle && obj.family === selectedFamily;
      });
    }

    if (selctedTitle && !selectedFamily) {
      filteredArray = charectors.filter((obj) => {
        return obj.title === selctedTitle;
      });
    }

    if (selectedFamily && !selctedTitle) {
      filteredArray = charectors.filter((obj) => {
        return obj.family === selectedFamily;
      });
    }
    setCurrentPageItems(filteredArray);
  };

  const onPageSelect = (selectedPage: number) => {
    setSelectedPage(selectedPage);
    const selectedPageItems = getCurrentPageItems(charectors, selectedPage);
    setSelectedTitle("");
    setSelectecFamily("");
    setCurrentPageItems(selectedPageItems);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      <FilterWrapper>
        <Column>
          <SelectDropdown
            data={titles}
            defaultButtonText={"select title"}
            buttonStyle={{ width: 100 }}
            defaultValue={selctedTitle}
            onSelect={(selectedItem, index) => {
              setSelectedTitle(selectedItem);
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            dropdownIconPosition="right"
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        </Column>
        <Column>
          <SelectDropdown
            data={families}
            defaultButtonText={"select family"}
            buttonStyle={{ width: 100 }}
            defaultValue={selectedFamily}
            onSelect={(selectedItem, index) => {
              setSelectedTitle(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            dropdownIconPosition="right"
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        </Column>
        <Column>
          <Button
            disabled={!selctedTitle && !selectedFamily}
            onPress={onPressFilter}
            title="Filter"
            color="#841584"
          />
        </Column>
      </FilterWrapper>
      <FlatList
        data={currentPageItems}
        renderItem={(item) => (
          <CharectorItem CharectorItem={item.item} key={item.index} />
        )}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => (
          <FooterWrapper>
            <PageFooter
              selectedPage={selectedPage}
              pages={pages}
              onPageSelect={(page) => onPageSelect(page)}
            />
          </FooterWrapper>
        )}
      />
    </SafeAreaView>
  );
};

export default Charectors;
