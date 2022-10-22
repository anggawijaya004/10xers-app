import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {VStack, HStack, Box, Avatar} from 'native-base';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from 'react-native';
import {View} from 'react-native';
import {fetchData} from '../store/Feature/collectionSlice';
import {TouchableOpacity} from 'react-native';

export const HomeScreen = ({navigation}) => {
  const {status, data} = useSelector(state => state.collection);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchData());
    }
  }, []);

  if (status === 'loading') {
    return (
      <View>
        <Text>Load data ... </Text>
      </View>
    );
  }

  return (
    <ScrollView w={['200', '300']} h="80">
      <VStack space="4" px="1">
        {data &&
          data.map((e, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => navigation.navigate('Detail', {id: e.id})}>
              <Box border="1" borderRadius="md" bgColor="blue.500">
                <HStack space="4" p="1.5">
                  <Avatar
                    bg="green.500"
                    source={{
                      uri: e.image_url,
                    }}>
                    AJ
                  </Avatar>
                  <Box px="4" pt="4">
                    <Text>{e.name ?? '-'}</Text>
                    <Text>{e.token_id ?? '-'}</Text>
                  </Box>
                </HStack>
              </Box>
            </TouchableOpacity>
          ))}
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
