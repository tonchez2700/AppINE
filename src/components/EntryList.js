import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { general } from "../theme/customTheme";
import { Icon, LinearProgress } from "react-native-elements";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import ModalAnswered from "./Modal/ModalAnswered";
import { Context as AccountDataContext } from "../context/AccountDataContext";

const EntryList = ({ data }) => {
  const navigation = useNavigation();
  const { isVisibleModalAnswere } = useContext(AccountDataContext);
  //console.log(data);
  //console.log(JSON.stringify(data, null, 2));

 

  const sortData = (a, b) => {
    if (a.percentage_completed >= 80 && b.percentage_completed < 80) {
      return 1; // a al final
    } else if (a.percentage_completed < 80 && b.percentage_completed >= 80) {
      return -1; // b al final
    } else {
      return 0; // no se cambian de lugar
    }
  };

  //const sortedData = resetData && data && Array.isArray(data) ? data.sort(sortData) : []; // agregamos ? para manejar el caso en el que data sea undefined

  const sortedData = data && Array.isArray(data) ? data.sort(sortData) : []; // agregamos ? para manejar el caso en el que data sea undefined

  return (
    <ScrollView>
      {sortedData.map((e) => (
        <View
          key={e.id}
          style={[tw`flex-row`, { backgroundColor: "white", marginBottom: 24 }]}
        >
          <View style={general.CardQuiz}>
            <View style={{ width: "60%", justifyContent: "center" }}>
              <Text style={general.textCardQuiz}>{e.name}</Text>

              <View style={{ marginVertical: 7 }}>
                <LinearProgress
                  value={e.percentage_completed / 80}
                  variant="determinate"
                  style={{ height: 10, marginVertical: 10 }}
                  color="#012B54"
                />
              </View>
            </View>
            <View
              style={{
                width: "25%",
                justifyContent: "center",
                marginTop: 10,
                marginLeft: 5,
              }}
            >
              <Text style={general.textCountCuestions}>
                {e.total_questions} Preguntas
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("QuestionScreen", e);
                // if (e.percentage_completed >= 80) {
                //   isVisibleModalAnswere();
                // } else {
                //   //   // console.log();
                //   navigation.navigate("QuestionScreen", e);
                // }
              }}
              style={{ justifyContent: "center", marginLeft: 5 }}
            >
              <View style={{ width: "15%" }}>
                <Icon
                  size={20}
                  name="pencil"
                  containerStyle={general.CardIconQuiz}
                  type="font-awesome"
                  color={"white"}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <ModalAnswered />
    </ScrollView>
  );
};

export default EntryList;

const styles = StyleSheet.create({
  TextTableItems: {
    fontSize: 13,
    padding: 10,
    textAlign: "center",
    color: "#000000",
    borderBottomColor: "#E6E6E6",
    borderBottomWidth: 1,
  },
});
