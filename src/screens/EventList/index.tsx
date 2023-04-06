import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  Pressable,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventsRequest } from '../../redux/actions/events.actions';
import {
  selectEvents,
  selectEventsLoading,
  selectEventsError,
} from '../../redux/selectors/events.selectors';
import { useIsFocused } from '@react-navigation/native';
import { EventItem } from '../../share/events/eventsItem/index.types';

const EventList = () => {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  const isLoading = useSelector(selectEventsLoading);
  const error = useSelector(selectEventsError);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const isScrolledRef = useRef(false);
  const updateTimerRef = useRef(null);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setPage(prev => prev + 1);
      dispatch(fetchEventsRequest({ perPage: 25, page }));
    }
  }, [isFocused]);

  useEffect(() => {
    dispatch(fetchEventsRequest({ perPage: 25, page }));
    setPage(prev => prev + 1);
  }, []);

  //Fetch events every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchEventsRequest({ perPage: 25, page }));
      console.log('tick');
    }, 60000);
    setPage(prev => prev + 1);

    return () => clearInterval(interval);
  }, [dispatch]);

  // Clear update timer when component unmounts
  useEffect(() => {
    return () => clearInterval(updateTimerRef.current);
  }, []);

  // Handle manual refresh
  const handleRefresh = useCallback(() => {
    if (Date.now() - lastUpdated >= 15000) {
      setPage(prev => prev + 1);
      console.log(
        'Date.now() - lastUpdated >= 15000',
        Date.now() - lastUpdated >= 15000,
      );
      dispatch(fetchEventsRequest({ perPage: 25, page }));
      setIsRefreshing(true);
      isScrolledRef.current = false;
      setLastUpdated(Date.now());
      clearInterval(updateTimerRef.current);
      updateTimerRef.current = setInterval(() => {
        if (!isScrolledRef.current && Date.now() - lastUpdated >= 60000) {
          dispatch(fetchEventsRequest({ perPage: 25, page }));
          setLastUpdated(Date.now());
        }
      }, 5000);
      setTimeout(() => {
        setIsRefreshing(false);
      }, 3000);
    }
  }, [dispatch, lastUpdated]);

  // Handle list scroll
  const handleScroll = useCallback(() => {
    isScrolledRef.current = true;
    clearInterval(updateTimerRef.current);
  }, []);

  const navigateDetails = (eventItem: EventItem) => () => {
    navigation.navigate('EventItemScreen', { eventItem });
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={navigateDetails(item)} style={styles.item}>
        <Text style={styles.itemText}>{item.actor.display_login}</Text>
      </Pressable>
    );
  };

  const keyExtractor = item => item.id.toString();

  return (
    <SafeAreaView style={areaView.container}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.list}
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
      {isLoading && <Text style={styles.loading}>Loading...</Text>}
      {error && <Text style={styles.error}>Error: {error}</Text>}
    </SafeAreaView>
  );
};

const areaView = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loading: {
    flex: 1,
    alignSelf: 'center',
    margin: 10,
  },
  error: {
    flex: 1,
    alignSelf: 'center',
    margin: 10,
    color: 'red',
  },
});

export default EventList;
