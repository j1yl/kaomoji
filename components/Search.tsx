import { StyleSheet, TextInput, Text, View, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import emoticonData from "../assets/emoticon_dict.json";
import {
  useFonts,
  CormorantGaramond_400Regular,
} from "@expo-google-fonts/cormorant-garamond";
import { DawningofaNewDay_400Regular } from "@expo-google-fonts/dawning-of-a-new-day";

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
  clicked,
  setClicked,
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
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        <TextInput
          style={styles.input}
          placeholder="Search for tags"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
          autoFocus
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
        <View
          onTouchEnd={() => {
            setSearchPhrase("cute");
            setClicked(false);
          }}
          style={styles.searchTag}
        >
          <Text style={styles.searchTagText}>cute</Text>
        </View>
        <View
          onTouchEnd={() => {
            setSearchPhrase("happy");
            setClicked(false);
          }}
          style={styles.searchTag}
        >
          <Text style={styles.searchTagText}>happy</Text>
        </View>
        <View
          onTouchEnd={() => {
            setSearchPhrase("sad");
            setClicked(false);
          }}
          style={styles.searchTag}
        >
          <Text style={styles.searchTagText}>sad</Text>
        </View>
        <View
          onTouchEnd={() => {
            setSearchPhrase("star");
            setClicked(false);
          }}
          style={styles.searchTag}
        >
          <Text style={styles.searchTagText}>star</Text>
        </View>
        <View
          onTouchEnd={() => {
            setSearchPhrase("wink");
            setClicked(false);
          }}
          style={styles.searchTag}
        >
          <Text style={styles.searchTagText}>wink</Text>
        </View>
        <View
          onTouchEnd={() => {
            setSearchPhrase("cat");
            setClicked(false);
          }}
          style={styles.searchTag}
        >
          <Text style={styles.searchTagText}>cat</Text>
        </View>
        <View
          onTouchEnd={() => {
            setSearchPhrase("bear");
            setClicked(false);
          }}
          style={styles.searchTag}
        >
          <Text style={styles.searchTagText}>bear</Text>
        </View>
      </View>
      <View style={styles.resultsContainer}>
        <FlatList
          data={filteredEmoticons}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View
              style={styles.emoticonContainer}
              onTouchStart={() => {
                copyToClipboard(item);
              }}
            >
              <Text style={styles.emoticonText}>{item}</Text>
              <View style={styles.tagContainer}>
                {emoticons[item].new_tags.map((tag: string) => (
                  <Text key={tag} style={styles.tag}>
                    {tag.toLowerCase()}
                  </Text>
                ))}
                {emoticons[item].original_tags.length > 0 && (
                  <Text
                    key={emoticons[item].original_tags[0]}
                    style={styles.tag}
                  >
                    {emoticons[item].original_tags[0].toLowerCase()}
                  </Text>
                )}
              </View>
            </View>
          )}
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

  searchBar__unclicked: {
    padding: 8,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#d9dbda",
    borderRadius: 8,
    alignItems: "center",
  },

  searchBar__clicked: {
    padding: 8,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#d9dbda",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  input: {
    fontSize: 14,
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

  emoticonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginVertical: 8,
    backgroundColor: "hsl(0, 0%, 90%)",
    borderRadius: 8,
  },

  emoticonText: {
    fontSize: 24,
    textAlign: "center",
  },

  tagContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    flexWrap: "wrap",
  },

  tag: {
    fontSize: 14,
    fontFamily: "CormorantGaramond_400Regular",
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "hsl(0, 0%, 85%)",
    overflow: "hidden",
    borderRadius: 8,
  },

  searchTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "hsl(0, 0%, 85%)",
    overflow: "hidden",
    borderRadius: 8,
  },

  searchTagText: {
    fontSize: 14,
    fontFamily: "CormorantGaramond_400Regular",
  },
});
