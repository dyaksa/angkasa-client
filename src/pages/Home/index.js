import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {IcBell, IcMail} from '../../assets';
import {
  BottomNav,
  CardDestination,
  CardDestination3D,
  CardRounded,
  Search,
} from '../../components';
import { GetProfile } from '../../redux/actions/Profile';
import API from '../../service';
import {Gap} from '../../utils';

export default function Home({navigation}) {
  const {data} = useSelector((s) => s.Auth);
  const dispatch = useDispatch();
  dispatch(GetProfile(data));
  console.log(data, 'testdstsdtstst')
 

 const [cards,setCards] = useState([])
 const [datas,setData] = useState([])
  useEffect(() => {
      API.Home().then( res => {
        setCards(res.data)
        setData(res.data)
      })
      console.log('test : ',data)
  },[])

  const search = (keyword) => {
      if (!keyword) {
        return setCards(datas)
      }
      console.log(keyword)
      let result =  datas.filter(res => {
        console.log(res.name_city)
        return res.name_city == keyword
      });
      setCards(result)
      console.log('dari result: ',result)
  }
  return (
    <>
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Gap height={40} />
          <View style={styles.wrapperIcon}>
            <Text style={styles.wrapperIconText}>Explore</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Chat')}>
                <IcMail />
              </TouchableOpacity>
              <Gap width={23} />
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Notification')}>
                <IcBell />
              </TouchableOpacity>
            </View>
          </View>
          <Gap height={15} />

          <Search text="Where you want to go?" onChangeText={(keyword) => search(keyword) } />

          <Gap height={24} />
          <View style={styles.wrapperTrending}>
            <Text style={styles.wrapperTrendingText}>
              Trending destinations
            </Text>
            <Text style={styles.wrapperTrendingMenu}>View all</Text>
          </View>
        </View>
        <Gap height={23} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Gap width={28} />
          {
            cards.map((card,index) => {
              return(
                 index === 0 ? <CardDestination3D key={index} city={card.name_city} country={card.name_country}  onPress={() => navigation.navigate('SearchFlight',{idCity:card.idcity})} /> : <CardDestination key={index} city={card.name_city} country={card.name_country} onPress={() => navigation.navigate('SearchFlight',{idCity:card.idcity})}/>
              )
            })
          }
        </ScrollView>
        <Gap height={35} />
        <Text style={styles.topDestination}>Top 10 destinations</Text>
        <Gap height={21} />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{flexDirection: 'row'}}>
          <Gap width={28} />
          {
            datas.reverse().map((card,index) => {
              return(
                <CardRounded key={index} country={card.name_country} onPress={() => navigation.navigate('SearchFlight',{idCity:card.idcity})} />
              )
            })
          }
        </ScrollView>
        <Gap heigh={16} />
      </ScrollView>
      <BottomNav navigation={navigation} />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 28,
    backgroundColor: '#fff',
  },
  wrapper: {
    backgroundColor: '#fff',
    flex: 1,
  },
  wrapperIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapperIconText: {
    fontSize: 36,
    fontFamily: 'Poppins-SemiBold',
  },
  wrapperTrending: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapperTrendingText: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'Poppins-medium',
    fontWeight: 'bold',
  },
  wrapperTrendingMenu: {
    color: '#2395FF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  topDestination: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'Poppins-medium',
    fontWeight: 'bold',
    marginLeft: 28,
  },
});
