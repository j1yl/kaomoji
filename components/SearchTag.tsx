import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

type Props = {
  searchPhrase: string;
  setSearchPhrase: (searchPhrase: string) => void;
};

export function SearchTag({ searchPhrase, setSearchPhrase }: Props) {
  const [clicked, setClicked] = useState(false);

  return (
    <View
      onTouchStart={() => {
        setClicked(true);
      }}
      onTouchEnd={() => {
        setSearchPhrase(searchPhrase);
        setClicked(false);
      }}
      style={
        clicked
          ? [styles.searchTag, styles._onPressSearchTag]
          : styles.searchTag
      }
    >
      <Text style={styles.searchTagText}>{searchPhrase}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  searchTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "hsl(0, 0%, 85%)",
    overflow: "hidden",
    borderRadius: 8,
  },
  searchTagText: {
    fontSize: 16,
    fontFamily: "CormorantGaramond_400Regular",
  },
  _onPressSearchTag: {
    backgroundColor: "hsl(0, 0%, 80%)",
  },
});
