import { View, Text, StyleSheet, Alert, Button } from "react-native";

type Props = {
  item: string;
  tags: string[];
  copyToClipboard: (text: string) => void;
};

export default function EmojiCard({ item, tags, copyToClipboard }: Props) {
  return (
    <View style={styles.emoticonContainer}>
      <Text style={styles.emoticonText}>{item}</Text>
      <View style={styles.tagContainer}>
        {tags.map((tag: string, index: number) => (
          <Text key={index} style={styles.tag}>
            {tag.toLowerCase()}
          </Text>
        ))}
      </View>
      <Button
        title="copy to clipboard"
        color={"hsl(0, 0%, 50%)"}
        onPress={() => {
          copyToClipboard(item);
          Alert.alert("Copied to clipboard!", item);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  tag: {
    fontSize: 16,
    fontFamily: "CormorantGaramond_400Regular",
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "hsl(0, 0%, 85%)",
    overflow: "hidden",
    borderRadius: 8,
  },
  emoticonText: {
    fontSize: 24,
    textAlign: "center",
  },
  emoticonContainer: {
    padding: 16,
    backgroundColor: "hsl(0, 0%, 90%)",
    borderRadius: 8,
    marginVertical: 8,
    gap: 16,
  },
});
