import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {Avatar, Center, Box, HStack} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDetail, fetchStat} from '../store/Feature/collectionSlice';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment/moment';

export function Detail({navigation, route}) {
  const {status, detail, stat} = useSelector(state => state.collection);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetail(route.params.id));
    dispatch(fetchStat(route.params.id));
  }, []);

  const getLabel = datas => {
    let res = [];
    datas.map(e => {
      let temp = moment(e.timestamp).format('MMMM');
      if (!res.includes(temp)) {
        res.push(temp);
      }
    });
    return res;
  };

  const getData = datas => {
    let month = [];
    let res = [];
    datas.map(e => {
      let temp = moment(e.timestamp).format('MMMM');
      if (!month.includes(temp)) {
        month.push(temp);
        res.push(e.floor_price_eth);
      }     
    });
    return res;
  };

  if (status === 'loading') {
    return (
      <View>
        <Text>Load data ... </Text>
      </View>
    );
  }

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#FFFFFF',
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View>
      {detail && (
        <View>
          <Center mb='5'>
            <Avatar
              my="10"
              bg="green.500"
              size="xl"
              source={{
                uri: detail.image_url,
              }}>
              AJ
            </Avatar>
            <HStack space="4" justifyContent="center" bgColor="blue.200" p="5">
              <Box fontWeight="bold">Total volume: {detail.total_volume}</Box>
              <Box>One day Change: {detail.one_day_change}</Box>
            </HStack>
          </Center>
        </View>
      )}
      <LineChart
        data={{
          labels: getLabel(stat),
          datasets: [
            {
              data: getData(stat),
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={chartConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
