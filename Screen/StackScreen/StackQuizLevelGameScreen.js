import {StyleSheet, Text, View} from 'react-native';
import {useAppContext} from '../../store/context';

const StackQuizLevelGameScreen = ({route}) => {
  const {regionId} = route.params;
  const {quiz} = useAppContext();
  const QUIZ = quiz.find(q => q.id === regionId);
  console.log(QUIZ);

  return (
    <View>
      <Text>StackQuizLevelGameScreen</Text>
    </View>
  );
};

export default StackQuizLevelGameScreen;

const styles = StyleSheet.create({});
