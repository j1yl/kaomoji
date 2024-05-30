import { StyleSheet, TextInput, Text, View, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import emoticonData from "../assets/emoticon_dict.json";
import {
  useFonts,
  CormorantGaramond_400Regular,
} from "@expo-google-fonts/cormorant-garamond";
import { DawningofaNewDay_400Regular } from "@expo-google-fonts/dawning-of-a-new-day";
import { SearchTag } from "./SearchTag";
import EmojiCard from "./EmojiCard";

const emoticons = emoticonData as EmoticonData;

type Props = {
  clicked: boolean;
  setClicked: (clicked: boolean) => void;
  searchPhrase: string;
  setSearchPhrase: (searchPhrase: string) => void;
  copyToClipboard: (text: string) => void;
};

type EmoticonData = {
  [key: string]: {
    new_tags: string[];
    original_tags: string[];
  };
};

export function Search({
  searchPhrase,
  setSearchPhrase,
  copyToClipboard,
}: Props) {
  const [filteredEmoticons, setFilteredEmoticons] = useState<string[]>([]);

  useEffect(() => {
    if (searchPhrase) {
      const results = searchEmoticons(searchPhrase);
      setFilteredEmoticons(results);
    } else {
      const results = searchEmoticons("");
      setFilteredEmoticons(results);
    }
  }, [searchPhrase]);

  const searchEmoticons = (phrase: string): string[] => {
    const lowercasedPhrase = phrase.toLowerCase();
    const newTagsResults = Object.keys(emoticons)
      .sort((emoticonA, emoticonB) => emoticonA.length - emoticonB.length)
      .filter((emoticon) =>
        emoticons[emoticon].new_tags.some((tag: string) =>
          tag.toLowerCase().includes(lowercasedPhrase)
        )
      );

    if (newTagsResults.length > 0) {
      return newTagsResults;
    }

    return Object.keys(emoticons)
      .sort((emoticonA, emoticonB) => emoticonA.length - emoticonB.length)
      .filter((emoticon) =>
        emoticons[emoticon].original_tags.some((tag: string) =>
          tag.toLowerCase().includes(lowercasedPhrase)
        )
      );
  };

  let [fontsLoaded] = useFonts({
    CormorantGaramond_400Regular,
    DawningofaNewDay_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 48,
          fontWeight: "bold",
          fontFamily: "DawningofaNewDay_400Regular",
          paddingBottom: 16,
        }}
      >
        kaomoji & more
      </Text>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="search for tags"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
        />
        <Feather name="search" size={16} color="black" />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          paddingTop: 16,
          paddingBottom: 8,
          gap: 8,
        }}
      >
        <SearchTag searchPhrase={"cute"} setSearchPhrase={setSearchPhrase} />
        <SearchTag searchPhrase={"happy"} setSearchPhrase={setSearchPhrase} />
        <SearchTag searchPhrase={"sad"} setSearchPhrase={setSearchPhrase} />
        <SearchTag searchPhrase={"star"} setSearchPhrase={setSearchPhrase} />
        <SearchTag searchPhrase={"wink"} setSearchPhrase={setSearchPhrase} />
        <SearchTag searchPhrase={"cat"} setSearchPhrase={setSearchPhrase} />
        <SearchTag searchPhrase={"bear"} setSearchPhrase={setSearchPhrase} />
      </View>
      <View style={styles.resultsContainer}>
        <FlatList
          data={filteredEmoticons}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const tags = emoticons[item].new_tags.concat(
              emoticons[item].original_tags
            );
            return (
              <EmojiCard
                key={item}
                item={item}
                tags={tags}
                copyToClipboard={copyToClipboard}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },

  searchBar: {
    padding: 8,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "hsl(0, 0%, 90%)",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  input: {
    fontSize: 16,
    fontFamily: "CormorantGaramond_400Regular",
    width: "90%",
  },

  resultsContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxHeight: "100%",
    overflow: "scroll",
  },
});
