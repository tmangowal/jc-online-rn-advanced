import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  TextInput,
} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const API_URL = 'http://10.0.2.2:2000';

const style = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  navBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'pink',
    borderRadius: 4,
    alignSelf: 'center',
  },
  userListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  flatListContainer: {
    marginTop: 40,
    width: '100%',
  },
  textInput: {
    backgroundColor: 'lightgray',
    paddingHorizontal: 8,
    borderRadius: 8,
    marginTop: 4,
    marginHorizontal: 16,
    flex: 1,
  },
});

const Home = props => {
  const dispatch = useDispatch();

  const [userList, setUserList] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userInput, setUserInput] = useState("");

  const fetchUsers = () => {
    Axios.get(`${API_URL}/users`)
      .then(res => {
        console.log(res.data);
        setUserList(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const refreshHandler = () => {
    setIsRefreshing(true);

    Axios.get(`${API_URL}/users`)
      .then(res => {
        setUserList(res.data);
        setIsRefreshing(false);
      })
      .catch(err => {
        console.log(err);
        setIsRefreshing(false);
      });
  };

  const renderUserList = ({item}) => {
    return (
      <View style={{...style.userListItem}}>
        <Text>{item.username}</Text>
        <TouchableOpacity
          onPress={() => props.navigation.push('UserProfile', item)}
          style={{...style.navBtn}}>
          <Text>Go to profile</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const inputHandler = (text) => {
    setUserInput(text);
  }

  const sendBtnHandler = () => {
    Axios.post(`${API_URL}/users`, {
      username: userInput
    })
    .then((res) => {
      setUserInput("")
      fetchUsers()
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={{...style.mainContainer}}>
      <View style={{flexDirection: 'row'}}>
        <TextInput onChangeText={inputHandler} style={{...style.textInput}} value={userInput} />
        <TouchableOpacity onPress={sendBtnHandler} style={{...style.navBtn}}>
          <Text>SEND</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{...style.flatListContainer}}
        data={userList}
        renderItem={renderUserList}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refreshHandler} />
        }
      />
    </View>
  );
};

export default Home;
