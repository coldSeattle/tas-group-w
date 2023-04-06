import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import normalizeData from '../../../share/events/eventsItem/normalize.validators';

type Item = {
  title: string;
  value: string;
};

type Section = {
  title: string;
  data: Item[];
};

const renderItem = ({ item }) => (
  <View style={{ flexDirection: 'row', padding: 10 }}>
    <Text style={{ fontWeight: 'bold', paddingRight: 5 }}>{item.title}: </Text>
    <Text>{item.value}</Text>
  </View>
);

const renderSectionHeader = ({ section }: { section: Section }) => (
  <Text style={{ fontWeight: 'bold', backgroundColor: '#eee', padding: 10 }}>
    {section.title}
  </Text>
);

const EventItem: React.FC = ({ route }) => {
  const data = route.params;

  const navigation = useNavigation();

  const goBack = () => navigation.goBack();

  return (
    <SafeAreaView style={areaView.container}>
      <Pressable onPress={goBack}>
        <Text style={goBackBtn.text}>🔙 Go Back</Text>
      </Pressable>
      <SectionList
        sections={normalizeData(data)}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </SafeAreaView>
  );
};

const areaView = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const goBackBtn = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
});

export default EventItem;
